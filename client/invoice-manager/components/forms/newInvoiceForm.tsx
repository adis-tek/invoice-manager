import { useState } from 'react'
import type { NextPage } from 'next'
import styles from "../../styles/invoiceForm.module.scss"

import Image from "next/image"

const NewInvoiceForm: NextPage = () => {
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
    }));
    const [itemCounter, setItemCounter] = useState<number>(0);
    const [itemList2, setItemList2] = useState<string[]>([]);
    let items: string[] = ["1", "2", "3", "4", "5"];
    let itemList: string[] = [];

    const addItem = () => {
        if (itemCounter < 6) {
        setItemList2([...itemList2, items[itemCounter]]);
        setItemCounter(itemCounter + 1);
        console.log(items);
        console.log(itemList);
        console.log(itemList2);
        } else {
            return;
        }
    }

    const removeItem = (itemList2: string[]) => {
        if (itemCounter < 6 || itemCounter >= 0){
            const itemArray = [...itemList2];
            itemArray.pop();
            setItemList2(itemArray);
            setItemCounter(itemCounter - 1);
            console.log(itemList2);
        } else {
            return;
        }
    }

    const handleSubmit = () => {
        console.log(invoiceData);
    }

    return (
        <div className={styles.invoiceFormContainer}>
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
                        <div className={styles.inputContainer}>
                            <p className={styles.inputTitle}>City</p>
                            <input 
                            type="street"
                            name="billFromCity" 
                            value={invoiceData.billFromCity} 
                            onChange={(e) => setInvoiceData({...invoiceData, billFromCity: e.target.value})} 
                             className={styles.thirdInput} 
                             />
                        </div>
                        <div className={styles.inputContainer}>
                            <p className={styles.inputTitle}>Postal Code</p>
                            <input 
                            type="street" 
                            name="billFromPostal" 
                            value={invoiceData.billFromPostal} 
                            onChange={(e) => setInvoiceData({...invoiceData, billFromPostal: e.target.value})} 
                            className={styles.thirdInput} />
                        </div>
                        <div className={styles.inputContainer}>
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
                        <div className={styles.inputContainer}>
                            <p className={styles.inputTitle}>City</p>
                            <input 
                            type="street" 
                            name="billToCity" 
                            value={invoiceData.billToCity} 
                            onChange={(e) => setInvoiceData({...invoiceData, billToCity: e.target.value})} 
                            className={styles.thirdInput} />
                        </div>
                        <div className={styles.inputContainer}>
                            <p className={styles.inputTitle}>Postal Code</p>
                            <input 
                            type="street" 
                            name="billToPostal" 
                            value={invoiceData.billToPostal} 
                            onChange={(e) => setInvoiceData({...invoiceData, billToPostal: e.target.value})} 
                            className={styles.thirdInput} />
                        </div>
                        <div className={styles.inputContainer}>
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
                        <p className={styles.inputTitle}>Invoice Date</p>
                        <input 
                        type="date" 
                        name="invoiceDate" 
                        value={invoiceData.invoiceDate} 
                        onChange={(e) => setInvoiceData({...invoiceData, invoiceDate: e.target.value})} 
                        className={styles.halfInput} />
                    </div>
                    <div className={styles.inputContainer}>
                        <p className={styles.inputTitle}>Payment Terms</p>
                        <select 
                        name="paymentTerms" 
                        value={invoiceData.paymentTerms} 
                        onChange={(e) => setInvoiceData({...invoiceData, paymentTerms: e.target.value})} 
                        id="paymentTerms" 
                        className={styles.halfInput}>
                            <option value="1">Next 1 Day</option>
                            <option value="7">Next 7 Day</option>
                            <option value="14">Next 14 Day</option>
                            <option value="30">Next 30 Day</option>
                        </select>
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
                {itemList2.map((item, index) => {
                return <div key={index} className={styles.multiInputContainer}>
                    <div className={styles.itemInputContainer}>
                        <p className={styles.inputTitle}>Item Name</p>
                        <input type="text" name="itemName" className={styles.itemInput} />
                    </div>
                    <div className={styles.itemInputContainer}>
                        <p className={styles.inputTitle}>Qty.</p>
                        <input type="number" name="quantity" className={styles.itemInput} />
                    </div>
                    <div className={styles.itemInputContainer}>
                        <p className={styles.inputTitle}>Price</p>
                        <input type="number" name="price" className={styles.itemInput} />
                    </div>
                    <div className={styles.totalContainer}>
                        <p className={styles.totalTitle}>Total</p>
                        <p>$156.00</p>
                    </div>
                    <div className={styles.itemInputContainer}>
                        <p className={styles.inputTitle}>&nbsp;</p>
                        <div 
                        onClick={() => {removeItem(itemList2)}}
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
                                })}
                {itemList2.length < 6 &&
                <button 
                onClick={addItem}
                className={styles.addItemButton}><b>+Add New Item</b></button>
                }
                <div className={styles.formSubmitContainer}>
                <button className={styles.addItemButton}>Cancel</button>
                <button
                onClick={handleSubmit}
                 className={styles.addItemButton}>Save Changes</button>
                </div>
                </div>
                </div>
            </div>
    )
}

export default NewInvoiceForm

