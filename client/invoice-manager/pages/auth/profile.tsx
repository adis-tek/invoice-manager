import { useState, useEffect, useRef, useCallback } from "react"
import type { NextPage } from 'next'
import Link from 'next/link'
import styles from '../../styles/Profile.module.scss'
import Sidebar from "../../components/sidebar/sidebar"

const Profile: NextPage = () => {

    return (
        <div className={styles.mainContainer}>
            <Sidebar />
            <div className={styles.main}>
            <div className={styles.profile}>
                <h1>Profile</h1>
                <div className={styles.line} />
                <div className={styles.formContainer}>
                <div className={styles.emailContainer}>
                    <label htmlFor="" className={styles.formLabel}>Email address</label>
                    <input type="email" placeholder="Enter your email" className={styles.formInput} />
                    </div>
                    <div className={styles.passwordContainer}>
                    <label htmlFor="" className={styles.formLabel}>Password</label>
                    <input type="password" placeholder="Enter your password" className={styles.formInput} />
                    </div>
                    <div className={styles.confirmPasswordContainer}>
                    <label htmlFor="" className={styles.formLabel}>Confirm Password</label>
                    <input type="password" placeholder="Confirm your password" className={styles.formInput} />
                    </div>
                    <div className={styles.uploadPhotoContainer}>
                    <label htmlFor="" className={styles.formLabel}>Change your profile photo</label>
                    <input type="file" className={styles.fileFormInput} />
                    </div>
                    <button type="submit" className={styles.submitButton}>
                        <p className={styles.buttonText}>Submit Changes</p>
                    </button>
                </div>
            </div>
            </div>
            </div>
    )

}

export default Profile;