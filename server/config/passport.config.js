import LocalStrategy from 'passport-local';
import pool from './db.config.js';
import bcrypt from 'bcrypt';

function initializePassport (passport) {
    const authenticateUser = (email, password, done) => {

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
                usernameField: 'email',
                passwordField: 'password',
            },
            authenticateUser
        )
    );
    passport.serializeUser((user, done) => done(null, account_user.email));

    passport.deserializeUser((email, done) => {
        pool.query(
            `SELECT * FROM account_user WHERE email = $1`,
            [email],
            (err, results) => {
                if (err) {
                    return done(err);
                }
                console.log(`Email is ${results.rows[0].email}`);
                return done(null, results.rows[0]);
            }
        )
    })
}

export default initializePassport