import Link from "next/link"

const IndexNav = () => (
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
)

export default IndexNav
