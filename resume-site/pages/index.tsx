import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Generator from '../components/generator';
import Header from '../components/Header';
// import Logo from '../public/logo.png'
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {

  return (
    <div className={styles.container}>
      <Header />
      <Generator />
    </div>
  );
};

export default Home;
