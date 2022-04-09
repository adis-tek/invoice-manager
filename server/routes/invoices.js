import express from "express";
import { getAccountUser, getInvoices, getInvoicesDrafts, getInvoicesPending, getInvoicesPaid, filterInvoices, createInvoice, updateInvoice, deleteInvoice } from "../controllers/invoices.js";
import auth from '../middleware/auth.js'


const router = express.Router();

//GET USER DATA
router.get("/account-users", getAccountUser);
//GET INVOICE DATA
router.get("/", auth, getInvoices);
router.get("/draft", auth, getInvoicesDrafts);
router.get("/pending", auth, getInvoicesPending);
router.get("/paid", auth, getInvoicesPaid);

//CREATE INVOICES
router.post("/", auth, createInvoice);
//FILTER INVOICES
router.get("/:id", filterInvoices);
//UPDATE INVOICE
router.patch("/:id", auth, updateInvoice);
//DELETE INVOICE
router.delete("/:id", auth,  deleteInvoice);

export default router 


// router.get("/bill-from", getBillFrom);
// router.get("/bill-to", getBillTo);
// router.get("/bill-info", getBillInfo);
// router.get("/item-list", getItemList);