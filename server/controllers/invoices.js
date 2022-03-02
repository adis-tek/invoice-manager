import pool from "../config/db.config.js";
// export const getInvoicesTest = async(req, res) => {
//     try {
//         const allInvoices = await pool.query("SELECT * FROM invoice_test");
//         res.json(allInvoices.rows);
//     } catch(err) {
//         console.log(err.message)
//     }
// }

//READ ACCOUNT DATA

export const getAccountUser = async(req, res) => {
    try {
        const user = await pool.query("SELECT * FROM account_user");
        res.json(user.rows);
    } catch(err) {
        console.log(err.message)
    }
}

export const getIdentity = async(req, res) => {
    try {
        const allInvoices = await pool.query("SELECT * FROM identity join account_user on identity.account_user_uuid=account_user.account_user_uuid");
        res.json(allInvoices.rows);
    } catch(err) {
        console.log(err.message)
    }
}

export const getProfile = async(req, res) => {
    try {
        const allInvoices = await pool.query("SELECT * FROM profile join account_user on profile.account_user_uuid=account_user.account_user_uuid");
        res.json(allInvoices.rows);
    } catch(err) {
        console.log(err.message)
    }
}

//READ INVOICES

export const getInvoices = async(req, res) => {
    try {
        const allInvoices = await pool.query("SELECT * FROM invoice RIGHT OUTER JOIN bill_from ON invoice.bill_from_id = bill_from.bill_from_id RIGHT OUTER JOIN bill_to ON invoice.bill_to_id = bill_to.bill_to_id RIGHT OUTER JOIN bill_info ON invoice.bill_info_id = bill_info.bill_info_id RIGHT OUTER JOIN item_list ON invoice.item_list_id = item_list.item_list_id");
        res.json(allInvoices.rows);
    } catch(err) {
        console.log(err.message)
    }
}

export const getBillFrom = async(req, res) => {
    try {
        const allBillFrom = await pool.query("SELECT * FROM invoice join bill_from on invoice.bill_from_id=bill_from.bill_from_id");
        res.json(allBillFrom.rows);
    } catch(err) {
        console.log(err.message)
    }
}

export const getBillTo = async(req, res) => {
    try {
        const allBillFrom = await pool.query("SELECT * FROM invoice join bill_to on invoice.bill_to_id=bill_to.bill_to_id");
        res.json(allBillFrom.rows);
    } catch(err) {
        console.log(err.message)
    }
}

export const getBillInfo = async(req, res) => {
    try {
        const allBillInfo = await pool.query("SELECT * FROM invoice join bill_info on invoice.bill_info_id=bill_info.bill_info_id");
        res.json(allBillInfo.rows);
    } catch(err) {
        console.log(err.message)
    }
}

export const getItemList = async(req, res) => {
    try {
        const allItemList = await pool.query("SELECT * FROM invoice join item_list on invoice.item_list_id=item_list.item_list_id");
        res.json(allItemList.rows);
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
    } catch(err) {
        console.log(err.message);
    }
}

//CREATE INVOICES

export const createInvoice = async (req, res) => {
    try {
        // const { amount } = req.body;
        // );
        const newInvoice = req.body;

        const clientName = newInvoice.clientName;

        // const addedInvoice = await pool.query("INSERT INTO bill_to (clients_name) VALUES($1) RETURNING *",
        // [clientName]);

        console.log(newInvoice);
        console.log(clientName)
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