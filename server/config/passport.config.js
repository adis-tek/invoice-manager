import passport from 'passport';
import passportLocal from 'passport-local';
import pool from './db.config.js';
import bcrypt from 'bcrypt';

const LocalStrategy = passportLocal.Strategy; // Get it working with es6 import format.

function initializePassport (passport) {
    console.log("Initialized");

    const authenticateUser = (email, password, done) => {
        console.log(email, password);

        pool.query(
            `SELECT * FROM account_user WHERE email = $1`, 
            [email], 
            (err, results) => {
                if (err) {
                    throw err;
                }

                console.log(results.rows);

                if (results.rows.length > 0) {
                    const user = results.rows[0];

                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) {
                            throw err;
                        } else if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, { message: "Password is not correct." });
                        }
                    });
                } else {
                    return done(null, false, { message: "Email is not registered."})
                }
            }
        )
    }

    passport.use(
        new LocalStrategy (
            {
                usernameField: "email",
                passwordField: "password"
            },
            authenticateUser
        )
    );

    passport.serializeUser(function(user, cb) {
        cb(null, user.account_user_uuid);
    });

    passport.deserializeUser(function(account_user_uuid, cb) {
        pool.query(
            `SELECT * FROM account_user WHERE account_user_uuid = $1`,
            [account_user_uuid],
            (err, user) => {
                const userInformation = {
                    userIdentification: user.account_user_uuid,
                };
                cb(err, userInformation);
            }
        )
        // cb(null, user);
    })
}

export default initializePassport