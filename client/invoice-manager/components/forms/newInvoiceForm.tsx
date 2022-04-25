import { useState, useEffect, useRef } from 'react'
import type { NextPage } from 'next'
import styles from "../../styles/invoiceForm.module.scss"
import { useDispatch } from 'react-redux'
import { createInvoice, updateInvoice } from "../../actions/invoices"
// import DatePicker from 'react-datepicker'
import commaNumber from 'comma-number'
import { format } from 'date-fns'
import { enUS } from '@mui/material/locale'
import TextField from '@mui/material/TextField'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { createTheme, createMuiTheme, ThemeProvider } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { makeStyles } from "@material-ui/core/styles"
import Select from 'react-select'

import Image from "next/image"

const NewInvoiceForm: NextPage = (props) => {
    const dispatch = useDispatch();
    const dateToday = format(new Date(), "MMM dd yyyy").toString();
    const [invoiceData, setInvoiceData] = useState(({
        billFromStreet: props.defaultBillFromStreet,
        billFromCity: props.defaultBillFromCity,
        billFromPostal: props.defaultBillFromPostal,
        billFromCountry: props.defaultBillFromCountry,
        clientName: props.defaultClientName,
        clientEmail: props.defaultClientEmail,
        billToStreet: props.defaultBillToStreet,
        billToCity: props.defaultBillToCity,
        billToPostal: props.defaultBillToPostal,
        billToCountry: props.defaultBillToCountry,
        invoiceDate: props.defaultInvoiceDate || dateToday,
        paymentTerms: props.defaultPaymentTerms,
        projectDescription: props.defaultProjectDescription,
        item_name_1: props.defaultItemName1,
        item_quantity_1: props.defaultItemQuantity1,
        item_price_1: parseFloat(props.defaultItemPrice1).toFixed(2),
        item_name_2: props.defaultItemName1,
        item_quantity_2: props.defaultItemQuantity2,
        item_price_2: parseFloat(props.defaultItemPrice2).toFixed(2),
        item_name_3: props.defaultItemName3,
        item_quantity_3: props.defaultItemQuantity3,
        item_price_3: parseFloat(props.defaultItemPrice3).toFixed(2),
        item_name_4: props.defaultItemName4,
        item_quantity_4: props.defaultItemQuantity4,
        item_price_4: parseFloat(props.defaultItemPrice4).toFixed(2),
        item_name_5: props.defaultItemName5,
        item_quantity_5: props.defaultItemQuantity5,
        item_price_5: parseFloat(props.defaultItemPrice5).toFixed(2),
    }));

    console.log("THIS IS INVOICE DATE", invoiceData.invoiceDate)

    const datePickerTheme = createMuiTheme({
        palette: {
            primary: {
                main: "#7C5DFA",
                light: "#DFE3FA"
            },
            grey: {
                A700: "#DFE3FA"
            },
        },
    });

    const useStyles = makeStyles({
        root: {
            "& .MuiDatePicker-root": {
                border: "1px solid #DFE3FA",
            }
        }
    })

    // console.log("PROPS", props.defaultItemPrice1.slice(1));
    // console.log("PROPS2", props.defaultItemQuantity1);
    // console.log("PROPS3", props.defaultItemPrice1.slice(1))

    //INVOICE ID
    const id = props.dynamicId;

    console.log("Quantity", invoiceData.item_quantity_1);
    console.log(typeof invoiceData.item_quantity_1);

    //ITEM COMPONENT STATE
    const [item1, setItem1] = useState<boolean>(true);
    const [item2, setItem2] = useState<boolean>(true);
    const [item3, setItem3] = useState<boolean>(false);
    const [item4, setItem4] = useState<boolean>(false);
    const [item5, setItem5] = useState<boolean>(false);

    const [quantity1, setQuantity1] = useState("");
    const [quantity2, setQuantity2] = useState("");
    const [quantity3, setQuantity3] = useState("");
    const [quantity4, setQuantity4] = useState("");
    const [quantity5, setQuantity5] = useState("");

    const [price1, setPrice1] = useState("");
    const [price2, setPrice2] = useState("");
    const [price3, setPrice3] = useState("");
    const [price4, setPrice4] = useState("");
    const [price5, setPrice5] = useState("");

    const [state, setState] = useState(props);

    const countRef = useRef<number>(0);

    //


    function addItem() {
        if (
            item1 === false
            && item2 === false
            && item3 === false
            && item4 === false
            && item5 === false
             ) {
            setItem1(true);
        }
        if (
            item1 === true
            && item2 === false
            && item3 === false
            && item4 === false
            && item5 === false
             ) {
            setItem2(true);
        }
        if (
            item1 === true
            && item2 === true
            && item3 === false
            && item4 === false
            && item5 === false
             ) {
            setItem3(true);
        }
        if (
            item1 === true
            && item2 === true
            && item3 === true
            && item4 === false
            && item5 === false
             ) {
            setItem4(true);
        }
        if (
            item1 === true
            && item2 === true
            && item3 === true
            && item4 === true
            && item5 === false
             ) {
            setItem5(true);
        }
    }

    function handleItemPrice(e: any) {
        return e.toFixed(2);


    }

    function removeItem(itemNumber: number) {
        if (itemNumber === 1) {
            setInvoiceData({...invoiceData, item_name_1: ""});
            setInvoiceData({...invoiceData, item_quantity_1: ""});
            setInvoiceData({...invoiceData, item_price_1: ""});
            setItem1(false);
        }
        if (itemNumber === 2) {
            setInvoiceData({...invoiceData, item_name_2: ""});
            setInvoiceData({...invoiceData, item_quantity_2: ""});
            setInvoiceData({...invoiceData, item_price_2: ""});
            setItem2(false);
        }
        if (itemNumber === 3) {
            setInvoiceData({...invoiceData, item_name_3: ""});
            setInvoiceData({...invoiceData, item_quantity_3: ""});
            setInvoiceData({...invoiceData, item_price_3: ""});
            setItem3(false);
        }
        if (itemNumber === 4) {
            setInvoiceData({...invoiceData, item_name_4: ""});
            setInvoiceData({...invoiceData, item_quantity_4: ""});
            setInvoiceData({...invoiceData, item_price_4: ""});
            setItem4(false);
        }
        if (itemNumber === 5) {
            setInvoiceData({...invoiceData, item_name_5: ""});
            setInvoiceData({...invoiceData, item_quantity_5: ""});
            setInvoiceData({...invoiceData, item_price_5: ""});
            setItem5(false);
        }
        
    }

    function checkTotal(total: number) {
        if (isNaN(total)) {
            return <p>0.00</p>;
        } else {
            return total;
        }
    }

    function checkQuantity() {
        if (quantity1.includes(".")) {
            let newString = quantity1.slice(0, -1);
            setQuantity1(newString);
        } else {
            setInvoiceData({...invoiceData, item_quantity_1: quantity1});
        }
    }

    useEffect(() => {
        checkQuantity();
    }, [quantity1])

    console.log(quantity1);
    console.log(invoiceData.item_quantity_1);

    console.log("TESTING",(Number(invoiceData.item_quantity_1) + 1))

    function checkProps(props){
        if (props === true) {
            setState(true);
        } else {
            setState(false);
        }
    }

    function toggleNewInvoiceForm() {
        setState(false);
    }


    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (id?.length > 0) {
            console.log("Edited invoice.");
            props?.changeInvoiceForm(false);
            dispatch(updateInvoice(invoiceData, id));
        } else {
            console.log(invoiceData);
            console.log("Created new invoice.");
            // props?.changeInvoiceForm(false);
            dispatch(createInvoice(invoiceData));
        }
        
    }

    const options = [
        { value: "1", label: "1 Day"},
        { value: "7", label: "7 Days"},
        { value: "14", label: "14 Days"},
        { value: "30", label: "30 Days"},
    ];

    const [selectLabel, setSelectLabel] = useState(
        invoiceData?.paymentTerms === "1" ? { value: "1", label: "1 Day"} :
        invoiceData?.paymentTerms === "7" ? { value: "7", label: "7 Day"} :
        invoiceData?.paymentTerms === "14" ? { value: "14", label: "14 Day"} :
        invoiceData?.paymentTerms === "30" ? { value: "30", label: "30 Day"} :
        { value: "1", label: "1 Day"}
        )

    function onSelectChange (e) {
        setInvoiceData({...invoiceData, paymentTerms: e.value});
        console.log(e.value);
        setSelectLabel(e);
    }

    function calcTotal (quantity: number, price: number) {
        const total = (quantity * (price * 100)) / 100;
        return total;
    }

    function checkItems () {
        invoiceData.item_name_1 ? setItem1(true) : setItem1(false);
        invoiceData.item_name_2 ? setItem2(true) : setItem2(false);
        invoiceData.item_name_3 ? setItem3(true) : setItem3(false);
        invoiceData.item_name_4 ? setItem4(true) : setItem4(false);
        invoiceData.item_name_5 ? setItem5(true) : setItem5(false);
    }

    useEffect(() => {
        checkItems();
    }, [])

    const classes = useStyles();

    return (
        <>
        <div className={styles.invoiceFormContainer}>
            {console.log(props.defaultClientName)}
            <h2 className={styles.title}>New Invoice</h2>
            <div className={styles.formContainer}>
                <div className={styles.formSection}>
                <h5 className={styles.formTitle}>Bill from</h5>
                    <div className={styles.inputContainer}>
                        <p className={styles.inputTitle}>Street Address</p>
                        <input 
                        type="street" 
                        name="billFromStreet" 
                        value={invoiceData.billFromStreet} 
                        onChange={(e) => setInvoiceData({...invoiceData, billFromStreet: e.target.value})} 
                        className={styles.fullInput} 
                        />
                    </div>
                    <div className={styles.multiInputContainer}>
                        <div className={styles.inputContainerCity}>
                            <p className={styles.inputTitle}>City</p>
                            <input 
                            type="street"
                            name="billFromCity" 
                            value={invoiceData.billFromCity} 
                            onChange={(e) => setInvoiceData({...invoiceData, billFromCity: e.target.value})} 
                             className={styles.thirdInput} 
                             />
                        </div>
                        <div className={styles.inputContainerPostal}>
                            <p className={styles.inputTitle}>Postal Code</p>
                            <input 
                            type="street" 
                            name="billFromPostal" 
                            value={invoiceData.billFromPostal} 
                            onChange={(e) => setInvoiceData({...invoiceData, billFromPostal: e.target.value})} 
                            className={styles.thirdInput} />
                        </div>
                        <div className={styles.inputContainerCountry}>
                            <p className={styles.inputTitle}>Country</p>
                            <input 
                            type="street" 
                            name="billFromCountry" 
                            value={invoiceData.billFromCountry} 
                            onChange={(e) => setInvoiceData({...invoiceData, billFromCountry: e.target.value})} 
                            className={styles.thirdInput} />
                        </div>
                    </div>
                </div>
                <div className={styles.formSection}>
                <h5 className={styles.formTitle}>Bill to</h5>
                    <div className={styles.inputContainer}>
                        <p className={styles.inputTitle}>Client&apos;s Name</p>
                        <input 
                        type="text" 
                        name="clientName"
                        value={invoiceData.clientName}
                        onChange={(e) => setInvoiceData({...invoiceData, clientName: e.target.value})} 
                        className={styles.fullInput} />
                    </div>
                    <div className={styles.inputContainer}>
                        <p className={styles.inputTitle}>Client&apos;s Email</p>
                        <input 
                        type="email" 
                        name="clientEmail" 
                        value={invoiceData.clientEmail} 
                        onChange={(e) => setInvoiceData({...invoiceData, clientEmail: e.target.value})} 
                        className={styles.fullInput} />
                    </div>
                    <div className={styles.inputContainer}>
                        <p className={styles.inputTitle}>Street Address</p>
                        <input 
                        type="street" 
                        name="billToStreet" 
                        value={invoiceData.billToStreet} 
                        onChange={(e) => setInvoiceData({...invoiceData, billToStreet: e.target.value})} 
                        className={styles.fullInput} />
                    </div>
                    <div className={styles.multiInputContainer}>
                        <div className={styles.inputContainerCity}>
                            <p className={styles.inputTitle}>City</p>
                            <input 
                            type="street" 
                            name="billToCity" 
                            value={invoiceData.billToCity} 
                            onChange={(e) => setInvoiceData({...invoiceData, billToCity: e.target.value})} 
                            className={styles.thirdInput} />
                        </div>
                        <div className={styles.inputContainerPostal}>
                            <p className={styles.inputTitle}>Postal Code</p>
                            <input 
                            type="street" 
                            name="billToPostal" 
                            value={invoiceData.billToPostal} 
                            onChange={(e) => setInvoiceData({...invoiceData, billToPostal: e.target.value})} 
                            className={styles.thirdInput} />
                        </div>
                        <div className={styles.inputContainerCountry}>
                            <p className={styles.inputTitle}>Country</p>
                            <input 
                            type="street" 
                            name="billToCountry" 
                            value={invoiceData.billToCountry} 
                            onChange={(e) => setInvoiceData({...invoiceData, billToCountry: e.target.value})} 
                            className={styles.thirdInput} />
                        </div>
                    </div>
                </div>
                <div className={styles.formSection}>
                    <div className={styles.multiInputContainer}>
                    <div className={styles.inputContainer}>
                    {/* DATEPICKER */}
                        <p className={styles.inputTitle}>Invoice Date</p>
                        {/* <input 
                        type="date"
                        name="invoiceDate" 
                        value={invoiceData.invoiceDate} 
                        onChange={(e) => setInvoiceData({...invoiceData, invoiceDate: e.target.value})} 
                        className={styles.halfInput} /> */}
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <ThemeProvider theme={datePickerTheme}>
                        <div className={styles.outlineBorder}>
                        <DatePicker
                            value={invoiceData.invoiceDate}
                            onChange={(date) => setInvoiceData({...invoiceData, invoiceDate: date})}
                            className={styles.halfInput}
                            renderInput={(params) => <TextField 
                                {...params} 
                                variant = "standard"
                                // classes={{
                                //     root: classes.root
                                // }}
                                InputProps={{
                                    disableUnderline: true
                                  }}
                                />
                            
                            }
                        />
                        </div>
                        </ThemeProvider>
                    </LocalizationProvider>
                    </div>
                    {/* REACT CALENDAR */}
                    
                    <div className={styles.inputContainer}>
                        <p className={styles.inputTitle}>Payment Terms</p>
                        {/* <select 
                        name="paymentTerms" 
                        value={invoiceData.paymentTerms} 
                        onChange={(e) => setInvoiceData({...invoiceData, paymentTerms: e.target.value})} 
                        id="paymentTerms" 
                        className={styles.halfInput}>
                            <option value="1">Next 1 Day</option>
                            <option value="7">Next 7 Day</option>
                            <option value="14">Next 14 Day</option>
                            <option value="30">Next 30 Day</option>
                        </select> */}
                        <Select
                        value={selectLabel}
                        options={options}
                        onChange={(e) => onSelectChange(e)}
                        theme={(theme) => ({
                            ...theme,
                            colors: {
                                ...theme.colors,
                                primary: '#7C5DFA',
                                primary25: '#DFE3FA',
                                primary50: '#DFE3FA',
                                primary75: '#DFE3FA',
                                neutral20: '#DFE3FA',
                                neutral80: '#0C0E16'
                            },
                            spacing: {
                                ...theme.spacing,
                                controlHeight: 48
                            }
                        })}
                        />
                        {console.log(invoiceData.paymentTerms)}
                    </div>
                    </div>
                    <div className={styles.inputContainer}>
                        <p className={styles.inputTitle}>Project Description</p>
                        <input 
                        type="text" 
                        name="projectDescription" 
                        value={invoiceData.projectDescription} 
                        onChange={(e) => setInvoiceData({...invoiceData, projectDescription: e.target.value})} 
                        className={styles.fullInput} />
                    </div>
                </div>
                <div className={styles.formSection}>
                <h5 className={styles.itemListTitle}>Item List</h5>
                {item1 &&
                <div id="item1" className={styles.multiInputContainer}>
                    <div className={styles.itemInputContainer}>
                        <p className={styles.inputTitle}>Item Name</p>
                        <input 
                        type="text" 
                        name="itemName" 
                        id="name"
                        value={invoiceData.item_name_1}
                        onChange={(e) => setInvoiceData({...invoiceData, item_name_1: e.target.value})} 
                        className={styles.itemInputName} />
                    </div>
                    <div className={styles.itemInputContainer}>
                        <p className={styles.inputTitle}>Qty.</p>
                        <input 
                        type="number" 
                        min="1"
                        step="1"
                        pattern="\d+"
                        name="quantity"
                        id="quantity"
                        value={invoiceData.item_quantity_1}
                        onChange={(e) => {
                        if (e.target.value.includes(".")) {
                            let splitInput = e.target.value.split("");
                            let fixedInput = splitInput.slice(0, -1);
                            let realInput = fixedInput.join("");
                                setInvoiceData({...invoiceData, item_quantity_1: realInput})
                                setQuantity3(realInput);
                        }
                        else {
                                setInvoiceData({...invoiceData, item_quantity_1: e.target.value});
                        }
                        }}
                        className={styles.itemInputQuantity} />
                    </div>
                    <div className={styles.itemInputContainer}>
                        <p className={styles.inputTitle}>Price</p>
                        <input 
                        type="number" 
                        name="price"
                        id="price"
                        value={invoiceData.item_price_1}
                        onChange={(e) => {
                            if (e.target.value.includes(".")) {
                                let theLength = e.target.value.length;
                                let theIndex = e.target.value.indexOf(".");
                                let difference = (theLength - theIndex)-1;
                                console.log(difference);
                                console.log("Hello", parseFloat(e.target.value).toFixed(2));
                                setInvoiceData({...invoiceData, item_price_1: parseFloat(e.target.value).toFixed(2)});
                                if (difference == 3) {
                                    let converted = parseFloat(e.target.value);
                                    let floor = Math.floor(converted * 100) / 100;
                                    let realInput = floor.toFixed(2);
                                    setInvoiceData({...invoiceData, item_price_3: realInput});
                                    setPrice1(realInput);
                                 } else {
                                    setInvoiceData({...invoiceData, item_price_1: e.target.value});
                                }
                        } else {
                            setInvoiceData({...invoiceData, item_price_1: e.target.value});
                        }
                        }}
                        className={styles.itemInputPrice} />
                    </div>
                    <div className={styles.itemInputContainer}>
                        <p className={styles.inputTitle}>Total</p>
                            <p className={styles.calcTotal}>{commaNumber(checkTotal(calcTotal(invoiceData.item_quantity_1, parseFloat(invoiceData.item_price_1)).toFixed(2)))}</p>
                        {console.log(Number(invoiceData.item_quantity_1))}
                        {console.log(invoiceData.item_price_1)}
                    </div>
                    <div className={styles.itemInputContainer}>
                        <p className={styles.inputTitle}>&nbsp;</p>
                        <div 
                        onClick={() => {removeItem(1)}}
                        className={styles.imageHolder}>
                            <Image
                                src="/trash-can.png"
                                alt="trash-can"
                                width={13}
                                height={16}
                                layout="fixed"
                            />
                        </div>
                    </div>
                </div>
                    }
                {item2 &&
                <div id="item2" className={styles.multiInputContainer}>
                    <div className={styles.itemInputContainer}>
                        <p className={styles.inputTitle}>Item Name</p>
                        <input 
                        type="text" 
                        name="itemName"
                        id="name"
                        value={invoiceData.item_name_2}
                        onChange={(e) => setInvoiceData({...invoiceData, item_name_2: e.target.value})} 
                        className={styles.itemInputName} />
                    </div>
                    <div className={styles.itemInputContainer}>
                        <p className={styles.inputTitle}>Qty.</p>
                        <input 
                        type="number" 
                        min="1"
                        step="1"
                        pattern="\d+"
                        name="quantity"
                        id="quantity"
                        value={invoiceData.item_quantity_2}
                        onChange={(e) => {
                        if (e.target.value.includes(".")) {
                            let splitInput = e.target.value.split("");
                            let fixedInput = splitInput.slice(0, -1);
                            let realInput = fixedInput.join("");
                                setInvoiceData({...invoiceData, item_quantity_2: realInput})
                                setQuantity3(realInput);
                        }
                        else {
                                setInvoiceData({...invoiceData, item_quantity_2: e.target.value});
                        }
                        }}
                        className={styles.itemInputQuantity} />
                    </div>
                    <div className={styles.itemInputContainer}>
                        <p className={styles.inputTitle}>Price</p>
                        <input 
                        type="number" 
                        name="price"
                        id="price"
                        value={invoiceData.item_price_2}
                        onChange={(e) => {
                            if (e.target.value.includes(".")) {
                                let theLength = e.target.value.length;
                                let theIndex = e.target.value.indexOf(".");
                                let difference = (theLength - theIndex)-1;
                                setInvoiceData({...invoiceData, item_price_2: parseFloat(e.target.value).toFixed(2)});
                                if (difference == 3) {
                                    let converted = parseFloat(e.target.value);
                                    let floor = Math.floor(converted * 100) / 100;
                                    let realInput = floor.toFixed(2);
                                    setInvoiceData({...invoiceData, item_price_3: realInput});
                                    setPrice2(realInput);
                                 } else {
                                    setInvoiceData({...invoiceData, item_price_2: e.target.value});
                                }
                        } else {
                            setInvoiceData({...invoiceData, item_price_2: e.target.value});
                        }
                        }}
                        className={styles.itemInputPrice} />
                    </div>
                    <div className={styles.itemInputContainer}>
                        <p className={styles.inputTitle}>Total</p>
                            <p className={styles.calcTotal}>{commaNumber(checkTotal(calcTotal(invoiceData.item_quantity_2, parseFloat(invoiceData.item_price_2)).toFixed(2)))}</p>
                    </div>
                    <div className={styles.itemInputContainer}>
                        <p className={styles.inputTitle}>&nbsp;</p>
                        <div 
                        onClick={() => {removeItem(2)}}
                        className={styles.imageHolder}>
                            <Image
                                src="/trash-can.png"
                                alt="trash-can"
                                width={13}
                                height={16}
                                layout="fixed"
                            />
                        </div>
                    </div>
                </div>
                    }
                {item3 &&
                <div id="item3" className={styles.multiInputContainer}>
                    <div className={styles.itemInputContainer}>
                        <p className={styles.inputTitle}>Item Name</p>
                        <input 
                        type="text" 
                        name="itemName" 
                        id="name"
                        value={invoiceData.item_name_3}
                        onChange={(e) => setInvoiceData({...invoiceData, item_name_3: e.target.value})} 
                        className={styles.itemInputName} />
                    </div>
                    <div className={styles.itemInputContainer}>
                        <p className={styles.inputTitle}>Qty.</p>
                        <input 
                        type="number" 
                        min="1"
                        step="1"
                        pattern="\d+"
                        name="quantity"
                        id="quantity"
                        value={invoiceData.item_quantity_3}
                        onChange={(e) => {
                        if (e.target.value.includes(".")) {
                            let splitInput = e.target.value.split("");
                            let fixedInput = splitInput.slice(0, -1);
                            let realInput = fixedInput.join("");
                                setInvoiceData({...invoiceData, item_quantity_3: realInput})
                                setQuantity3(realInput);
                        }
                        else {
                                setInvoiceData({...invoiceData, item_quantity_3: e.target.value});
                        }
                        }}
                        className={styles.itemInputQuantity} />
                    </div>
                    <div className={styles.itemInputContainer}>
                        <p className={styles.inputTitle}>Price</p>
                        <input 
                        type="number" 
                        name="price"
                        id="price"
                        value={invoiceData.item_price_3}
                        onChange={(e) => {
                            if (e.target.value.includes(".")) {
                                let theLength = e.target.value.length;
                                let theIndex = e.target.value.indexOf(".");
                                let difference = (theLength - theIndex)-1;
                                setInvoiceData({...invoiceData, item_price_3: parseFloat(e.target.value).toFixed(2)});
                                if (difference == 3) {
                                    let converted = parseFloat(e.target.value);
                                    let floor = Math.floor(converted * 100) / 100;
                                    let realInput = floor.toFixed(2);
                                    setInvoiceData({...invoiceData, item_price_3: realInput});
                                    setPrice3(realInput);
                                 } else {
                                    setInvoiceData({...invoiceData, item_price_3: e.target.value});
                                }
                        } else {
                            setInvoiceData({...invoiceData, item_price_3: e.target.value});
                        }
                        }}
                        className={styles.itemInputPrice} />
                    </div>
                    <div className={styles.itemInputContainer}>
                        <p className={styles.inputTitle}>Total</p>
                            <p className={styles.calcTotal}>{commaNumber(checkTotal(calcTotal(invoiceData.item_quantity_3, parseFloat(invoiceData.item_price_3)).toFixed(2)))}</p>
                    </div>
                    <div className={styles.itemInputContainer}>
                        <p className={styles.inputTitle}>&nbsp;</p>
                        <div 
                        onClick={() => {removeItem(3)}}
                        className={styles.imageHolder}>
                            <Image
                                src="/trash-can.png"
                                alt="trash-can"
                                width={13}
                                height={16}
                                layout="fixed"
                            />
                        </div>
                    </div>
                </div>
                    }
                {item4 &&
                <div id="item4" className={styles.multiInputContainer}>
                    <div className={styles.itemInputContainer}>
                        <p className={styles.inputTitle}>Item Name</p>
                        <input 
                        type="text" 
                        name="itemName" 
                        id="name"
                        value={invoiceData.item_name_4}
                        onChange={(e) => setInvoiceData({...invoiceData, item_name_4: e.target.value})} 
                        className={styles.itemInputName} />
                    </div>
                    <div className={styles.itemInputContainer}>
                        <p className={styles.inputTitle}>Qty.</p>
                        <input 
                        type="number" 
                        min="1"
                        step="1"
                        pattern="\d+"
                        name="quantity"
                        id="quantity"
                        value={invoiceData.item_quantity_4}
                        onChange={(e) => {
                        if (e.target.value.includes(".")) {
                            let splitInput = e.target.value.split("");
                            let fixedInput = splitInput.slice(0, -1);
                            let realInput = fixedInput.join("");
                                setInvoiceData({...invoiceData, item_quantity_4: realInput})
                                setQuantity4(realInput);
                        }
                        else {
                                setInvoiceData({...invoiceData, item_quantity_4: e.target.value});
                        }
                        }}
                        className={styles.itemInputQuantity} />
                    </div>
                    <div className={styles.itemInputContainer}>
                        <p className={styles.inputTitle}>Price</p>
                        <input 
                        type="number" 
                        name="price"
                        id="price"
                        value={invoiceData.item_price_4}
                        onChange={(e) => {
                            if (e.target.value.includes(".")) {
                                let theLength = e.target.value.length;
                                let theIndex = e.target.value.indexOf(".");
                                let difference = (theLength - theIndex)-1;
                                setInvoiceData({...invoiceData, item_price_4: parseFloat(e.target.value).toFixed(2)});
                                if (difference == 3) {
                                    let converted = parseFloat(e.target.value);
                                    let floor = Math.floor(converted * 100) / 100;
                                    let realInput = floor.toFixed(2);
                                    setInvoiceData({...invoiceData, item_price_3: realInput});
                                    setPrice4(realInput);
                                 } else {
                                    setInvoiceData({...invoiceData, item_price_4: e.target.value});
                                }
                        } else {
                            setInvoiceData({...invoiceData, item_price_4: e.target.value});
                        }
                        }}
                        className={styles.itemInputPrice} />
                    </div>
                    <div className={styles.itemInputContainer}>
                        <p className={styles.inputTitle}>Total</p>
                            <p className={styles.calcTotal}>{commaNumber(checkTotal(calcTotal(invoiceData.item_quantity_4, parseFloat(invoiceData.item_price_4)).toFixed(2)))}</p>
                    </div>
                    <div className={styles.itemInputContainer}>
                        <p className={styles.inputTitle}>&nbsp;</p>
                        <div 
                        onClick={() => {removeItem(4)}}
                        className={styles.imageHolder}>
                            <Image
                                src="/trash-can.png"
                                alt="trash-can"
                                width={13}
                                height={16}
                                layout="fixed"
                            />
                        </div>
                    </div>
                </div>
                    }
                {item5 &&
                <div id="item5" className={styles.multiInputContainer}>
                    <div className={styles.itemInputContainer}>
                        <p className={styles.inputTitle}>Item Name</p>
                        <input 
                        type="text" 
                        name="itemName"
                        id="name"
                        value={invoiceData.item_name_5}
                        onChange={(e) => setInvoiceData({...invoiceData, item_name_5: e.target.value})} 
                        className={styles.itemInputName} />
                    </div>
                    <div className={styles.itemInputContainer}>
                        <p className={styles.inputTitle}>Qty.</p>
                        <input 
                        type="number" 
                        min="1"
                        step="1"
                        pattern="\d+"
                        name="quantity"
                        id="quantity"
                        value={invoiceData.item_quantity_5}
                        onChange={(e) => {
                        if (e.target.value.includes(".")) {
                            let splitInput = e.target.value.split("");
                            let fixedInput = splitInput.slice(0, -1);
                            let realInput = fixedInput.join("");
                                setInvoiceData({...invoiceData, item_quantity_5: realInput})
                                setQuantity5(realInput);
                        }
                        else {
                                setInvoiceData({...invoiceData, item_quantity_5: e.target.value});
                        }
                        }}
                        className={styles.itemInputQuantity} />
                    </div>
                    <div className={styles.itemInputContainer}>
                        <p className={styles.inputTitle}>Price</p>
                        <input 
                        type="number" 
                        name="price"
                        id="price"
                        value={invoiceData.item_price_5}
                        onChange={(e) => {
                            if (e.target.value.includes(".")) {
                                let theLength = e.target.value.length;
                                let theIndex = e.target.value.indexOf(".");
                                let difference = (theLength - theIndex)-1;
                                setInvoiceData({...invoiceData, item_price_5: parseFloat(e.target.value).toFixed(2)});
                                if (difference == 3) {
                                    let converted = parseFloat(e.target.value);
                                    let floor = Math.floor(converted * 100) / 100;
                                    let realInput = floor.toFixed(2);
                                    setInvoiceData({...invoiceData, item_price_3: realInput});
                                    setPrice5(realInput);
                                 } else {
                                    setInvoiceData({...invoiceData, item_price_5: e.target.value});
                                }
                        } else {
                            setInvoiceData({...invoiceData, item_price_5: e.target.value});
                        }
                        }}
                        className={styles.itemInputPrice} />
                    </div>
                    <div className={styles.itemInputContainer}>
                        <p className={styles.inputTitle}>Total</p>
                            <p className={styles.calcTotal}>{commaNumber(checkTotal(calcTotal(invoiceData.item_quantity_5, parseFloat(invoiceData.item_price_5)).toFixed(2)))}</p>
                    </div>
                    <div className={styles.itemInputContainer}>
                        <p className={styles.inputTitle}>&nbsp;</p>
                        <div 
                        onClick={() => {removeItem(5)}}
                        className={styles.imageHolder}>
                            <Image
                                src="/trash-can.png"
                                alt="trash-can"
                                width={13}
                                height={16}
                                layout="fixed"
                            />
                        </div>
                    </div>
                </div>
                    }
                {item5 === false &&
                <button 
                onClick={addItem}
                className={styles.addItemButton}><b>+Add New Item</b></button>
                }
                <div className={styles.formSubmitContainer}>
                <button onClick={() => props?.changeInvoiceForm(false)} className={styles.addItemButton}>Cancel</button>
                <button
                onClick={handleSubmit}
                 className={styles.addItemButton}>Save Changes</button>
                </div>
                </div>
                </div>
            </div>
        </>
    )
}

export default NewInvoiceForm

