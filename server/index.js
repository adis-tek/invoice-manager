const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const pool = require("./config/db.config");

//middleware
app.use(cors());
app.use(express.json()); //req.body
dotenv.config();

//ROUTES//

//CREATE INVOICES

app.post("/invoices", async (req, res) => {
    try {
        const { amount } = req.body;
        const newInvoice = await pool.query("INSERT INTO invoice_test (invoice_id, total) VALUES(uuid_generate_v4(), $1) RETURNING *",
        [amount]
        );

        res.json(newInvoice.rows[0]);
    }   catch (err) {
        console.log(err.message)
    }
});

//READ INVOICES

app.get("/invoices", async(req, res) => {
    try {
        const allInvoices = await pool.query("SELECT * FROM invoice_test");
        res.json(allInvoices.rows);
    } catch(err) {
        console.log(err.message)
    }
})

app.get("/manager", async(req, res) => {
    try {
        const allInvoices = await pool.query("SELECT * FROM invoice");
        res.json(allInvoices.rows);
    } catch(err) {
        console.log(err.message)
    }
})

//FILTER INVOICES

app.get("/invoices/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM invoice_test WHERE total = $1", [id]);
        res.json(todo.rows[0]);
    } catch {
        console.log(err.message);
    }
})

//UPDATE INVOICES

app.put("/invoices/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const { newTotal } = req.body;
        const updateInvoice = await pool.query("UPDATE invoice_test SET total = $1 WHERE total = $2", [newTotal, id]);

        res.json("Invoice Updated")
    } catch (err) {
        console.log(err.message);
        
    }
})

//DELETE INVOICES

app.delete("/invoices/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteInvoice = await pool.query("DELETE FROM invoice_test WHERE total = $1", [id]);
        res.json("Invoice deleted");
    } catch (err) {
        console.log(err.message);
    }
})


app.listen(5000, () => {
    console.log("The server has spun up!")
});