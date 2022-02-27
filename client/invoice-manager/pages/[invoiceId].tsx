import { useState, useEffect, useRef, useCallback } from "react"
import type { NextPage } from "next";
import { useRouter } from "next/router"
import styles from '../styles/InvoicePage.module.scss'

import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

import { getInvoices } from '../actions/invoices'


const InvoicePageId: NextPage = () => {
    const router = useRouter();
    const invoiceId = router.query.invoiceId;
    const targetInvoice = parseInt(invoiceId) - 1;
    const dispatch = useDispatch();
    const invoices = useSelector((state: any) => state.invoices);

    const pageInvoice = invoices[targetInvoice];

    const countRef = useRef<number>(0);

    const loadData = useCallback(async () => {
        dispatch(getInvoices());
        console.log("Loading invoices.")
      }, [dispatch]);

    useEffect(() => {
        loadData();
    }, [countRef]);

    console.log(invoices[targetInvoice]);
    console.log(invoices.clients_name);

    return (
    <div>
    <p>Invoice Page ID = {invoiceId}</p>
    <p>Target Invoice = {targetInvoice}</p>
    <p>Page Invoice = {pageInvoice.clients_email}</p>
    </div>
    )
}

export default InvoicePageId;