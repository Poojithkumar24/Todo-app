const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const {isEmail} = require('validator');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');


exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
 
        if (!user) {
            return res.status(400).json({ message: 'Invalid  user' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password ' });
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1d',
            }
        );

        console.log(user.id)
        res.json({ token,userId:user.id });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Failed to login' });
    }
};



exports.register = async (req, res) => {
    const { name,email,password, profilePic} = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    
    try {
        
        const newUser = await prisma.user.create({
            data: {
                name:name,
                email: email,
                password: hashedPassword, 
                profilepic:profilePic
            },
        });

        res.json(newUser);
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Failed to register user' });
    }
};


//verifyToken

exports.verifyToken=(req,res)=>{
    const {token} = req.body;

    if(token){
        try{
            const decode = jwt.verify(token,process.env.JWT_SECRET);

            res.json({
                auth:true,
                data:decode,
            });
        }catch(error){
            res.json({
                auth:false,
                data: error.message,
            })
        }
    }
    else{
        res.json({
            auth:false,
            data:"No token found in request"
        });
    }
}



