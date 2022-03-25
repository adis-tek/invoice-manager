import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import session from 'express-session';
import flash from 'express-flash';

import pool from "../config/db.config.js";
 

export const signin = async (req, res) => {
    const { email, password } = req.body

    try {
        const existingUser = "existing user";

        const token = jwt.sign({ email: email, id: "1" }, 'test', { expiresIn: "1h" });

        return res.status(200).json(req.body);

        res.status(200).json({ result: token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong with sign in" });
    }
}

export const signup = async (req, res) => {
    const { email, password, confirmPassword, photo } = req.body;

    const userEmail = email.replaceAll('"', "'");
    const userPassword = password.replaceAll('"', "'");
    const userConfirmedPassword = confirmPassword.replaceAll('"', "'");

    try {
        let errors = [];

        // return res.status(200).json(req.body);

        // const existingUser = await pool.query("SELECT * FROM account_user WHERE email = $1",
        // [email]);

        // if (existingUser) return res.status(400).json({ message: "User already exists" })

        // if (password !== confirmPassword) return res.status(400).json({ message: "Passwords don't match" })

        const hashedPassword = await bcrypt.hash(password, 12)

        pool.query(
            `SELECT * FROM account_user
             WHERE email = $1`, [email], (err, results) => {
                 if (err) {
                     throw err;
                 }

                 console.log(results.rows);

                 if (results.rows.length > 0) {
                     errors.push({ message: "Email is taken" });

                     res.status(400).json({ message: "Email is taken" })
                 } else {
                     pool.query(
                         `INSERT INTO account_user (email, password, photo)
                         VALUES ($1, $2, $3)
                         RETURNING account_user_uuid, password`, 
                         [email, hashedPassword, photo], 
                         (err, results) => {
                             if (err) {
                                 throw err;
                             }
                             console.log(results.rows);
                            //  req.flash('success_msg, "You are now registered. Please log in.');
                            //  res.redirect("auth/signin");
                            res.status(200).json({ message: "Registration complete." })
                         }
                     )
                 }
             }
        )

        // const newAccount = await pool.query("INSERT INTO account_user(account_user_uuid, created_at, last_login, email, password, photo) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
        // [uuidv4(), CURRENT_DATE, CURRENT_TIMESTAMP, null, null, null]);

        // const token = jwt.sign({ email: email, id: "1" }, 'test', { expiresIn: "1h" });

        // return res.status(200).json(req.body);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong with sign up" });
    }
    
}