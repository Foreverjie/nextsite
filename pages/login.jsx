import { Fragment } from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import LoginForm from '../components/sections/LoginForm'
import IndexHeader from '../components/index_header'

const Login = () => {
  // const [name, setName] = useState('')

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
