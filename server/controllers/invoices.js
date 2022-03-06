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

        //Form Data
        const billFromStreet = newInvoice.billFromStreet;
        const billFromCity = newInvoice.billFromCity;
        const billFromPostal = newInvoice.billFromPostal;
        const billFromCountry = newInvoice.billFromCountry;
        const clientName = newInvoice.clientName;
        const clientEmail = newInvoice.clientEmail;
        const billToStreet = newInvoice.billToStreet;
        const billToCity = newInvoice.billToCity;
        const billToPostal = newInvoice.billToPostal;
        const billToCountry = newInvoice.billToCountry;
        const invoiceDate = newInvoice.invoiceDate;
        const paymentTerms = newInvoice.paymentTerms;
        const projectDescription = newInvoice.projectDescription;
        const itemName1 = newInvoice.item_name_1;
        const itemQuantity1 = newInvoice.item_quantity_1;
        const itemPrice1 = newInvoice.item_price_1;
        const itemName2 = newInvoice.item_name_2;
        const itemQuantity2 = newInvoice.item_quantity_2;
        const itemPrice2 = newInvoice.item_price_2;
        const itemName3 = newInvoice.item_name_3;
        const itemQuantity3 = newInvoice.item_quantity_3;
        const itemPrice3 = newInvoice.item_price_3;
        const itemName4 = newInvoice.item_name_4;
        const itemQuantity4 = newInvoice.item_quantity_4;
        const itemPrice4 = newInvoice.item_price_4;
        const itemName5 = newInvoice.item_name_5;
        const itemQuantity5 = newInvoice.item_quantity_5;
        const itemPrice5 = newInvoice.item_price_5;

        // const createInvoice = await pool.query("INSERT INTO invoice(street_address, city, postal_code, country) VALUES($1, $2, $3, $4) RETURNING *",
        // [billFromStreet, billFromCity, billFromPostal, billFromCountry]);

        // const createBillFrom = await pool.query("INSERT INTO bill_from(street_address, city, postal_code, country) VALUES($1, $2, $3, $4) RETURNING *",
        // [billFromStreet, billFromCity, billFromPostal, billFromCountry]);

        // const createBillTo = await pool.query("INSERT INTO bill_to(clients_name, clients_email, street_address, city, postal_code, country) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
        // [clientName, clientEmail, billToStreet, billToCity, billToPostal, billToCountry]);

        // const createBillInfo = await pool.query("INSERT INTO bill_info(invoice_date, payment_terms, project_description) VALUES($1, $2, $3) RETURNING *",
        // [invoiceDate, paymentTerms, projectDescription]);

        // const createItemList = await pool.query("INSERT INTO bill_info(item_name, quantity, price) VALUES($1, $2, $3) RETURNING *",
        // [itemName1, itemQuantity1, itemPrice1]);

        console.log(newInvoice);
        console.log(clientName);
    }   catch (err) {
        console.log(err.message)
    }
}

//UPDATE INVOICES

export const updateInvoice = async(req, res) => {
    try {
        const { id } = req.params;
        const editedInvoice = req.body;

        //Form Data
        const billFromStreet = editedInvoice.billFromStreet;
        const billFromCity = editedInvoice.billFromCity;
        const billFromPostal = editedInvoice.billFromPostal;
        const billFromCountry = editedInvoice.billFromCountry;
        const clientName = editedInvoice.clientName;
        const clientEmail = editedInvoice.clientEmail;
        const billToStreet = editedInvoice.billToStreet;
        const billToCity = editedInvoice.billToCity;
        const billToPostal = editedInvoice.billToPostal;
        const billToCountry = editedInvoice.billToCountry;
        const invoiceDate = editedInvoice.invoiceDate;
        const paymentTerms = editedInvoice.paymentTerms;
        const projectDescription = editedInvoice.projectDescription;
        const itemName1 = editedInvoice.item_name_1;
        const itemQuantity1 = editedInvoice.item_quantity_1;
        const itemPrice1 = editedInvoice.item_price_1;
        const itemName2 = editedInvoice.item_name_2;
        const itemQuantity2 = editedInvoice.item_quantity_2;
        const itemPrice2 = editedInvoice.item_price_2;
        const itemName3 = editedInvoice.item_name_3;
        const itemQuantity3 = editedInvoice.item_quantity_3;
        const itemPrice3 = editedInvoice.item_price_3;
        const itemName4 = editedInvoice.item_name_4;
        const itemQuantity4 = editedInvoice.item_quantity_4;
        const itemPrice4 = editedInvoice.item_price_4;
        const itemName5 = editedInvoice.item_name_5;
        const itemQuantity5 = editedInvoice.item_quantity_5;
        const itemPrice5 = editedInvoice.item_price_5;

        //Postgres Updates
        const updateBillFrom = await pool.query(
            "UPDATE bill_from SET street_address = $1, city = $2, postal_code = $3, country = $4 WHERE bill_from_id = $5", 
            [billFromStreet, billFromCity, billFromPostal, billFromCountry, id]);
        
        const updateBillTo = await pool.query(
            "UPDATE bill_to SET clients_name = $1, clients_email = $2, street_address = $3, city = $4, postal_code = $5, country = $6 WHERE bill_to_id = $7", 
            [clientName, clientEmail, billToStreet, billToCity, billToPostal, billToCountry, id]);
        
        const updateBillInfo = await pool.query(
            "UPDATE bill_info SET invoice_date = $1, payment_terms = $2, project_description = $3 WHERE bill_info_id = $4", 
            [invoiceDate, paymentTerms, projectDescription, id]);

        const updateItemList = await pool.query(
            "UPDATE item_list SET item_name = $1, quantity = $2, price = $3 WHERE item_list_id = $4", 
            [itemName1, itemPrice1, itemQuantity1, id]);

        console.log("This is the invoice data", editedInvoice);
        console.log("This is the id", id);
        console.log("This is the client name", clientName);
        //Needs to be fixed.
    } catch (err) {
        console.log(err.message);
        
    }
}

//DELETE INVOICES

export const deleteInvoice = async (req, res) => {
    try {
        const { id } = req.params;
        // const deleteInvoice = await pool.query("DELETE FROM invoice_test WHERE total = $1", [id]);
        console.log("Delete invoice", id);
        console.log(req.body);
    } catch (err) {
        console.log(err.message);
    }
}




        // //Check the form
        // const formFields = [
        //     "billFromStreet",
        //     "billFromCity",
        //     "billFromPostal",
        //     "billFromCountry",
        //     "clientName",
        //     "clientEmail",
        //     "billToStreet",
        //     "billToCity",
        //     "billToPostal",
        //     "billToCountry",
        //     "invoiceDate",
        //     "paymentTerms",
        //     "projectDescription",
        //     "item_name_1",
        //     "item_quantity_1",
        //     "item_price_1",
        //     "item_name_2",
        //     "item_quantity_2",
        //     "item_price_2",
        //     "item_name_3",
        //     "item_quantity_3",
        //     "item_price_3",
        //     "item_name_4",
        //     "item_quantity_4",
        //     "item_price_4",
        //     "item_name_5",
        //     "item_quantity_5",
        //     "item_price_5"
        // ];
        //     for (let i = 0; i < formFields.length; i++) {
        //         let formField = eval(formFields[i]);
        //         if (editedInvoice.formField.trim() === "") {
        //             editedInvoice.formField = "DEFAULT";
        //             break;
        //         }
        //     }