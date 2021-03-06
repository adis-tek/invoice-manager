import { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import * as api from '../../pages/api/hello'
import styles from "../../styles/sidebar.module.scss"

import Image from "next/image"
import Link from 'next/link'

const Sidebar: NextPage = () => {
    const [user, setUser] = useState(null);
    const [profilePhoto, setProfilePhoto] = useState(false);

    // This useEffect should be in the sidebar chacking on the user on every page
    useEffect(() => {
    const token = user?.token

    //JWT

    setUser(JSON.parse(localStorage.getItem('profile')))
    }, [])

    async function checkUser () {
        try {
            const user = await api.getUser();
            if (user === true) {
                console.log("User found");
                setProfilePhoto(true);
                return;
            } else {
                console.log("No user found");
                setProfilePhoto(false);
            }
        } catch (error) {
            console.log(error);
        }
    }
 
    console.log(checkUser());

    return (
        <div className={styles.sidebar}>
            <Link href={"/"}>
            <div className={styles.logoContainer} style={{cursor: 'pointer'}}>
                <Image 
                src="/logo.png"
                alt="background-logo"
                width={103}
                height={103}
                layout="intrinsic"
                className={styles.logo}
                    />
            </div>
            </Link>
            <div className={styles.filler}></div>
            <div className={styles.switchAndAccount}>
            <div className={styles.switch}>
                <div className={styles.ImageHolder}>
                    {/* <Image 
                    src="/moon.png"
                    alt="moon-icon"
                    width={20}
                    height={20}
                    layout="fixed"
                    className={styles.image}
                    /> */}
                </div>
                </div>
                <div className={styles.line}></div>
            
            <div className={styles.account}>
                <Link href={"/auth/profile"}>
                <div className={styles.ImageHolder}>
                    {profilePhoto === true &&
                        <Image 
                        src="/profile-pic.png"
                        alt="profile-pic"
                        width={40}
                        height={40}
                        layout="fixed"
                        className={styles.image}
                        />
                    }
                    {profilePhoto !== true &&
                        <Image 
                        src="/anon-profile.png"
                        alt="profile-pic-anon"
                        width={40}
                        height={40}
                        layout="fixed"
                        className={styles.image}
                        />
                    }
                </div>
                </Link>
            </div>
        </div>
        </div>
    )
}

export default Sidebar

