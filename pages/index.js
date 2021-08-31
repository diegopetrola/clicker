import Head from 'next/head';
import Header from '../components/header';
import Body from '../components/body';
import Layout from '../components/layout';
import { getCounter } from '../lib/crud';

export async function getServerSideProps() {
  return { props: { counter: await getCounter("user") } };
}

export default function Home({ counter }) {
  return (
    <div className="bg-white h-screen">
      <Head>
        <title>Clicker!</title>
        <link rel="icon" href="/click.svg" />
      </Head>

      <Layout>
        {/* Top Nav */}
        <Header />
        <Body />
      </Layout>
    </div>
  )
}
