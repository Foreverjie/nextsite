import { Navbar, NavDropdown, Form, FormControl, Button, Nav } from 'react-bootstrap';

const Nav2 = () => (
  <Navbar bg="light" expand="lg" className="fixed-top">
    <Navbar.Brand href="#home">JIE</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="#">Articles</Nav.Link>
      </Nav>
      <Nav className="mr-0">
        <Nav.Link href="#">Contact</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Nav2