import { useState, useEffect, useRef, useCallback } from "react"
import { signin } from '../../actions/auth'
import type { NextPage } from 'next'
import Link from 'next/link'
import styles from '../../styles/SignIn.module.scss'
import Sidebar from "../../components/sidebar/sidebar"
import { useDispatch } from "react-redux"
import { useRouter } from "next/router"

const initialState = { email: '', password: '' };

const SignIn: NextPage = () => {
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch;
    const router = useRouter();

    const handleSubmit = (e: any) => {
        e.preventDefault();

        dispatch(signin(formData));

        // router.push('/');
    }

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }


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
                    <input type="email" name="email" onChange={handleChange} placeholder="Enter your email" className={styles.formInput} />
                    </div>
                    <div className={styles.passwordContainer}>
                    <label htmlFor="" className={styles.formLabel}>Password</label>
                    <input type="password" name="password" onChange={handleChange} placeholder="Enter your password" className={styles.formInput} />
                    </div>
                    <button type="submit" onClick={handleSubmit} className={styles.submitButton}>
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