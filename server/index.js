import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

import invoicesRoutes from "./routes/invoices.js";

const app = express();

//middleware
app.use(bodyParser.json({limit: "32mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "32mb", extended: true}))
app.use(cors());
app.use(express.json()); //req.body
dotenv.config();

//ROUTES//

app.use("/invoices", invoicesRoutes);


app.listen(5000, () => {
    console.log("The server has spun up!")
});