const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const {isEmail} = require('validator')
const prisma = new PrismaClient();

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
 
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials no user' });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials password incorrect' });
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '2d',
            }
        );

        res.json({ token,userId:user.id });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Failed to login' });
    }
};

exports.register = async (req, res) => {
    const { name,email, password,profilepic} = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    
    try {
        
        const newUser = await prisma.user.create({
            data: {
                name:name,
                email: email,
                password: hashedPassword,
                profilepic:profilepic
            },
        });

        res.json(newUser);
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Failed to register user' });
    }
};
