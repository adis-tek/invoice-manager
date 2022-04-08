import passport from 'passport';
import passportLocal from 'passport-local';
import bcrypt from 'bcryptjs';
import session from 'express-session';
import flash from 'express-flash';

import pool from "../config/db.config.js";

const LocalStrategy = passportLocal.Strategy; // Get it working with es6 import format.

export const getProfile = async (req, res, next) => {
    try {
        if (req.session.passport?.user) {
            res.send(true);
        } else {
            res.send(false);
        }

        next();

    } catch (error) {
        console.log(error);
    }
}

export const updateProfile = async (req, res, next) => {
    const { email, password, confirmPassword, profilePhoto } = req.body;
    const user = req.session.passport?.user;

    console.log(email, password, confirmPassword, profilePhoto);

    try {
        let errors = [];

        if (password !== confirmPassword) return res.status(400).json({ message: "Passwords don't match" })

        if (!user) {return res.send(false)};

        const hashedPassword = await bcrypt.hash(password, 12);

        pool.query(
            `UPDATE account_user 
            SET (email, password, photo) = ($1, $2, $3) 
            WHERE account_user_uuid = $4;`, [email, hashedPassword, profilePhoto, user], (err, results) => {
                if (err) {
                    throw err;
                }
                console.log(req.session.passport.user)
                res.send(true);
             }
        )
        return;
    } catch (error) {
        res.status(500).json({ message: "Something went wrong with updating your profile." });
    }
}

export const signin = async (req, res, next) => {
    const { email, password } = req.body

    try {
        passport.authenticate("local", (err, user, info) => {
            if (err) {
                throw err;
            } else if (!user) {
                res.send("No user exists");
            } else {
                req.logIn(user, (err) => {
                    if (err) {
                        throw err;
                    }
                    // res.send("Successfully authenticated.");
                    console.log("This is it", req.session);
                    console.log(req.session.passport.user)
                    res.send(true);
                });
            }
        })(req, res, next);
    } catch (error) {
        res.send(false);
    }
}

export const signup = async (req, res) => {
    const { email, password, confirmPassword, photo } = req.body;

    // const userEmail = email.replaceAll('"', "'");
    // const userPassword = password.replaceAll('"', "'");
    // const userConfirmedPassword = confirmPassword.replaceAll('"', "'");

    try {
        let errors = [];

        // return res.status(200).json(req.body);

        // const existingUser = await pool.query("SELECT * FROM account_user WHERE email = $1",
        // [email]);

        // if (existingUser) return res.status(400).json({ message: "User already exists" })

        // if (password !== confirmPassword) return res.status(400).json({ message: "Passwords don't match" })

        const hashedPassword = await bcrypt.hash(password, 12);

        pool.query(
            `SELECT * FROM account_user
             WHERE email = $1`, [email], (err, results) => {
                 if (err) {
                     throw err;
                 }

                 console.log(results.rows);

                 if (results.rows.length > 0) {
                     errors.push({ message: "Email is taken" });

                     res.send({ message: "Email is taken" });
                     return;
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
                         }
                     )
                     res.send(true);
                     return;
                 }
             }
        )

        // const newAccount = await pool.query("INSERT INTO account_user(account_user_uuid, created_at, last_login, email, password, photo) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
        // [uuidv4(), CURRENT_DATE, CURRENT_TIMESTAMP, null, null, null]);

        // const token = jwt.sign({ email: email, id: "1" }, 'test', { expiresIn: "1h" });

        return;
    } catch (error) {
        res.status(500).json({ message: "Something went wrong with sign up" });
    }
    
}