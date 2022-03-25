import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv"; 
import session from 'express-session';
import flash from 'express-flash';

import invoicesRoutes from "./routes/invoices.js";
import userRoutes from './routes/users.js';

const app = express();

//middleware
app.use(bodyParser.json({limit: "32mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "32mb", extended: true}))
app.use(cors());
app.use(express.json()); //req.body
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}))
app.use(flash());
dotenv.config();

//ROUTES//

app.use("/invoices", invoicesRoutes);

app.use('/user', userRoutes);


app.listen(5000, () => {
    console.log("The server has spun up!")
});