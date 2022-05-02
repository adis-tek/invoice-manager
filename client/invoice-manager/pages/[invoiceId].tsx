import { useState, useEffect, useRef, useCallback } from "react"
import Head from 'next/head'
import Image from 'next/image'
import type { NextPage } from "next";
import { useRouter } from "next/router"
import { addDays, format, parse, parseISO } from 'date-fns'
import commaNumber from 'comma-number'
import Link from 'next/link'
import styles from '../styles/InvoicePage.module.scss'

import Sidebar from "../components/sidebar/sidebar"
import NewInvoiceForm from "../components/forms/newInvoiceForm"

import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

import { getInvoices, updateInvoice, deleteInvoice } from '../actions/invoices'


const InvoicePageId: NextPage = () => {
    const router = useRouter();
    const invoiceId = router.query.invoiceId;
    const targetInvoice = parseInt(invoiceId);
    const dispatch = useDispatch();
    const invoices = useSelector((state: any) => state.invoices.invoices);
    const loading = useSelector((state: any) => state.invoices.loading);
    const pageInvoice = invoices[targetInvoice];
    const [invoiceForm, setInvoiceForm] = useState(false);
    const countRef = useRef<number>(0);
    const [invoiceData, setInvoiceData] = useState(({
        invoiceId: "",
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
        const paymentDate = format(paymentDateProcessed, "dd MMM yyyy").toString();


    // const paymentDate = invoices?.invoice_date + invoices?.payment_terms;
    // const invoiceDateFormatted = format(invoiceDateRaw, 'mm/dd/yyyy');

    console.log(paymentDateProcessed);


    function checkTotal(value: number) {
        if (isNaN(value)) {
            return 0.00;
        } else {
            return value;
        }
    }

    function checkQuantity(value: number | string) {
        if (value == null) {
            return 0;
        } else {
            return value;
        }
    }

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

    function markAsPaid () {
        setInvoiceData({...invoiceData, status: "paid"});
        dispatch(updateInvoice({...invoiceData, status: "paid"}, targetInvoice));
    }


    const loadData = useCallback(async () => {
        await dispatch(getInvoices());
      }, [dispatch]);

    const handleLoadedData = useCallback(async () => {
        await setInvoiceData({...invoiceData, 
            invoiceId: pageInvoice?.invoice_id,
            clientName: pageInvoice?.client_name,
            clientEmail: pageInvoice?.client_email,
            billToStreet: pageInvoice?.client_street_address,
            billToCity: pageInvoice?.client_city,
            billToPostal: pageInvoice?.client_postal_code,
            billToCountry: pageInvoice?.client_country,
            invoiceDate: pageInvoice?.invoice_date,
            paymentTerms: pageInvoice?.payment_terms,
            projectDescription: pageInvoice?.project_description,
            billFromStreet: pageInvoice?.street_address,
            billFromCity: pageInvoice?.city,
            billFromPostal: pageInvoice?.postal_code,
            billFromCountry: pageInvoice?.country,
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
            status: pageInvoice?.status,
        });
    }, [setInvoiceData]);

    function toggleNewInvoiceForm() {
        setInvoiceForm(!invoiceForm);
    }

    useEffect(() => {
        loadData();
        handleLoadedData();
    }, []);

    function dispatchDeleteInvoice() {
        const id = invoiceData?.invoiceId;

        dispatch(deleteInvoice(id));

        router.push("/");
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
          defaultId={invoiceData?.invoiceId}
          defaultClientName={invoiceData?.clientName}
          defaultClientEmail={invoiceData?.clientEmail}
          defaultBillFromStreet={invoiceData?.billFromStreet}
          defaultBillFromCity={invoiceData?.billFromCity}
          defaultBillFromPostal={invoiceData?.billFromPostal}
          defaultBillFromCountry={invoiceData?.billFromCountry}
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
          defaultStatus={invoiceData?.status}
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
              {invoiceData.status === "pending" &&
                <div className={styles.pendingStatusContainer}>
                <div className={styles.pendingCircle} />
                <p className={styles.pendingStatus}>{invoiceData.status}</p>
                </div>
            }
            {invoiceData.status === "paid" &&
                <div className={styles.paidStatusContainer}>
                <div className={styles.paidCircle} />
                <p className={styles.paidStatus}>{invoiceData.status}</p>
                </div>
            }
            {invoiceData.status === "draft" &&
                <div className={styles.draftStatusContainer}>
                <div className={styles.draftCircle} />
                <p className={styles.draftStatus}>{invoiceData.status}</p>
                </div>
            }
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
              <div onClick={markAsPaid} className={styles.markButtonContainer}>
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
                        <p className={styles.itemQuantityData}>{commaNumber(checkQuantity(invoiceData.itemQuantity1))}</p>
                        <p className={styles.itemPriceData}>${commaNumber(checkTotal(Number((invoiceData.itemPrice1))).toFixed(2))}</p>
                        <p className={styles.itemTotalData}>${commaNumber(checkTotal(((Number(invoiceData.itemPrice1)) * (Number(invoiceData.itemQuantity1)))).toFixed(2))}</p>
                        </div>
                        }
                        {invoiceData?.itemPrice2 &&
                        <div className={styles.itemListDataContainer}>
                        <p className={styles.itemNameData}>{invoiceData.itemName2}</p>
                        <p className={styles.itemQuantityData}>{commaNumber(checkQuantity(invoiceData.itemQuantity2))}</p>
                        <p className={styles.itemPriceData}>${commaNumber(checkTotal(Number((invoiceData.itemPrice2))).toFixed(2))}</p>
                        <p className={styles.itemTotalData}>${commaNumber(checkTotal(((Number(invoiceData.itemPrice2)) * (Number(invoiceData.itemQuantity2)))).toFixed(2))}</p>
                        </div>
                        
                        }
                        {invoiceData?.itemPrice3 &&
                        <div className={styles.itemListDataContainer}>
                        <p className={styles.itemNameData}>{invoiceData.itemName3}</p>
                        <p className={styles.itemQuantityData}>{commaNumber(checkQuantity(invoiceData.itemQuantity3))}</p>
                        <p className={styles.itemPriceData}>${commaNumber(checkTotal(Number((invoiceData.itemPrice3))).toFixed(2))}</p>
                        <p className={styles.itemTotalData}>${commaNumber(checkTotal(((Number(invoiceData.itemPrice3)) * (Number(invoiceData.itemQuantity3)))).toFixed(2))}</p>
                        </div>
                        }
                        {invoiceData?.itemPrice4 &&
                        <div className={styles.itemListDataContainer}>
                        <p className={styles.itemNameData}>{invoiceData.itemName4}</p>
                        <p className={styles.itemQuantityData}>{commaNumber(checkQuantity(invoiceData.itemQuantity4))}</p>
                        <p className={styles.itemPriceData}>${commaNumber(checkTotal(Number((invoiceData.itemPrice4))).toFixed(2))}</p>
                        <p className={styles.itemTotalData}>${commaNumber(checkTotal(((Number(invoiceData.itemPrice4)) * (Number(invoiceData.itemQuantity4)))).toFixed(2))}</p>
                        </div>
                        }
                        {invoiceData?.itemPrice5 &&
                        <div className={styles.itemListDataContainer}>
                        <p className={styles.itemNameData}>{invoiceData.itemName5}</p>
                        <p className={styles.itemQuantityData}>{commaNumber(checkQuantity(invoiceData.itemQuantity5))}</p>
                        <p className={styles.itemPriceData}>${commaNumber(checkTotal(Number((invoiceData.itemPrice5))).toFixed(2))}</p>
                        <p className={styles.itemTotalData}>${commaNumber(checkTotal(((Number(invoiceData.itemPrice5)) * (Number(invoiceData.itemQuantity5)))).toFixed(2))}</p>
                        </div>
                        }
                    </div>
                    <div className={styles.amountContainer}>
                        <p>Amount Due</p>
                        <h1>$ {commaNumber(checkTotal(((invoiceData?.itemPrice1 ? (((Number(invoiceData?.itemPrice1)) * (Number(invoiceData?.itemQuantity1)))) : 0)
                        + (invoiceData?.itemPrice2 ? (((Number(invoiceData?.itemPrice2)) * (Number(invoiceData?.itemQuantity2)))) : 0)
                        + (invoiceData?.itemPrice3 ? (((Number(invoiceData?.itemPrice3)) * (Number(invoiceData?.itemQuantity3)))) : 0)
                        + (invoiceData?.itemPrice4 ? (((Number(invoiceData?.itemPrice4)) * (Number(invoiceData?.itemQuantity4)))) : 0)
                        + (invoiceData?.itemPrice5 ? (((Number(invoiceData?.itemPrice5)) * (Number(invoiceData?.itemQuantity5)))) : 0))).toFixed(2))}</h1>
                    </div>
              </div>
          </div>
      </div>
    </main>
    </div>
    )
}

export default InvoicePageId;

