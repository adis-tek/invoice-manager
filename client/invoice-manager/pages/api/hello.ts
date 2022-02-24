// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from "axios";

type Data = {
  name: string
}

const url = "http://localhost:5000/invoices";

export const fetchInvoices = () => axios.get(url);
export const createInvoice = (newInvoice: any) => axios.post(url, newInvoice);

// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   res.status(200).json({ name: 'John Doe' })
// }