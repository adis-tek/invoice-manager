import { useState, useEffect, useRef, useCallback } from "react"
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.scss'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { addDays, format } from 'date-fns'
import commaNumber from 'comma-number'

import { getInvoices, getDraft, getPending, getPaid, getBillFrom, getBillTo, getBillInfo, getItemList } from '../actions/invoices'
import Sidebar from "../components/sidebar/sidebar"
import NewInvoiceForm from "../components/forms/newInvoiceForm"
import data from "../dummy-data.json"

const Home: NextPage = () => {
  const dispatch = useDispatch();
  const [invoiceList, setInvoiceList] = useState<boolean>(false);
  const [invoiceCount1, setInvoiceCount] = useState<string[]>([""]);
  const [numberOfInvoices, setNumberOfInvoices] = useState<number>(0);
  const [invoiceForm, setInvoiceForm] = useState<boolean>(false);
  const [newArray, setNewArray] = useState<string[]>([])
  const [pendingFilter, setPendingFilter] = useState(true);
  const [paidFilter, setPaidFilter] = useState(true);
  const [draftFilter, setDraftFilter] = useState(true);
  const [filter, setFilter] = useState(false);

  const countRef = useRef<number>(0);

  const invoiceCount = useRef<number>(0);

  const invoices = useSelector((state: any) => state.invoices.invoices);
  const loading = useSelector((state: any) => state.invoices.loading);
  const length = useSelector((state: any) => state.invoices.length);
  console.log("AAAAAA", loading);
  console.log("BBBBBB", length);

  const draft = useSelector((state: any) => state.draft);
  const pending = useSelector((state: any) => state.pending);
  const paid = useSelector((state: any) => state.paid);


  const loadData = useCallback(async () => {
    dispatch(getInvoices());
    console.log("Loading invoices.")
  }, [dispatch]);

  const loadDraft = useCallback(async () => {
    dispatch(getDraft());
    console.log("Loading drafts.")
  }, [dispatch]);

  const loadPending = useCallback(async () => {
    dispatch(getPending());
    console.log("Loading pending.")
  }, [dispatch]);

  const loadPaid = useCallback(async () => {
    dispatch(getPaid());
    console.log("Loading paid.")
  }, [dispatch]);

  // const constructedInvoice = 
  // }

  function checkInvoices() {
    if (invoices[0]?.invoice_id) {
      setInvoiceList(true);
    } else {
        setInvoiceList(false);
      }
  }

  console.log("INVOICES", invoices)

  function checkTotal(value: number) {
    if (isNaN(value)) {
        return 0.00;
    } else {
        return value;
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
      setNumberOfInvoices(invoices?.length);
   }

  useEffect(() => {
      checkInvoices();
      showInvoices();
      loadData();
      loadDraft();
      loadPending();
      loadPaid();
      setTimeout(() => {
        countInvoices();
      }, 1200);
  }, [countRef]);


  let draftAndPending = [
    draft[0],
    pending[0],
  ];

  let draftAndPaid = [
  draft[0],
  paid[0]
  ];

  let pendingAndPaid = [
    pending[0],
    paid[0],
  ];

  let none: [] = [];

  console.log("invoices", invoices);

  const [filterInvoices, setFilterInvoices] = useState(invoices);

  // function filterByPaid (item) {
  //   if (item.status === "paid") {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  // function filterByDraft (item) {
  //   if (item.status === "draft") {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  // function filterByPending (item) {
  //   if (item.status === "pending") {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  // let paidInvoices = invoices.filter(filterByPaid);
  // console.log(paidInvoices);
  // let draftInvoices = invoices.filter(filterByDraft);
  // let pendingInvoices = invoices.filter(filterByPending);
  // console.log(paidInvoices);

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

  // console.log(paidInvoices);

  // let all = Object.assign(paidInvoices, draftInvoices, pendingInvoices);
  // console.log("All", all);
  // let pending = pendingInvoices;
  // console.log(paidInvoices);
  // let paid = paidInvoices;
  // let draft = draftInvoices;
  // let pendingPaid = Object.assign(pendingInvoices, paidInvoices);
  // let pendingDraft = Object.assign(pendingInvoices, draftInvoices);
  // // let paidPending = Object.assign(paidInvoices, pendingInvoices);
  // let paidDraft = Object.assign(paidInvoices, draftInvoices);
  // let none: [] = [];

  // console.log(paidInvoices);

  // const [currentFilter, setCurentFilter] = useState(all);

  // function filterInvoices () {
  //   if (pendingFilter === true && paidFilter === false && draftFilter === true) {
  //     setCurentFilter(all);
  //   }
  //   if (pendingFilter === true && paidFilter === false && draftFilter === false) {
  //     setCurentFilter(pending);
  //   }
  //   if (pendingFilter === false && paidFilter === true && draftFilter === false) {
  //     setCurentFilter(paid);
  //   }
  //   if (pendingFilter === false && paidFilter === false && draftFilter === true) {
  //     setCurentFilter(draft);
  //   }
  //   if (pendingFilter === true && paidFilter === true && draftFilter === false) {
  //     setCurentFilter(pendingPaid);
  //   }
  //   if (pendingFilter === true && paidFilter === false && draftFilter === true) {
  //     setCurentFilter(pendingDraft);
  //   }
  //   if (paidFilter === true && draftFilter === true && pendingFilter === false) {
  //     setCurentFilter(paidDraft);
  //   }
  //   if (paidFilter === false && draftFilter === false && pendingFilter === false) {
  //     setCurentFilter(none);
  //   }
  // }

  useEffect(() => {
    if (pendingFilter === true) {
      if (paidFilter === true && draftFilter === true) {
        setFilterInvoices(invoices);
        console.log("invoices");
      }
    }
      if (pendingFilter === true) {
        if (paidFilter === false && draftFilter === false) {
          setFilterInvoices(pending);
          console.log("pending");
        }
      }
      if (paidFilter === true) {
        if (draftFilter === false && pendingFilter === false) {
          setFilterInvoices(paid);
          console.log("paid");
        }
      }
      if (draftFilter === true) {
        if (pendingFilter === false && paidFilter === false) {
          setFilterInvoices(draft);
          console.log("draft");
        }
      }
      if (pendingFilter === true && paidFilter === true) {
        if (draftFilter === false) {
          setFilterInvoices(pendingAndPaid);
          console.log("pendingPaid");
        }
      }
      if (draftFilter === true && pendingFilter === true) {
        if (paidFilter === false) {
          setFilterInvoices(draftAndPending);
          console.log("pendingDraft");
        }
      }
      if (draftFilter === true && paidFilter === true) {
        if (pendingFilter === false) {
          setFilterInvoices(draftAndPaid);
          console.log("paidDraft");
        }
      }
      if (paidFilter === false && draftFilter === false) {
        if (pendingFilter === false) {
          setFilterInvoices(none);
          console.log("None");
        }
      }
  }, [pendingFilter, paidFilter, draftFilter, invoices])

  // console.log("Paid", paidInvoices);
  // console.log("Pending", pendingInvoices);
  // console.log("Draft", draftInvoices);

  // console.log("Current Filter", currentFilter);

  // Checking my variables
  // console.log(data);
  // console.log(invoiceList);
  // console.log(invoiceCount);

  const renderInvoiceList = (
    filterInvoices?.map((invoice: any, index: number) => {
      return(
        <>
        <Link href={`/${index}`}>
        <div key={invoice.invoice_id} className={styles.invoiceContainer}>
        <div className={styles.firstHalf}>
        <p className={styles.id}>#<b>000{index + 1}</b></p>
        <p className={styles.payDate}>Due {

            format(addDays(new Date(`${(invoice?.invoice_date.slice(0, 10).slice(8, 11))}
            ${(invoice?.invoice_date.slice(0, 10).slice(5, 7) === "01" ? "Jan" : 
            invoice?.invoice_date.slice(0, 10).slice(5, 7) === "02" ? "Feb" :
            invoice?.invoice_date.slice(0, 10).slice(5, 7) === "03" ? "Mar" :
            invoice?.invoice_date.slice(0, 10).slice(5, 7) === "04" ? "Apr" :
            invoice?.invoice_date.slice(0, 10).slice(5, 7) === "05" ? "May" :
            invoice?.invoice_date.slice(0, 10).slice(5, 7) === "06" ? "Jun" :
            invoice?.invoice_date.slice(0, 10).slice(5, 7) === "07" ? "Jul" :
            invoice?.invoice_date.slice(0, 10).slice(5, 7) === "08" ? "Aug" :
            invoice?.invoice_date.slice(0, 10).slice(5, 7) === "09" ? "Sep" :
            invoice?.invoice_date.slice(0, 10).slice(5, 7) === "10" ? "Oct" :
            invoice?.invoice_date.slice(0, 10).slice(5, 7) === "11" ? "Nov" :
            invoice?.invoice_date.slice(0, 10).slice(5, 7) === "12" ? "Dec" :
            ""
            )}
            ${invoice?.invoice_date.slice(0, 10).slice(0, 4)}`), invoice?.payment_terms), "dd MMM yyyy").toString()

        //       const invoiceDate = invoice?.invoice_date.slice(0, 10);
        //       const paymentTerms = invoice?.payment_terms;
        //       const invoiceDateYear = invoice?.invoice_date.slice(0, 10).slice(0, 4);
        //       const invoiceDateMonth = invoice?.invoice_date.slice(0, 10).slice(5, 7);
        //       const invoiceDateDay = invoice?.invoice_date.slice(0, 10).slice(8, 11);
        //       const fullInvoiceDate = ((invoice?.invoice_date.slice(0, 10).slice(5, 7)) + ' ' + invoiceDateDay + ' ' + invoiceDateYear).toString();
        //       const fullInvoiceDateDisplayed = (invoiceDateDay + ' ' + invoiceDateMonthFormatted + ' ' + invoiceDateYear).toString();
        //       const processedInvoiceDate = new Date(fullInvoiceDate);
        //       const paymentDateProcessed = addDays(processedInvoiceDate, invoice?.payment_terms);
        //       const paymentDate = format(paymentDateProcessed, "dd MMM yyyy").toString();
        // invoice.invoice_date
        }</p>
        <p className={styles.clientName}>{invoice.client_name}</p>
        </div>
        <div className={styles.secondHalf}>
        <p className={styles.total}><b>$</b><b>{
          commaNumber(
          (checkTotal((invoice.item_price_1 ? (Number(invoice.item_price_1) * invoice?.item_quantity_1) : 0) 
          + (invoice.item_price_2 ? (Number(invoice.item_price_2) * invoice?.item_quantity_2) : 0)
          + (invoice.item_price_3 ? (Number(invoice.item_price_3) * invoice?.item_quantity_3) : 0)
          + (invoice.item_price_4 ? (Number(invoice.item_price_4) * invoice?.item_quantity_4) : 0)
          + (invoice.item_price_5 ? (Number(invoice.item_price_5) * invoice?.item_quantity_5) : 0))).toFixed(2)
          )}</b></p>
        {invoice.status === "pending" &&
            <div className={styles.pendingStatusContainer}>
            <div className={styles.pendingCircle} />
            <p className={styles.pendingStatus}>{invoice.status}</p>
            </div>
        }
        {invoice.status === "paid" &&
            <div className={styles.paidStatusContainer}>
            <div className={styles.paidCircle} />
            <p className={styles.paidStatus}>{invoice.status}</p>
            </div>
        }
        {invoice.status === "draft" &&
            <div className={styles.draftStatusContainer}>
            <div className={styles.draftCircle} />
            <p className={styles.draftStatus}>{invoice.status}</p>
            </div>
        }
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
      )}));

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
        <div className={styles.shadow} />
      </>
      }
      <div className={styles.header}>
        <div className={styles.invoiceHeaderContainer}>
          <h2>Invoices</h2>
          {loading ? <p>Loading invoices...</p> :
          !loading && invoices.length > 0 ? <p>There are {invoices.length} total invoices</p> : 
          <p>No invoices</p>}
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
            <div className={styles.invoiceListContainer}>
            {loading ? <div>LOADING...</div> : renderInvoiceList}
            </div>
      </main>
    </div>
  )
}

export default Home
