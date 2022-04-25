import { useState, useEffect, useRef, useCallback } from "react"
import type { NextPage } from 'next'
import Link from 'next/link'
import styles from '../../styles/Profile.module.scss'
import Sidebar from "../../components/sidebar/sidebar"
import * as api from '../api/hello'
import Router from 'next/router'

const initialState = { email: '', password: '', confirmPassword: '', profilePhoto: ''};

const Profile: NextPage = () => {
    const [formData, setFormData] = useState(initialState);

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    async function checkuser () {
        try {
            const user = await api.getUser();
            if (user) {
                console.log("User is logged in.");
                return true;
            } else {
                console.log("User is not logged in.");
                Router.push("/auth/signin")
            }
        } catch (error) {
            console.log("Error");
        }
    }

    async function updateUser () {
        try {
            const updateUser = await api.updateUser(formData);
            if (updateUser) {
                console.log("User was updated.");
                return true;
            } else {
                console.log("User update failed.");
                return false;
            }
        } catch (error) {
            console.log("Error");
        }
    }

    useEffect(() => {
        checkuser();
    })

    console.log(formData)

    return (
        <div className={styles.mainContainer}>
            <Sidebar />
            <div className={styles.main}>
            <div className={styles.profile}>
                <h1>Change Profile</h1>
                <div className={styles.line} />
                <div className={styles.formContainer}>
                <div className={styles.emailContainer}>
                    <label htmlFor="" className={styles.formLabel}>Email address</label>
                    <input name ="email" type="email" placeholder="Enter your email" onChange={handleChange} className={styles.formInput} />
                    </div>
                    <div className={styles.passwordContainer}>
                    <label htmlFor="" className={styles.formLabel}>Password</label>
                    <input name="password" type="password" placeholder="Enter your password" onChange={handleChange} className={styles.formInput} />
                    </div>
                    <div className={styles.confirmPasswordContainer}>
                    <label htmlFor="" className={styles.formLabel}>Confirm Password</label>
                    <input name="confirmPassword" type="password" placeholder="Confirm your password" onChange={handleChange} className={styles.formInput} />
                    </div>
                    <div className={styles.uploadPhotoContainer}>
                    <label htmlFor="" className={styles.formLabel}>Change your profile photo</label>
                    <input name="profilePhoto" type="file" onChange={handleChange} className={styles.fileFormInput} />
                    </div>
                    <button type="submit" className={styles.submitButton}>
                        <p className={styles.buttonText} onClick={updateUser}>Submit Changes</p>
                    </button>
                </div>
            </div>
            </div>
            </div>
    )

}

export default Profile;