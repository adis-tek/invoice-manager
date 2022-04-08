// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse, Redirect } from 'next'
import Router from 'next/router'
import axios from "axios";

type Data = {
  name: string
}
 
axios.defaults.withCredentials = true;

const url = "http://localhost:5000/invoices";
const identity = "http://localhost:5000/invoices/identity";
const profile = "http://localhost:5000/invoices/profile";
const billFrom = "http://localhost:5000/invoices/bill-from";
const billTo = "http://localhost:5000/invoices/bill-to";
const billInfo = "http://localhost:5000/invoices/bill-info";
const itemList = "http://localhost:5000/invoices/item-list";

const API = axios.create({ baseURL: 'http://localhost:5000' })

export const fetchInvoices = () => API.get('/invoices');
export const createInvoice = (newInvoice: any) => API.post('/invoices', newInvoice);
export const updateInvoice = (updatedInvoice: any, id: any) => API.patch(`/invoices/${id}`, updatedInvoice);
export const deleteInvoice = (id: any) => API.delete(`/invoices/${id}`, id);

export const getUser = () => API.get('/user/profile', { withCredentials: true }).then(response => {
  if (response.data == true) {
    {
    console.log("User is logged in.");
    return true;
    }
  } else {
    console.log("User must sign in.")
    return false;

  }
});

export const updateUser = (formData: any) => API.post('/user/profile', formData, { withCredentials: true }).then(response => {
  if (response.data == true) {
    {
    console.log("User updated.");
    return true;
    }
  } else {
    console.log("User update failed.")
    return false;

  }
});

export const signin = (formData: any) => API.post('/user/signin', formData, { withCredentials: true }).then(response => {
  if (response.data == true) {
    {
    console.log("Sign in successful.");
    Router.push("/");
    }
  } else {
    return {message: "Incorrect credentials."};
  }
});

export const signup = (formData: any) => API.post('/user/signup', formData, { withCredentials: true }).then(response => {
  if (response.data == true) {
    {
    console.log("Sign up successful.");
    Router.push("/auth/signin");
    }
  }
});;

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