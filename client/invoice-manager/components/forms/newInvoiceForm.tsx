import type { NextPage } from 'next'
import styles from "../../styles/invoiceForm.module.scss"

import Image from "next/image"

const newInvoiceForm: NextPage = () => {
    return (
        <div className={styles.invoiceFormContainer}>
            <h2 className={styles.title}>New Invoice</h2>
            <div className={styles.formContainer}>
                <div className={styles.formSection}>
                <h5 className={styles.formTitle}>Bill from</h5>
                    <div className={styles.inputContainer}>
                        <p className={styles.inputTitle}>Street Address</p>
                        <input type="street" className={styles.fullInput} />
                    </div>
                    <div className={styles.multiInputContainer}>
                        <div className={styles.inputContainer}>
                            <p className={styles.inputTitle}>City</p>
                            <input type="street" className={styles.thirdInput} />
                        </div>
                        <div className={styles.inputContainer}>
                            <p className={styles.inputTitle}>Postal Code</p>
                            <input type="street" className={styles.thirdInput} />
                        </div>
                        <div className={styles.inputContainer}>
                            <p className={styles.inputTitle}>Country</p>
                            <input type="street" className={styles.thirdInput} />
                        </div>
                    </div>
                </div>
                <div className={styles.formSection}>
                <h5 className={styles.formTitle}>Bill to</h5>
                    <div className={styles.inputContainer}>
                        <p className={styles.inputTitle}>Client&apos;s Name</p>
                        <input type="text" name="clientName" className={styles.fullInput} />
                    </div>
                    <div className={styles.inputContainer}>
                        <p className={styles.inputTitle}>Client&apos;s Email</p>
                        <input type="email" name="clientsEmail" className={styles.fullInput} />
                    </div>
                    <div className={styles.inputContainer}>
                        <p className={styles.inputTitle}>Street Address</p>
                        <input type="street" className={styles.fullInput} />
                    </div>
                    <div className={styles.multiInputContainer}>
                        <div className={styles.inputContainer}>
                            <p className={styles.inputTitle}>City</p>
                            <input type="street" className={styles.thirdInput} />
                        </div>
                        <div className={styles.inputContainer}>
                            <p className={styles.inputTitle}>Postal Code</p>
                            <input type="street" className={styles.thirdInput} />
                        </div>
                        <div className={styles.inputContainer}>
                            <p className={styles.inputTitle}>Country</p>
                            <input type="street" className={styles.thirdInput} />
                        </div>
                    </div>
                </div>
                <div className={styles.formSection}>
                    <div className={styles.multiInputContainer}>
                    <div className={styles.inputContainer}>
                        <p className={styles.inputTitle}>Invoice Date</p>
                        <input type="date" name="invoiceDate" className={styles.halfInput} />
                    </div>
                    <div className={styles.inputContainer}>
                        <p className={styles.inputTitle}>Payment Terms</p>
                        <select name="paymentTerms" id="paymentTerms" className={styles.halfInput}>
                            <option value="1">Next 1 Day</option>
                            <option value="7">Next 7 Day</option>
                            <option value="14">Next 14 Day</option>
                            <option value="30">Next 30 Day</option>
                        </select>
                    </div>
                    </div>
                    <div className={styles.inputContainer}>
                        <p className={styles.inputTitle}>Project Description</p>
                        <input type="text" name="projectDescription" className={styles.fullInput} />
                    </div>
                </div>
                <div className={styles.formSection}>
                <h5 className={styles.itemListTitle}>Item List</h5>
                <div className={styles.multiInputContainer}>
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
                        <div className={styles.imageHolder}>
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
                <button className={styles.addItemButton}><b>+Add New Item</b></button>
                <div className={styles.formSubmitContainer}>
                <button className={styles.addItemButton}>Cancel</button>
                <button className={styles.addItemButton}>Save Changes</button>
                </div>
                </div>
                </div>
            </div>
    )
}

export default newInvoiceForm

