import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import MainSlider from '../components/mainSlider'
import styles from '../styles/Home.module.css'
import useTranslation from 'next-translate/useTranslation'
import MainProducts from '../components/mainProducts'

const Home: NextPage = () => {
  const { t} = useTranslation('common')
  return (
    <div className={styles.container}>
      <Head>
        <title>{t('homepage_title')}</title>
        <meta name="description" content="{t('homepage_description')}" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainSlider/>
      <MainProducts />
    </div>
  )
}

export default Home
