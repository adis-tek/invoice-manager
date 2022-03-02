import { useState, useEffect, useRef, useCallback } from "react"
import Head from 'next/head'
import Image from 'next/image'
import type { NextPage } from "next";
import { useRouter } from "next/router"
import Link from 'next/link'
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
    const pageInvoice = invoices[targetInvoice];
    const [invoiceForm, setInvoiceForm] = useState(false);
    const countRef = useRef<number>(0);
    const [invoiceData, setInvoiceData] = useState(({
        billFromStreet:"",
        billFromCity: "",
        billFromPostal: "",
        billFromCountry: "",
        clientName: "",
        clientEmail: "",
        billToStreet:"",
        billToCity: "",
        billToPostal: "",
        billToCountry: "",
        invoiceDate: "",
        paymentTerms: "",
        projectDescription: "",
        itemName1: "",
        itemQuantity1: "",
        itemPrice1: "",
        itemName2: "",
        itemQuantity2: "",
        itemPrice2: "",
        itemName3: "",
        itemQuantity3: "",
        itemPrice3: "",
        itemName4: "",
        itemQuantity4: "",
        itemPrice4: "",
        itemName5: "",
        itemQuantity5: "",
        itemPrice5: "",
        status: "",
    }));

    const loadData = useCallback(async () => {
        await dispatch(getInvoices());
        console.log("Loading invoices.")
      }, [dispatch]);

    const handleLoadedData = useCallback(async () => {
        await setInvoiceData({...invoiceData, 
            clientName: pageInvoice?.clients_name,
            clientEmail: pageInvoice?.clients_email,
            billToStreet: pageInvoice?.street_address,
            billToCity: pageInvoice?.city,
            billToPostal: pageInvoice?.postal_code,
            billToCountry: pageInvoice?.country,
            invoiceDate: pageInvoice?.invoice_date,
            paymentTerms: pageInvoice?.payment_terms,
            projectDescription: pageInvoice?.project_description,
            itemName1: pageInvoice?.item_name,
            itemQuantity1: pageInvoice?.quantity,
            itemPrice1: pageInvoice?.price,
            status: pageInvoice?.status
            // itemName2: pageInvoice.item_name[1],
            // itemQuantity2: pageInvoice.item_quantity[1],
            // itemPrice2: pageInvoice.item_price[1],
            // itemName3: pageInvoice.item_name[2],
            // itemQuantity3: pageInvoice.item_quantity[2],
            // itemPrice3: pageInvoice.item_price[2],
            // itemName4: pageInvoice.item_name[3],
            // itemQuantity4: pageInvoice.item_quantity[3],
            // itemPrice4: pageInvoice.item_price[3],
            // itemName5: pageInvoice.item_name[4],
            // itemQuantity5: pageInvoice.item_quantity[4],
            // itemPrice5: pageInvoice.item_price[4],
        });
    }, [setInvoiceData]);

    function toggleNewInvoiceForm() {
        setInvoiceForm(!invoiceForm);
    }

    useEffect(() => {
        loadData();
        handleLoadedData();
    }, []);

    console.log(invoices[targetInvoice]);
    console.log(pageInvoice);
    console.log(invoices[0]?.clients_name);
    console.log(invoiceId);

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
          <NewInvoiceForm 
          changeInvoiceForm={invoiceForm => setInvoiceForm(invoiceForm)}
          dynamicId={invoiceId}
          defaultClientName={invoiceData?.clientName}
          defaultClientEmail={invoiceData?.clientEmail}
          />
        </div>
      </>
      }
      <div className={styles.pageContainer}>
      <Link href={"/"}>
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
      </Link>
      <div className={styles.mainHeaderContainer}>
          <div className={styles.statusContainer}>
              <p className={styles.statusText}>Status</p>
              <div className={styles.statusContainer}>
              <div className={styles.circle} />
              <p className={styles.status}><b>{invoiceData.status}</b></p>
            </div>
          </div>
          <div className={styles.buttonsContainer}>
              <div onClick={toggleNewInvoiceForm} className={styles.editButtonContainer}>
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
                            <h2 className={styles.id}>#<b>{invoiceId}</b></h2>
                            <p className={styles.description}>{invoiceData.projectDescription}</p>
                        </div>
                        <div className={styles.rightSide}>
                        <p className={styles.street}>{invoiceData.billToStreet}</p>
                        <p className={styles.city}>{invoiceData.billToCity}</p>
                        <p className={styles.postal}>{invoiceData.billToCity}</p>
                        <p className={styles.country}>{invoiceData.billToCountry}</p>
                        </div>
                    </div>
                    <div className={styles.lowerContainer}>
                        <div className={styles.leftSide}>
                            <div className={styles.invoiceDateContainer}>
                                <p>Invoice Date</p>
                                <h2>{invoiceData.invoiceDate}</h2>
                            </div>
                            <div className={styles.paymentDateContainer}>
                                <p>Payment Date</p>
                                <h2>{invoiceData.invoiceDate} + Payment Terms</h2>
                            </div>
                        </div>
                        <div className={styles.middle}>
                            <p>Bill To</p>
                            <h2><b>{invoiceData.clientName}</b></h2>
                            <p>{invoiceData.billToStreet}</p>
                            <p>{invoiceData.billToCity}</p>
                            <p>{invoiceData.billToPostal}</p>
                            <p>{invoiceData.billToCountry}</p>
                        </div>
                        <div className={styles.rightSide}>
                            <p>Sent to</p>
                            <h2><b>{invoiceData.clientEmail}</b></h2>
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
                        <p className={styles.itemNameData}>{invoiceData.itemName1}</p>
                        <p className={styles.itemQuantityData}>{invoiceData.itemQuantity1}</p>
                        <p className={styles.itemPriceData}>$ {invoiceData.itemPrice1}</p>
                        <p className={styles.itemTotalData}>$ TOTAL</p>
                        </div>
                    </div>
                    <div className={styles.amountContainer}>
                        <p>Amount Due</p>
                        <h1>$ TOTAL</h1>
                    </div>
              </div>
          </div>
      </div>
    </main>
    </div>
    )
}

export default InvoicePageId;