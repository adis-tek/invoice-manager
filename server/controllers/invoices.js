import pool from "../config/db.config.js";
// export const getInvoicesTest = async(req, res) => {
//     try {
//         const allInvoices = await pool.query("SELECT * FROM invoice_test");
//         res.json(allInvoices.rows);
//     } catch(err) {
//         console.log(err.message)
//     }
// }

//READ INVOICES

export const getInvoices = async(req, res) => {
    try {
        const allInvoices = await pool.query("SELECT * FROM invoice");
        res.json(allInvoices.rows);
    } catch(err) {
        console.log(err.message)
    }
}

//FILTER INVOICES

export const filterInvoices = async(req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM bill_from WHERE bill_from_id = $1", [id]);
        res.json(todo.rows[0]);
    } catch {
        console.log(err.message);
    }
}

//CREATE INVOICES

export const createInvoice = async (req, res) => {
    try {
        const { amount } = req.body;
        const newInvoice = await pool.query("INSERT INTO invoice_test (invoice_id, total) VALUES(uuid_generate_v4(), $1) RETURNING *",
        [amount]
        );

        res.json(newInvoice.rows[0]);
    }   catch (err) {
        console.log(err.message)
    }
}

//UPDATE INVOICES

export const updateInvoice = async(req, res) => {
    try {
        const { id } = req.params;
        const { newTotal } = req.body;
        const updateInvoice = await pool.query("UPDATE invoice_test SET total = $1 WHERE total = $2", [newTotal, id]);

        res.json("Invoice Updated")
    } catch (err) {
        console.log(err.message);
        
    }
}

//DELETE INVOICES

export const deleteInvoice = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteInvoice = await pool.query("DELETE FROM invoice_test WHERE total = $1", [id]);
        res.json("Invoice deleted");
    } catch (err) {
        console.log(err.message);
    }
}