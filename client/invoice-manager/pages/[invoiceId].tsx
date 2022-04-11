import { useState, useEffect, useRef, useCallback } from "react"
import Head from 'next/head'
import Image from 'next/image'
import type { NextPage } from "next";
import { useRouter } from "next/router"
import { addDays, format, parse, parseISO } from 'date-fns'
import Link from 'next/link'
import styles from '../styles/InvoicePage.module.scss'

import Sidebar from "../components/sidebar/sidebar"
import NewInvoiceForm from "../components/forms/newInvoiceForm"

import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

import { getInvoices, deleteInvoice } from '../actions/invoices'


const InvoicePageId: NextPage = () => {
    const router = useRouter();
    const invoiceId = router.query.invoiceId;
    const targetInvoice = parseInt(invoiceId);
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
    const date = new Date();
    const invoiceDate = pageInvoice?.invoice_date.slice(0, 10);
    const paymentTerms = pageInvoice?.payment_terms;
    const invoiceDateYear = invoiceDate?.slice(0, 4);
    const invoiceDateMonth = invoiceDate?.slice(5, 7);
    const invoiceDateMonthFormatted = getMonth(invoiceDateMonth);
    const invoiceDateDay = invoiceDate?.slice(8, 11);
    const fullInvoiceDate = (invoiceDateMonthFormatted + ' ' + invoiceDateDay + ' ' + invoiceDateYear).toString();
    const fullInvoiceDateDisplayed = (invoiceDateDay + ' ' + invoiceDateMonthFormatted + ' ' + invoiceDateYear).toString();
    const processedInvoiceDate = new Date(fullInvoiceDate);
    const paymentDateProcessed = addDays(processedInvoiceDate, paymentTerms);
    console.log(processedInvoiceDate);
    const paymentDate = format(paymentDateProcessed, "dd MMM yyyy").toString();
    console.log(fullInvoiceDate);
    const [parsedDate, setParsedDate] = useState(date);
    // const paymentDate = invoices?.invoice_date + invoices?.payment_terms;
    console.log("CHECK", processedInvoiceDate);
    // console.log(processedInvoiceDate);
    // console.log(paymentDate);
    // console.log(paymentDate.toString());

    // const invoiceDateFormatted = format(invoiceDateRaw, 'mm/dd/yyyy');

    function getMonth (conversion: string) {
        switch(conversion) {
            case '01' :
                return 'Jan'
                break;
            case '02' :
                return 'Feb'
                break;
            case '03' :
                return 'Mar'
                break;
            case '04' :
                return 'Apr'
                break;
            case '05' :
                return 'May'
                break;
            case '06' :
                return 'Jun'
                break;
            case '07' :
                return 'Jul'
                break;
            case '08' :
                return 'Aug'
                break;
            case '09' :
                return 'Sep'
                break;
            case '10' :
                return 'Oct'
                break;
            case '11' :
                return 'Nov'
                break;
            case '12' :
                return 'Dec'
                break;
            default:
                return ''
        }
    }


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
            status: pageInvoice?.status,
            itemName1: pageInvoice?.item_name_1,
            itemQuantity1: pageInvoice?.item_quantity_1,
            itemPrice1: pageInvoice?.item_price_1,
            itemName2: pageInvoice?.item_name_2,
            itemQuantity2: pageInvoice?.item_quantity_2,
            itemPrice2: pageInvoice?.item_price_2,
            itemName3: pageInvoice?.item_name_3,
            itemQuantity3: pageInvoice?.item_quantity_3,
            itemPrice3: pageInvoice?.item_price_3,
            itemName4: pageInvoice?.item_name_4,
            itemQuantity4: pageInvoice?.item_quantity_4,
            itemPrice4: pageInvoice?.item_price_4,
            itemName5: pageInvoice?.item_name_5,
            itemQuantity5: pageInvoice?.item_quantity_5,
            itemPrice5: pageInvoice?.item_price_5,
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
    console.log("Quantity", pageInvoice?.quantity);

    function dispatchDeleteInvoice() {
        const id = invoiceId;

        dispatch(deleteInvoice(id));
    }

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
          defaultBillToStreet={invoiceData?.billToStreet}
          defaultBillToCity={invoiceData?.billToCity}
          defaultBillToPostal={invoiceData?.billToPostal}
          defaultBillToCountry={invoiceData?.billToCountry}
          defaultInvoiceDate={invoiceData?.invoiceDate}
          defaultPaymentTerms={invoiceData?.paymentTerms}
          defaultProjectDescription={invoiceData?.projectDescription}
          defaultItemName1={invoiceData?.itemName1}
          defaultItemQuantity1={invoiceData?.itemQuantity1}
          defaultItemPrice1={invoiceData?.itemPrice1}
          defaultItemName2={invoiceData?.itemName2}
          defaultItemQuantity2={invoiceData?.itemQuantity2}
          defaultItemPrice2={invoiceData?.itemPrice2}
          defaultItemName3={invoiceData?.itemName3}
          defaultItemQuantity3={invoiceData?.itemQuantity3}
          defaultItemPrice3={invoiceData?.itemPrice3}
          defaultItemName4={invoiceData?.itemName4}
          defaultItemQuantity4={invoiceData?.itemQuantity4}
          defaultItemPrice4={invoiceData?.itemPrice4}
          defaultItemName5={invoiceData?.itemName5}
          defaultItemQuantity5={invoiceData?.itemQuantity5}
          defaultItemPrice5={invoiceData?.itemPrice5}
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
              <div 
              onClick={dispatchDeleteInvoice}
              className={styles.deleteButtonContainer}>
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
                            <h2 className={styles.id}>#<b>000{targetInvoice + 1}</b></h2>
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
                                <h2>{fullInvoiceDateDisplayed}</h2>
                            </div>
                            <div className={styles.paymentDateContainer}>
                                <p>Payment Date</p>
                                <h2>{paymentDate}</h2>
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
                        {invoiceData?.itemPrice1 &&
                        <div className={styles.itemListDataContainer}>
                        <p className={styles.itemNameData}>{invoiceData.itemName1}</p>
                        <p className={styles.itemQuantityData}>{invoiceData.itemQuantity1}</p>
                        <p className={styles.itemPriceData}>{invoiceData.itemPrice1}</p>
                        <p className={styles.itemTotalData}>${((Number(invoiceData.itemPrice1.slice(1))) * (Number(invoiceData.itemQuantity1))).toFixed(2)}</p>
                        </div>
                        }
                        {invoiceData?.itemPrice2 &&
                        <div className={styles.itemListDataContainer}>
                        <p className={styles.itemNameData}>{invoiceData.itemName2}</p>
                        <p className={styles.itemQuantityData}>{invoiceData.itemQuantity2}</p>
                        <p className={styles.itemPriceData}>{invoiceData.itemPrice2}</p>
                        <p className={styles.itemTotalData}>${((Number(invoiceData.itemPrice2.slice(1))) * (Number(invoiceData.itemQuantity2))).toFixed(2)}</p>
                        </div>
                        }
                        {invoiceData?.itemPrice3 &&
                        <div className={styles.itemListDataContainer}>
                        <p className={styles.itemNameData}>{invoiceData.itemName3}</p>
                        <p className={styles.itemQuantityData}>{invoiceData.itemQuantity3}</p>
                        <p className={styles.itemPriceData}>{invoiceData.itemPrice3}</p>
                        <p className={styles.itemTotalData}>${((Number(invoiceData.itemPrice3.slice(1))) * (Number(invoiceData.itemQuantity3))).toFixed(2)}</p>
                        </div>
                        }
                        {invoiceData?.itemPrice4 &&
                        <div className={styles.itemListDataContainer}>
                        <p className={styles.itemNameData}>{invoiceData.itemName4}</p>
                        <p className={styles.itemQuantityData}>{invoiceData.itemQuantity4}</p>
                        <p className={styles.itemPriceData}>{invoiceData.itemPrice4}</p>
                        <p className={styles.itemTotalData}>${((Number(invoiceData.itemPrice4.slice(1))) * (Number(invoiceData.itemQuantity4))).toFixed(2)}</p>
                        </div>
                        }
                        {invoiceData?.itemPrice5 &&
                        <div className={styles.itemListDataContainer}>
                        <p className={styles.itemNameData}>{invoiceData.itemName5}</p>
                        <p className={styles.itemQuantityData}>{invoiceData.itemQuantity5}</p>
                        <p className={styles.itemPriceData}>{invoiceData.itemPrice5}</p>
                        <p className={styles.itemTotalData}>${((Number(invoiceData.itemPrice5.slice(1))) * (Number(invoiceData.itemQuantity5))).toFixed(2)}</p>
                        </div>
                        }
                    </div>
                    <div className={styles.amountContainer}>
                        <p>Amount Due</p>
                        <h1>$ {((invoiceData?.itemPrice1 ? (((Number(invoiceData?.itemPrice1.slice(1))) * (Number(invoiceData?.itemQuantity1)))) : 0)
                        + (invoiceData?.itemPrice2 ? (((Number(invoiceData?.itemPrice2.slice(1))) * (Number(invoiceData?.itemQuantity2)))) : 0)
                        + (invoiceData?.itemPrice3 ? (((Number(invoiceData?.itemPrice3.slice(1))) * (Number(invoiceData?.itemQuantity3)))) : 0)
                        + (invoiceData?.itemPrice4 ? (((Number(invoiceData?.itemPrice4.slice(1))) * (Number(invoiceData?.itemQuantity4)))) : 0)
                        + (invoiceData?.itemPrice5 ? (((Number(invoiceData?.itemPrice5.slice(1))) * (Number(invoiceData?.itemQuantity5)))) : 0)).toFixed(2)}</h1>
                    </div>
              </div>
          </div>
      </div>
    </main>
    </div>
    )
}

export default InvoicePageId;