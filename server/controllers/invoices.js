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

// export const getIdentity = async(req, res) => {
//     try {
//         const allInvoices = await pool.query("SELECT * FROM identity join account_user on identity.account_user_uuid=account_user.account_user_uuid");
//         res.json(allInvoices.rows);
//     } catch(err) {
//         console.log(err.message)
//     }
// }

// export const getProfile = async(req, res) => {
//     try {
//         const allInvoices = await pool.query("SELECT * FROM profile join account_user on profile.account_user_uuid=account_user.account_user_uuid");
//         res.json(allInvoices.rows);
//     } catch(err) {
//         console.log(err.message)
//     }
// }

//READ INVOICES

export const getInvoices = async(req, res) => {
    const userId = req.session.passport?.user;
    try {
        const allInvoices = await pool.query("SELECT * FROM invoice RIGHT OUTER JOIN bill_from ON invoice.bill_from_id = bill_from.bill_from_id RIGHT OUTER JOIN bill_to ON invoice.bill_to_id = bill_to.bill_to_id RIGHT OUTER JOIN bill_info ON invoice.bill_info_id = bill_info.bill_info_id RIGHT OUTER JOIN item_list ON invoice.item_list_id = item_list.item_list_id WHERE account_user_uuid = $1", [userId]);
        console.log(allInvoices.rows);
        res.json(allInvoices.rows);
    } catch(err) {
        console.log(err.message)
    }
}

export const getInvoicesDrafts = async(req, res) => {
    const userId = req.session.passport?.user;
    try {
        const draftInvoices = await pool.query("SELECT * FROM invoice RIGHT OUTER JOIN bill_from ON invoice.bill_from_id = bill_from.bill_from_id RIGHT OUTER JOIN bill_to ON invoice.bill_to_id = bill_to.bill_to_id RIGHT OUTER JOIN bill_info ON invoice.bill_info_id = bill_info.bill_info_id RIGHT OUTER JOIN item_list ON invoice.item_list_id = item_list.item_list_id WHERE account_user_uuid = $1 and status = $2;", [userId, 'draft']);
        res.json(draftInvoices.rows);
    } catch(err) {
        console.log(err.message)
    }
}

export const getInvoicesPending = async(req, res) => {
    const userId = req.session.passport?.user;
    try {
        const pendingInvoices = await pool.query("SELECT * FROM invoice RIGHT OUTER JOIN bill_from ON invoice.bill_from_id = bill_from.bill_from_id RIGHT OUTER JOIN bill_to ON invoice.bill_to_id = bill_to.bill_to_id RIGHT OUTER JOIN bill_info ON invoice.bill_info_id = bill_info.bill_info_id RIGHT OUTER JOIN item_list ON invoice.item_list_id = item_list.item_list_id WHERE account_user_uuid = $1 and status = $2;", [userId, 'pending']);
        res.json(pendingInvoices.rows);
    } catch(err) {
        console.log(err.message)
    }
}

export const getInvoicesPaid = async(req, res) => {
    const userId = req.session.passport?.user;
    try {
        const paidInvoices = await pool.query("SELECT * FROM invoice RIGHT OUTER JOIN bill_from ON invoice.bill_from_id = bill_from.bill_from_id RIGHT OUTER JOIN bill_to ON invoice.bill_to_id = bill_to.bill_to_id RIGHT OUTER JOIN bill_info ON invoice.bill_info_id = bill_info.bill_info_id RIGHT OUTER JOIN item_list ON invoice.item_list_id = item_list.item_list_id WHERE account_user_uuid = $1 and status = $2;", [userId, 'paid']);
        res.json(paidInvoices.rows);
    } catch(err) {
        console.log(err.message)
    }
}

// export const getBillFrom = async(req, res) => {
//     try {
//         const allBillFrom = await pool.query("SELECT * FROM invoice join bill_from on invoice.bill_from_id=bill_from.bill_from_id");
//         res.json(allBillFrom.rows);
//     } catch(err) {
//         console.log(err.message)
//     }
// }

// export const getBillTo = async(req, res) => {
//     try {
//         const allBillFrom = await pool.query("SELECT * FROM invoice join bill_to on invoice.bill_to_id=bill_to.bill_to_id");
//         res.json(allBillFrom.rows);
//     } catch(err) {
//         console.log(err.message)
//     }
// }

// export const getBillInfo = async(req, res) => {
//     try {
//         const allBillInfo = await pool.query("SELECT * FROM invoice join bill_info on invoice.bill_info_id=bill_info.bill_info_id");
//         res.json(allBillInfo.rows);
//     } catch(err) {
//         console.log(err.message)
//     }
// }

