import { useState, useEffect, useRef, useCallback } from "react"
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

import { getInvoices, getBillFrom, getBillTo, getBillInfo, getItemList } from '../actions/invoices'
import Sidebar from "../components/sidebar/sidebar"
import NewInvoiceForm from "../components/forms/newInvoiceForm"
import data from "../dummy-data.json"

const Home: NextPage = () => {
  const dispatch = useDispatch();
  const [invoiceList, setInvoiceList] = useState<boolean>(false);
  const [invoiceCount, setInvoiceCount] = useState<string[]>([""]);
  const [invoiceForm, setInvoiceForm] = useState<boolean>(true);
  const [newArray, setNewArray] = useState<string[]>([])

  const countRef = useRef<number>(0);

  const invoices = useSelector((state: any) => state.invoices);
  const billFrom = useSelector((state: any) => state.billFrom);
  const billTo = useSelector((state: any) => state.billTo);
  const billInfo = useSelector((state: any) => state.billInfo);
  const itemList = useSelector((state: any) => state.itemList);

  const loadData = useCallback(async () => {
    dispatch(getInvoices());
    console.log("Loading invoices.")
  }, [dispatch]);

  // const constructedInvoice = 
  // }

  function checkInvoices() {
    if (data?.user1) {
      setInvoiceList(true);
    } else {
        setInvoiceList(false);
      }
  }

   function showInvoices() {
      const invoicesCounted = Object.keys(data);
      setInvoiceCount(invoicesCounted);
   }

   function toggleNewInvoiceForm() {
     setInvoiceForm(!invoiceForm);
   }

   function calcId() {
     const tempId = invoices.length;
     const officialId = [{}];
     switch (tempId) {
       case tempId <= 9:

     }
   }

  useEffect(() => {
      checkInvoices();
      showInvoices();
      loadData();
  }, [countRef]);

  console.log("invoices",invoices);
  console.log("billFrom", billFrom);
  console.log("billTo", billTo);
  console.log("billInfo", billInfo);
  console.log("itemList", itemList);



  // Checking my variables
  // console.log(data);
  // console.log(invoiceList);
  // console.log(invoiceCount);

  return (
    <div className={styles.container}>
      <Head>
        <title>Invoice Manager</title>
        <meta name="description" content="Manage your invoices" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Sidebar />
      <main className={styles.main}>
      {invoiceForm === true &&
      <>
        <div className={styles.sidebarBackground} />
        <div className={styles.invoiceFormContainer}>
          <NewInvoiceForm />
        </div>
      </>
      }
      <div className={styles.header}>
        <div className={styles.invoiceHeaderContainer}>
          <h2>Invoices</h2>
          <p>No invoices</p>
        </div>
        <div className={styles.rightEnd}>
          <div className={styles.filterByStatusButton}>
          <h3>Filter by status</h3>
          <div className={styles.imageHolder}>
            <Image
              src="/down-arrow.png"
              alt="down-arrow"
              width={9}
              height={5}
                />
          </div>
          </div>
          <div className={styles.newInvoiceButton} onClick={toggleNewInvoiceForm}>
            <Image
              src="/plus.png"
              alt="plus"
              width={32}
              height={32}
                />
              <h3>New Invoice</h3>
          </div>
        </div>
      </div>
      <div>
      {invoices.map((item: any) => {
        <p>{item.invoice_id}</p>
      })}
      <p>{invoices.invoice_id}</p>
      </div>
      {invoiceList === false &&
      <div className={styles.noInvoicesContainer}>
      <Image 
        src="/no-invoices.png"
        alt="no-invoices"
        width={241}
        height={200}
          />
        <h2>There is nothing here</h2>
        <p>Create an invoice by clicking the
        <b> New Invoice </b>button and get started</p>
      </div>
      }
      {invoiceList === true &&
      <>
      <div className={styles.invoiceListContainer}>
      {invoices?.map((invoice: any) => {
          {console.log(invoice?.clients_name)}
          return(
            <div key={invoice} className={styles.invoiceContainer}>
            <div className={styles.firstHalf}>
            <p className={styles.id}>#<b>{invoice.invoice_id}</b></p>
            <p className={styles.payDate}>Due {invoice.invoice_date}</p>
            <p className={styles.clientName}>{invoice.clients_name}</p>
            </div>
            <div className={styles.secondHalf}>
            <p className={styles.total}><b>{invoice.price}</b></p>
            <div className={styles.statusContainer}>
              <div className={styles.circle} />
              <p className={styles.status}>Pending</p>
            </div>
            <div className={styles.invoiceArrow}>
            <Image
              src="/invoice-arrow.png"
              alt="invoice-arrow"
              width={7}
              height={10}
              layout="fixed"
            />
            </div>
            </div>
          </div>
          )
        })}
        <div className={styles.invoiceContainer}>
          <div className={styles.firstHalf}>
          <p className={styles.id}>#<b>{data.user1[0].id}</b></p>
          <p className={styles.payDate}>Due {data.user1[0].bill_address[0].invoice_date}</p>
          <p className={styles.clientName}>{data.user1[0].bill_address[0].client_name}</p>
          </div>
          <div className={styles.secondHalf}>
          <p className={styles.total}><b>$300.00</b></p>
          <div className={styles.statusContainer}>
            <div className={styles.circle} />
            <p className={styles.status}>{data.user1[0].status}</p>
          </div>
          <div className={styles.invoiceArrow}>
          <Image
            src="/invoice-arrow.png"
            alt="invoice-arrow"
            width={7}
            height={10}
            layout="fixed"
          />
          </div>
          </div>
        </div>
        <div className={styles.invoiceContainer}>
          <div className={styles.firstHalf}>
          <p className={styles.id}>#<b>{data.user1[0].id}</b></p>
          <p className={styles.payDate}>Due {data.user1[0].bill_address[0].invoice_date}</p>
          <p className={styles.clientName}>{data.user1[0].bill_address[0].client_name}</p>
          </div>
          <div className={styles.secondHalf}>
          <p className={styles.total}><b>$300.00</b></p>
          <div className={styles.statusContainer}>
            <div className={styles.circle} />
            <p className={styles.status}>{data.user1[0].status}</p>
          </div>
          <div className={styles.invoiceArrow}>
          <Image
            src="/invoice-arrow.png"
            alt="invoice-arrow"
            width={7}
            height={10}
            layout="fixed"
          />
          </div>
          </div>
        </div>
      </div>
      </>
}
      </main>
    </div>
  )
}

export default Home
