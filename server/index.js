import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv"; 
import session from 'express-session';
import cookieParser from 'cookie-parser';
import cookieSession from "cookie-session";
import flash from 'express-flash';
import passport from 'passport';
import initializePassport from './config/passport.config.js'

import invoicesRoutes from "./routes/invoices.js";
import userRoutes from './routes/users.js';

const app = express();
initializePassport(passport);

//middleware
// app.use(bodyParser.json({limit: "32mb", extended: true}))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cors({
      origin: "http://localhost:3000", // <-- location of the react app were connecting to
      credentials: true,
    })
  );
app.use(express.json()); //req.body
// app.use(cookieSession({
//   maxAge: 24 * 60 * 60 * 1000,
//   keys: ["secret"]
// }))
app.use(cookieParser());
app.use(session({
    secret: "secret",
    key: "userId",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24 * 1000,
    }
}))
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
dotenv.config();

//ROUTES//

app.use("/invoices", invoicesRoutes);

app.use('/user', userRoutes);


app.listen(5000, () => {
    console.log("The server has spun up!")
});
