const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });

        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error, message: "Failed to get user details" });
    }
}
