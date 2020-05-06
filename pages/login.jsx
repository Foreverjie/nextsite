import { useState, Fragment, useEffect } from 'react'
import Nav2 from "../components/nav"
import Footer from "../components/footer"
import { Form, Button } from 'react-bootstrap'
import { log } from 'util'
import IndexHeader from '../components/index_header'
import axios from "axios"


const Login = () => {
  
  // const [name, setName] = useState('')

  const login = (e) => {
    e.preventDefault()
    log(e.target[0].value)
    log(e.target[1].value)
  }

  return (
  <Fragment>
    <IndexHeader title={'Login'} />
    <Nav2 />

    <div className="d-flex justify-content-center" style={{margin: '15vh 0'}}>
      <Form onSubmit={login}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter name" />
          <Form.Text className="text-muted">
            We'll never share your name with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        {/* <Form.Group>
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group> */}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>

    <Footer color={'black'}/>
  </Fragment>
)}

export default Login