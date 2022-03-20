import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const signin = async (req, res) => {
    const { email, password } = req.body

    try {
        const existingUser = "existing user";

        return res.status(200).json({message: "sign IN triggered"});

        const token = jwt.sign({ email: email, id: "1" }, 'test', { expiresIn: "1h" });

        res.status(200).json({ result: token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong with sign in" });
    }
}

export const signup = async (req, res) => {
    const { email, password, photo } = req.body;

    try {
        return res.status(200).json({message: "sign UP triggered"});

        const token = jwt.sign({ email: email, id: "1" }, 'test', { expiresIn: "1h" });
        
    } catch (error) {
        res.status(500).json({ message: "Something went wrong with sign up" });
    }
    
}