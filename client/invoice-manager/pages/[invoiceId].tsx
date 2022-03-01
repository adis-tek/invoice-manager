import { useState, useEffect, useRef, useCallback } from "react"
import Head from 'next/head'
import Image from 'next/image'
import type { NextPage } from "next";
import { useRouter } from "next/router"
import styles from '../styles/InvoicePage.module.scss'

import Sidebar from "../components/sidebar/sidebar"
import NewInvoiceForm from "../components/forms/newInvoiceForm"

import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

import { getInvoices } from '../actions/invoices'


const InvoicePageId: NextPage = () => {
    const router = useRouter();
    const invoiceId = router.query.invoiceId;
    const targetInvoice = parseInt(invoiceId) - 1;
    const dispatch = useDispatch();
    const invoices = useSelector((state: any) => state.invoices);
    const [invoiceForm, setInvoiceForm] = useState(false);

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
      <div className={styles.pageContainer}>
      <div className={styles.goBackContainer}>
          <div className={styles.backArrowHolder}>
          <Image
          src="/go-back-arrow.png"
          alt="invoice-arrow"
          width={7}
          height={10}
          layout="fixed"
          />
          </div>
          <p><b>Go back</b></p>
      </div>
      <div className={styles.mainHeaderContainer}>
          <div className={styles.statusContainer}>
              <p className={styles.statusText}>Status</p>
              <div className={styles.statusContainer}>
              <div className={styles.circle} />
              <p className={styles.status}><b>Pending</b></p>
            </div>
          </div>
          <div className={styles.buttonsContainer}>
              <div className={styles.editButtonContainer}>
                  <p className={styles.editText}><b>Edit</b></p>
              </div>
              <div className={styles.deleteButtonContainer}>
                  <p className={styles.deleteText}>Delete</p>
              </div>
              <div className={styles.markButtonContainer}>
                  <p className={styles.markText}>Mark as Paid</p>
              </div>
          </div>
        </div>
          <div className={styles.mainInvoiceContainer}>
              <div className={styles.invoiceDetailsContainer}>
                    <div className={styles.topContainer}>
                        <div className={styles.leftSide}>
                            <h2 className={styles.id}>#<b>0001</b></h2>
                            <p className={styles.description}>Graphic Design</p>
                        </div>
                        <div className={styles.rightSide}>
                        <p className={styles.street}>Street Name</p>
                        <p className={styles.city}>City</p>
                        <p className={styles.postal}>Postal</p>
                        <p className={styles.country}>Country</p>
                        </div>
                    </div>
                    <div className={styles.lowerContainer}>
                        <div className={styles.leftSide}>
                            <div className={styles.invoiceDateContainer}>
                                <p>Invoice Date</p>
                                <h2>DATE</h2>
                            </div>
                            <div className={styles.paymentDateContainer}>
                                <p>Payment Date</p>
                                <h2>PAYMENT DATE</h2>
                            </div>
                        </div>
                        <div className={styles.middle}>
                            <p>Bill To</p>
                            <h2><b>Alex Grim</b></h2>
                            <p>Street</p>
                            <p>City</p>
                            <p>Postal</p>
                            <p>Country</p>
                        </div>
                        <div className={styles.rightSide}>
                            <p>Sent to</p>
                            <h2><b>alexgrim@mail.com</b></h2>
                        </div>
                    </div>
              </div>
              <div className={styles.itemListContainer}>
                    <div className={styles.headerContainer}>
                    </div>
                    <div className={styles.itemListContainer}>
                        <div className={styles.itemsHeader}>
                            <p className={styles.itemName}>Item Name</p>
                            <p className={styles.itemQuantity}>QTY.</p>
                            <p className={styles.itemPrice}>Price</p>
                            <p className={styles.itemTotal}>Total</p>
                        </div>
                        <div className={styles.itemListDataContainer}>
                        <p className={styles.itemNameData}>NAME DATA</p>
                        <p className={styles.itemQuantityData}>2</p>
                        <p className={styles.itemPriceData}>$199.99</p>
                        <p className={styles.itemTotalData}>$399.98</p>
                        </div>
                    </div>
                    <div className={styles.amountContainer}>
                        <p>Amount Due</p>
                        <h1>$556.00</h1>
                    </div>
              </div>
          </div>
      </div>
    </main>
    </div>
    )
}

export default InvoicePageId;