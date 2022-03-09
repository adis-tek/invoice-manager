import { useState, useEffect, useRef, useCallback } from "react"
import type { NextPage } from 'next'
import Link from 'next/link'
import styles from '../../styles/SignUp.module.scss'
import Sidebar from "../../components/sidebar/sidebar"

const SignUp: NextPage = () => {

    return (
        <div className={styles.main}>
            <Sidebar />
            <h1>Welcome to Invoicer</h1>
            <h2>Create your account</h2>
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
                    <button type="submit" className={styles.submitButton}>Sign Up</button>
                </div>
                <div className={styles.signInContainer}>
                    <p className={styles.text}>Or</p>
                    <Link href="/auth/signin"><p>Sign In</p></Link>
                </div>
        </div>
    )
}

export default SignUp