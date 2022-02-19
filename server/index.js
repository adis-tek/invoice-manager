const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

dotenv.config();

//ROUTES//

//CREATE INVOICES

//READ INVOICES

//UPDATE INVOICES

//DELETE INVOICES


app.listen(5000, () => {
    console.log("The server has spun up!")
});