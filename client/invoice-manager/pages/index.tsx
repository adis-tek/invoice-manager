import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'

import Sidebar from "../components/sidebar/sidebar"

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Invoice Manager</title>
        <meta name="description" content="Manage your invoices" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Sidebar />
      <main className={styles.main}>
      <Image 
        src="/no-invoices.png"
        alt="no-invoices"
        width={241}
        height={200}
          />
      </main>
    </div>
  )
}

export default Home
