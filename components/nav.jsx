import { Navbar, NavDropdown, Form, FormControl, Button, Nav } from 'react-bootstrap';
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
        <Nav>
          <Link href="/articles">
            <a className="nav-link">Articles</a>
          </Link>
        </Nav>
      </Nav>
      <Nav className="mr-0">
        <Nav>Contact</Nav>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Nav2