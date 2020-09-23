import { useState, Fragment, useEffect } from 'react'
import Router from 'next/router'
// import Nav2 from '../components/nav'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import LoginForm from '../components/sections/LoginForm'
import IndexHeader from '../components/index_header'
import axios from 'axios'
import { AuthToken } from '../services/auth_token'
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
    await AuthToken.storeToken(res.data.token)
    // Router.push("/")
  }

  return (
    <Fragment>
      <IndexHeader title={'Login'} />
      {/* <Nav2 /> */}
      <Header navPosition="right" className="reveal-from-bottom" />
      <main className="site-content">
        <LoginForm />
      </main>
      <Footer color={'black'} />
    </Fragment>
  )
}

export default Login