// export const getItemList = async(req, res) => {
//     try {
//         const allItemList = await pool.query("SELECT * FROM invoice join item_list on invoice.item_list_id=item_list.item_list_id");
//         res.json(allItemList.rows);
//     } catch(err) {
//         console.log(err.message)
//     }
// }

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
    const userId = req.session.passport?.user;
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
        const itemName1 = newInvoice.itemName1;
        const itemQuantity1 = newInvoice.itemQuantity1;
        const itemPrice1 = newInvoice.itemPrice1;
        const itemName2 = newInvoice.itemName2;
        const itemQuantity2 = newInvoice.itemQuantity2;
        const itemPrice2 = newInvoice.itemPrice2;
        const itemName3 = newInvoice.itemName3;
        const itemQuantity3 = newInvoice.itemQuantity3;
        const itemPrice3 = newInvoice.itemPrice3;
        const itemName4 = newInvoice.itemName4;
        const itemQuantity4 = newInvoice.itemQuantity4;
        const itemPrice4 = newInvoice.itemPrice4;
        const itemName5 = newInvoice.itemName5;
        const itemQuantity5 = newInvoice.itemQuantity5;
        const itemPrice5 = newInvoice.itemPrice5;
        const status = newInvoice.status;

        const createInvoice = await pool.query("INSERT INTO invoice(account_user_uuid, status) VALUES($1, $2) RETURNING *",
        [userId, status]);

        const createBillFrom = await pool.query("INSERT INTO bill_from(street_address, city, postal_code, country) VALUES($1, $2, $3, $4) RETURNING *",
        [billFromStreet, billFromCity, billFromPostal, billFromCountry]);

        const createBillTo = await pool.query("INSERT INTO bill_to(client_name, client_email, client_street_address, client_city, client_postal_code, client_country) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
        [clientName, clientEmail, billToStreet, billToCity, billToPostal, billToCountry]);

        const createBillInfo = await pool.query("INSERT INTO bill_info(invoice_date, payment_terms, project_description) VALUES($1, $2, $3) RETURNING *",
        [invoiceDate, paymentTerms, projectDescription]);

        const createItemList = await pool.query("INSERT INTO item_list(item_name_1, item_quantity_1, item_price_1, item_name_2, item_quantity_2, item_price_2, item_name_3, item_quantity_3, item_price_3, item_name_4, item_quantity_4, item_price_4, item_name_5, item_quantity_5, item_price_5) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *",
        [itemName1, itemQuantity1, itemPrice1, itemName2, itemQuantity2, itemPrice2, itemName3, itemQuantity3, itemPrice3, itemName4, itemQuantity4, itemPrice4, itemName5, itemQuantity5, itemPrice5]);

        console.log(newInvoice);
        console.log(clientName);
        console.log(userId);
        res.status(200);
    }   catch (err) {
        console.log(err.message)
    }
}

//UPDATE INVOICES

export const updateInvoice = async(req, res) => {
    try {
        const editedInvoice = req.body;

        //Form Data
        const id = editedInvoice.invoiceId;
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
        const itemName1 = editedInvoice.itemName1;
        const itemQuantity1 = editedInvoice.itemQuantity1;
        const itemPrice1 = editedInvoice.itemPrice1;
        const itemName2 = editedInvoice.itemName2;
        const itemQuantity2 = editedInvoice.itemQuantity2;
        const itemPrice2 = editedInvoice.itemPrice2;
        const itemName3 = editedInvoice.itemName3;
        const itemQuantity3 = editedInvoice.itemQuantity3;
        const itemPrice3 = editedInvoice.itemPrice3;
        const itemName4 = editedInvoice.itemName4;
        const itemQuantity4 = editedInvoice.itemQuantity4;
        const itemPrice4 = editedInvoice.itemPrice4;
        const itemName5 = editedInvoice.itemName5;
        const itemQuantity5 = editedInvoice.itemQuantity5;
        const itemPrice5 = editedInvoice.itemPrice5;
        const status = editedInvoice.status;

        //Postgres Updates 
        const updateBillFrom = await pool.query(
            "UPDATE bill_from SET street_address = $1, city = $2, postal_code = $3, country = $4 WHERE bill_from_id = $5", 
            [billFromStreet, billFromCity, billFromPostal, billFromCountry, id]);
        
        const updateBillTo = await pool.query(
            "UPDATE bill_to SET client_name = $1, client_email = $2, client_street_address = $3, client_city = $4, client_postal_code = $5, client_country = $6 WHERE bill_to_id = $7", 
            [clientName, clientEmail, billToStreet, billToCity, billToPostal, billToCountry, id]);
        
        const updateBillInfo = await pool.query(
            "UPDATE bill_info SET invoice_date = $1, payment_terms = $2, project_description = $3 WHERE bill_info_id = $4", 
            [invoiceDate, paymentTerms, projectDescription, id]);

        const updateItemList = await pool.query(
            "UPDATE item_list SET item_name_1 = $1, item_quantity_1 = $2, item_price_1 = $3, item_name_2 = $4, item_quantity_2 = $5, item_price_2 = $6, item_name_3 = $7, item_quantity_3 = $8, item_price_3 = $9, item_name_4 = $10, item_quantity_4= $11, item_price_4 = $12, item_name_5 = $13, item_quantity_5 = $14, item_price_5 = $15 WHERE item_list_id = $16", 
            [itemName1, itemQuantity1, itemPrice1, itemName2, itemQuantity2, itemPrice2, itemName3, itemQuantity3, itemPrice3, itemName4, itemQuantity4, itemPrice4, itemName5, itemQuantity5, itemPrice5, id]);

        const updateStatus = await pool.query(
            "UPDATE invoice SET status = $1 WHERE invoice_id = $2",
            [status, id]);

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
        const deleteInvoice = await pool.query("DELETE FROM invoice WHERE invoice_id = $1", [id]);
        const deleteBillFrom = await pool.query("DELETE FROM bill_from WHERE bill_from_id = $1", [id]);
        const deleteBillTo = await pool.query("DELETE FROM bill_to WHERE bill_to_id = $1", [id]);
        const deleteBillInfo = await pool.query("DELETE FROM bill_info WHERE bill_info_id = $1", [id]);
        const deleteItemList = await pool.query("DELETE FROM item_list WHERE item_list_id = $1", [id]);
        console.log(req.body);
        console.log("Deleted invoice", id);
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