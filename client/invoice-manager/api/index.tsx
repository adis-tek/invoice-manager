import axios from "axios";

const url = "http://localhost:5000/invoices";

export const fetchInvoices = () => axios.get(url);