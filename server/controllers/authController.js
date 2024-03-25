const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find user by username
        const user = await prisma.user.findUnique({
            where: {
                username: username,
            },
        });

        // Check if user exists
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials no user' });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials no password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                userId: user.id,
                userName: user.username,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1d',
            }
        );

        res.json({ token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Failed to login' });
    }
};

exports.register = async (req, res) => {
    const { username, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        // Create a new user with hashed password
        const newUser = await prisma.user.create({
            data: {
                username: username,
                password: hashedPassword
            },
        });

        res.json(newUser);
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Failed to register user' });
    }
};
