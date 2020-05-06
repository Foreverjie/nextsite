import Head from "next/head"

const IndexHeader = (props) => (
  <Head>
    <title>{props.title}</title>
    <link rel="icon" href="/favicon.ico" />
  </Head>
)

export default IndexHeader
