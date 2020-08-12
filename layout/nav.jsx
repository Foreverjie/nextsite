import {
    Navbar,
    Nav as Nav2,
  } from "react-bootstrap"
  import Link from "next/link"
  
  const Nav = () => (
    <Navbar bg="light" expand="lg" className="fixed-top">
      <Navbar.Brand>
        <Link href="/">
          <a className="nav-link">JIE</a>
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav2 className="mr-auto">
          <Link href="/articles">
            <a className="nav-link">Articles</a>
          </Link>
          <Link href="/article_editor">
            <a className="nav-link">Editor</a>
          </Link>
          <Link href="/test">
            <a className="nav-link">Test</a>
          </Link>
          <Link href="/axe_render">
            <a className="nav-link">Render</a>
          </Link>
        </Nav2>
        <Nav2 className="mr-0">
          Contact
        </Nav2>
      </Navbar.Collapse>
    </Navbar>
  )
  
  export default Nav
  