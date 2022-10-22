import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Generator from '../components/generator';
// import Logo from '../public/logo.png'
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {

  return (
    <div className={styles.container}>
      <Head>
        <title>AI Generated Resume Bios!</title>
        <meta name='description' content='Generate professional resume bios' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Generator />
    </div>
  );
};

export default Home;
