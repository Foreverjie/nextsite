import Head from "next/head"
import Link from "next/link"

const Home = () => (
  <div className="container">
    <Head>
      <title>JIE</title>
      <link rel="icon" href="/favicon.ico" />
      <script type="text/javascript" src="/style.js"></script>
    </Head>

    <nav id="nav" className="fix-top">
      <div className="logo">
        <Link href="/">
          <a>JIE</a>
        </Link>
      </div>
      <div className="nav-bar">
        <ul className="nav-list">
          <li>
            <a href="#">Software</a>
          </li>
          <li>
            <a href="#">Gear</a>
          </li>
        </ul>
        <ul className="nav-list">
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
      </div>
      <div id="burger">
        <div className="inline1"></div>
        <div className="inline2"></div>
        <div className="inline3"></div>
      </div>
    </nav>

    <main>
      <h1>JIE</h1>
      <h3>
        Self-learning software and electrical engineering through research &
        development.
      </h3>
      <div className="social">
        <a href="https://github.com/Foreverjie" target="_blank">
          <img src="/github.svg"></img>
        </a>
      </div>
    </main>

    <footer>
      <a
        href="https://zeit.co?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
      >
        Powered by <img src="/zeit.svg" alt="ZEIT Logo" />
      </a>
    </footer>
  </div>
)

export default Home
