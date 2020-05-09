import { useState, Fragment, useEffect } from "react"
import Router from "next/router"
import Nav2 from "../components/nav"
import Footer from "../components/footer"
import { Form, Button } from "react-bootstrap"
import { log } from "util"
import IndexHeader from "../components/index_header"
import axios from "axios"
import { AuthToken } from "../services/auth_token"
import { urlPrefix } from '../config'


const Login = () => {
  // const [name, setName] = useState('')

  const login = async (e) => {
    e.preventDefault()
    // log(e.target[0].value)
    // log(e.target[1].value)
    const data = {
      name: e.target[0].value,
      password: e.target[1].value,
    }
    const res = await axios.post(`${urlPrefix}/users/login`, data)
    log(res.data.token)
    await AuthToken.storeToken(res.data.token)
    // Router.push("/")
  }

  return (
    <Fragment>
      <IndexHeader title={"Login"} />
      <Nav2 />

      <div
        className="d-flex justify-content-center"
        style={{ margin: "15vh 0" }}
      >
        <Form onSubmit={login}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" />
            {/* <Form.Text className="text-muted">
            We'll never share your name with anyone else.
          </Form.Text> */}
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          {/* <Form.Group>
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group> */}
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </div>

      <Footer color={"black"} />
    </Fragment>
  )
}

export default Login
