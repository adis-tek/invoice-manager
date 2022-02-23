import express from "express";
import { getInvoices, filterInvoices, createInvoice, updateInvoice, deleteInvoice } from "../controllers/invoices.js";

const router = express.Router();

//GET INVOICES
router.get("/", getInvoices);
//FILTER INVOICES
router.get("/:id", filterInvoices);
//CREATE INVOICES
router.post("/", createInvoice);
//UPDATE INVOICE
router.put("/:id", updateInvoice);
//DELETE INVOICE
router.delete("/:id", deleteInvoice);

export default router