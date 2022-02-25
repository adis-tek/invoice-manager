import express from "express";
import { getAccountUser, getIdentity, getProfile, getInvoices, getBillFrom, getBillTo, getBillInfo, getItemList, filterInvoices, createInvoice, updateInvoice, deleteInvoice } from "../controllers/invoices.js";

const router = express.Router();

//GET USER DATA
router.get("/account-users", getAccountUser);
router.get("/identity", getIdentity);
router.get("/profile", getProfile);
//GET INVOICE DATA
router.get("/", getInvoices);
router.get("/bill-from", getBillFrom);
router.get("/bill-to", getBillTo);
router.get("/bill-info", getBillInfo);
router.get("/item-list", getItemList);
//FILTER INVOICES
router.get("/:id", filterInvoices);
//CREATE INVOICES
router.post("/", createInvoice);
//UPDATE INVOICE
router.put("/:id", updateInvoice);
//DELETE INVOICE
router.delete("/:id", deleteInvoice);

export default router 