import { useState, useEffect, useRef, useCallback } from "react"
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
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
  const [numberOfInvoices, setNumberOfInvoices] = useState<number>(0);
  const [invoiceForm, setInvoiceForm] = useState<boolean>(false);
  const [newArray, setNewArray] = useState<string[]>([])
  const [pendingFilter, setPendingFilter] = useState(true);
  const [paidFilter, setPaidFilter] = useState(true);
  const [draftFilter, setDraftFilter] = useState(true);
  const [filter, setFilter] = useState(false);

  const countRef = useRef<number>(0);

  const invoices = useSelector((state: any) => state.invoices);

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

   function countInvoices () {
     setNumberOfInvoices(invoices.length);
   }

  useEffect(() => {
      checkInvoices();
      showInvoices();
      loadData();
      countInvoices();
  }, [countRef]);

  console.log("invoice", invoices[4]?.status);

  function filterByPaid (item) {
    if (item.status === "paid") {
      return true;
    } else {
      return false;
    }
  }

  function filterByDraft (item) {
    if (item.status === "draft") {
      return true;
    } else {
      return false;
    }
  }

  function filterByPending (item) {
    if (item.status === "pending") {
      return true;
    } else {
      return false;
    }
  }

  let paidInvoices = invoices.filter(filterByPaid);
  let draftInvoices = invoices.filter(filterByDraft);
  let pendingInvoices = invoices.filter(filterByPending);

  function openFilter () {
    setFilter(!filter);
  }

  function pendingToggle () {
    setPendingFilter(!pendingFilter);
  }

  function paidToggle () {
    setPaidFilter(!paidFilter);
  }

  function draftToggle () {
    setDraftFilter(!draftFilter);
  }

  console.log("Paid", paidInvoices);
  console.log("Pending", pendingInvoices);
  console.log("Draft", draftInvoices);

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
          <NewInvoiceForm changeInvoiceForm={invoiceForm => setInvoiceForm(invoiceForm)} />
        </div>
      </>
      }
      <div className={styles.header}>
        <div className={styles.invoiceHeaderContainer}>
          <h2>Invoices</h2>
          {numberOfInvoices === 0 &&
            <p>No Invoices</p>
          }
          {numberOfInvoices > 0 && 
          <p>{numberOfInvoices} Invoices</p>
          }
        </div>
        <div className={styles.rightEnd}>
          <div className={styles.filterByStatusButton} onClick={openFilter}>
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
          {filter &&
          <div className={styles.filterContainer}>
          <div className={styles.toggleContainer}>
          {draftFilter === true && 
          <>
          <div className={styles.checkMarkContainer} onClick={draftToggle}>
              <Image
              src="/check-mark.png"
              alt="check-mark"
              width={10}
              height={10}
                />
          </div>
          </>
          }
          {draftFilter === false && 
          <>
          <div className={styles.emptyContainer} onClick={draftToggle} />
          </>
          }
          <h3>Draft</h3>
          </div>
          <div className={styles.toggleContainer}>
          {pendingFilter === true && 
          <>
          <div className={styles.checkMarkContainer} onClick={pendingToggle}>
              <Image
              src="/check-mark.png"
              alt="check-mark"
              width={10}
              height={10}
                />
          </div>
          </>
          }
          {pendingFilter === false && 
          <>
          <div className={styles.emptyContainer} onClick={pendingToggle} />
          </>
          }
          <h3>Pending</h3>
          </div>
          <div className={styles.toggleContainer}>
          {paidFilter === true && 
          <>
          <div className={styles.checkMarkContainer} onClick={paidToggle}>
              <Image
              src="/check-mark.png"
              alt="check-mark"
              width={10}
              height={10}
                />
          </div>
          </>
          }
          {paidFilter === false && 
          <>
          <div className={styles.emptyContainer} onClick={paidToggle} />
          </>
          }
          <h3>Paid</h3>
          </div>
          </div>
          }
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
      <div className={styles.invoiceListContainer}>
      {/* Pending invoices */}
      {pendingFilter === true &&
      <>
      {pendingInvoices?.map((invoice: any) => {
          {console.log(invoice?.clients_name)}
          return(
            <>
            <Link href={`/${invoice?.invoice_id}`}>
            <div key={invoice.invoice_id} className={styles.invoiceContainer}>
            <div className={styles.firstHalf}>
            <p className={styles.id}>#<b>{invoice.invoice_id}</b></p>
            <p className={styles.payDate}>Due {invoice.invoice_date}</p>
            <p className={styles.clientName}>{invoice.clients_name}</p>
            </div>
            <div className={styles.secondHalf}>
            <p className={styles.total}><b>{invoice.price}</b></p>
            <div className={styles.statusContainer}>
              <div className={styles.circle} />
              <p className={styles.status}>{invoice.status}</p>
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
          </Link>
          </>
          )
        })}
        </>
        }
      {/* Paid invoices */}
      {paidFilter === true &&
      <>
      {paidInvoices?.map((invoice: any) => {
          {console.log(invoice?.clients_name)}
          return(
            <>
            <Link href={`/${invoice?.invoice_id}`}>
            <div key={invoice.invoice_id} className={styles.invoiceContainer}>
            <div className={styles.firstHalf}>
            <p className={styles.id}>#<b>{invoice.invoice_id}</b></p>
            <p className={styles.payDate}>Due {invoice.invoice_date}</p>
            <p className={styles.clientName}>{invoice.clients_name}</p>
            </div>
            <div className={styles.secondHalf}>
            <p className={styles.total}><b>{invoice.price}</b></p>
            <div className={styles.statusContainer}>
              <div className={styles.circle} />
              <p className={styles.status}>{invoice.status}</p>
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
          </Link>
          </>
          )
        })}
        </>
        }
      {/* Draft invoices */}
      {draftFilter === true &&
      <>
      {draftInvoices?.map((invoice: any) => {
          {console.log(invoice?.clients_name)}
          return(
            <>
            <Link href={`/${invoice?.invoice_id}`}>
            <div key={invoice.invoice_id} className={styles.invoiceContainer}>
            <div className={styles.firstHalf}>
            <p className={styles.id}>#<b>{invoice.invoice_id}</b></p>
            <p className={styles.payDate}>Due {invoice.invoice_date}</p>
            <p className={styles.clientName}>{invoice.clients_name}</p>
            </div>
            <div className={styles.secondHalf}>
            <p className={styles.total}><b>{invoice.price}</b></p>
            <div className={styles.statusContainer}>
              <div className={styles.circle} />
              <p className={styles.status}>{invoice.status}</p>
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
          </Link>
          </>
          )
        })}
        </>
        }
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
      </main>
    </div>
  )
}

export default Home
