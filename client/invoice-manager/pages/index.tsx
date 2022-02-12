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
      <div className={styles.header}>
        <div className={styles.invoiceHeaderContainer}>
          <h2>Invoices</h2>
          <p>No invoices</p>
        </div>
        <div className={styles.rightEnd}>
          <div className={styles.filterByStatusButton}>
          <h3>Filter by status</h3>
          <div className={styles.imageHolder}>
            <Image
              src="/down-arrow.png"
              alt="down-arrow"
              width={9}
              height={5}
                />
          </div>
          </div>
          <div className={styles.newInvoiceButton}>
            <Image
              src="/plus.png"
              alt="plus"
              width={32}
              height={32}
                />
              <h3>New Invoice</h3>
          </div>
        </div>
      </div>
      <div className={styles.noInvoicesContainer}>
      <Image 
        src="/no-invoices.png"
        alt="no-invoices"
        width={241}
        height={200}
          />
        <h2>There is nothing here</h2>
        <p>Create an invoice by clicking the
        <b> New Invoice </b>button and get started</p>
      </div>
      </main>
    </div>
  )
}

export default Home
