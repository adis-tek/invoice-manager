import type { NextPage } from 'next'
import styles from "../../styles/sidebar.module.scss"

import Image from "next/image"
import Link from 'next/link'

const Sidebar: NextPage = () => {
    return (
        <div className={styles.sidebar}>
            <div className={styles.logoContainer}>
                <Image 
                src="/logo.png"
                alt="background-logo"
                width={103}
                height={103}
                className={styles.logo}
                    />
            </div>
            <div className={styles.filler}></div>
            <div className={styles.switchAndAccount}>
            <div className={styles.switch}>
                <div className={styles.ImageHolder}>
                    <Image 
                    src="/moon.png"
                    alt="moon-icon"
                    width={20}
                    height={20}
                    layout="fixed"
                    className={styles.image}
                    />
                </div>
                </div>
                <div className={styles.line}></div>
            
            <div className={styles.account}>
                <div className={styles.ImageHolder}>
                    <Image 
                    src="/profile-pic.png"
                    alt="moon-icon"
                    width={40}
                    height={40}
                    layout="fixed"
                    className={styles.image}
                    />
                </div>
            </div>
        </div>
        </div>
    )
}

export default Sidebar

