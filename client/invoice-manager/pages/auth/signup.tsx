import { useState, useEffect, useRef, useCallback } from "react"
import { signup } from '../../actions/auth'
import type { NextPage } from 'next'
import Link from 'next/link'
import styles from '../../styles/SignUp.module.scss'
import Sidebar from "../../components/sidebar/sidebar"
import { useDispatch } from "react-redux"
import { useRouter } from 'next/router'
import * as api from '../api/hello'
import Router from 'next/router'

const initialState = { email: '', password: '', confirmPassword: '', profilePhoto: ''};

const SignUp: NextPage = () => {
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const router = useRouter();

    //Use this on the profile page for when users want to logout of the site

    async function checkuser () {
        try {
            const user = await api.getUser();
            if (user) {
                console.log("User is logged in.");
                Router.push("/");
            } else {
                console.log("User is not logged in.");
            }
        } catch (error) {
            console.log("Error");
        }
    }

    const logout = () => { 
        dispatch({ type: "LOGOUT" });

        // router.push('/auth/signin');

        setUser(null)
     }

     useEffect(() => {
        checkuser();
    })


    const handleSubmit = (e: any) => {
        e.preventDefault();

        dispatch(signup(formData));

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
            <h2>Create your account</h2>
                <div className={styles.formContainer}>
                    <div className={styles.emailContainer}>
                    <label htmlFor="" className={styles.formLabel}>Email address</label>
                    <input type="email" name="email" onChange={handleChange} placeholder="Enter your email" className={styles.formInput} />
                    </div>
                    <div className={styles.passwordContainer}>
                    <label htmlFor="" className={styles.formLabel}>Password</label>
                    <input type="password" name="password" onChange={handleChange} placeholder="Enter your password" className={styles.formInput} />
                    </div>
                    <div className={styles.confirmPasswordContainer}>
                    <label htmlFor="" className={styles.formLabel}>Confirm Password</label>
                    <input type="password" name="confirmPassword" onChange={handleChange} placeholder="Confirm your password" className={styles.formInput} />
                    </div>
                    <div className={styles.uploadPhotoContainer}>
                    <label htmlFor="" className={styles.formLabel}>Upload your profile photo</label>
                    <input type="file" name="profilePhoto" onChange={handleChange} className={styles.fileFormInput} />
                    </div>
                    <button type="submit" onClick={handleSubmit} className={styles.submitButton}>
                        <p className={styles.buttonText}>Sign Up</p>
                    </button>
                </div>
                <div className={styles.signUpContainer}>
                    <Link href="/auth/signin"><p style={{cursor: 'pointer'}}>Or <u>Sign In</u></p></Link>
                </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp