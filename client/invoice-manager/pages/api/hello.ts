// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from "axios";

type Data = {
  name: string
}

const url = "http://localhost:5000/invoices";
const identity = "http://localhost:5000/invoices/identity";
const profile = "http://localhost:5000/invoices/profile";
const billFrom = "http://localhost:5000/invoices/bill-from";
const billTo = "http://localhost:5000/invoices/bill-to";
const billInfo = "http://localhost:5000/invoices/bill-info";
const itemList = "http://localhost:5000/invoices/item-list";

export const fetchInvoices = () => axios.get(url);
export const createInvoice = (newInvoice: any) => axios.post(url, newInvoice);
export const updateInvoice = (updatedInvoice: any, id: any) => axios.patch(`${url}/${id}`, updatedInvoice);
export const deleteInvoice = (id: any) => axios.delete(`${url}/${id}`, id);


export const fetchIdentity = () => axios.get(identity);
export const fetchProfile = () => axios.get(profile);
export const fetchBillFrom = () => axios.get(billFrom);
export const fetchBillTo = () => axios.get(billTo);
export const fetchBillInfo = () => axios.get(billInfo);
export const fetchItemList = () => axios.get(itemList);

// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   res.status(200).json({ name: 'John Doe' })
// }