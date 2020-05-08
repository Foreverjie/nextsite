import {
  Navbar,
  Nav,
} from "react-bootstrap"
import Link from "next/link"

const Nav2 = () => (
  <Navbar bg="light" expand="lg" className="fixed-top">
    <Navbar.Brand>
      <Link href="/">
        <a className="nav-link">JIE</a>
      </Link>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Link href="/articles">
          <a className="nav-link">Articles</a>
        </Link>
        <Link href="/article_editor">
          <a className="nav-link">Editor</a>
        </Link>
        <Link href="/test">
          <a className="nav-link">Test</a>
        </Link>
      </Nav>
      <Nav className="mr-0">
        <Nav>Contact</Nav>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Nav2
