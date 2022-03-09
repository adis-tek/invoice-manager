import { useState, useEffect, useRef, useCallback } from "react"
import type { NextPage } from 'next'
import Link from 'next/link'
import styles from '../../styles/SignIn.module.scss'
import Sidebar from "../../components/sidebar/sidebar"

const SignIn: NextPage = () => {

    return (
        <div className={styles.mainContainer}>
            <Sidebar />
            <div className={styles.main}>
            <div className={styles.signUp}>
            <h1>Welcome to Invoicer</h1>
            <h2>Sign in</h2>
                <div className={styles.formContainer}>
                    <div className={styles.emailContainer}>
                    <label htmlFor="" className={styles.formLabel}>Email address</label>
                    <input type="email" placeholder="Enter your email" className={styles.formInput} />
                    </div>
                    <div className={styles.passwordContainer}>
                    <label htmlFor="" className={styles.formLabel}>Password</label>
                    <input type="password" placeholder="Enter your password" className={styles.formInput} />
                    </div>
                    <button type="submit" className={styles.submitButton}>
                        <p className={styles.buttonText}>Sign In</p>
                        </button>
                </div>
                <div className={styles.signInContainer}>
                    <Link href="/auth/signup"><p>Or <u>Sign Up</u></p></Link>
                </div>
        </div>
        </div>
        </div>
    )
}

export default SignIn