import Head from 'next/head'

const Home = () => (
  <div className="container">
    <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <nav>
      <div className="logo">JIE</div>
      <ul className="nav-list">
          <li><a href="#">Software</a></li>
          <li><a href="#">Gear</a></li>
          <li><a href="#">Contact</a></li>
      </ul>
      <div className="burger">
        <div className="inline1"></div>
        <div className="inline2"></div>
        <div className="inline3"></div>
      </div>
    </nav>

    <main>
    </main>

    <footer>
      <a
        href="https://zeit.co?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by <img src="/zeit.svg" alt="ZEIT Logo" />
      </a>
    </footer>
  </div>
)

export default Home
