import React, { useState } from 'react'
import classNames from 'classnames'
import { SectionProps } from '../../utils/SectionProps'
import ButtonGroup from '../elements/ButtonGroup'
import Button from '../elements/Button'
import Input from '../elements/Input'
import { AuthToken } from '../../services/auth_token'
import axios from 'axios'
import { urlPrefix } from '../../config'

const propTypes = {
  ...SectionProps.types,
}

const defaultProps = {
  ...SectionProps.defaults,
}

const LoginForm = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  ...props
}) => {
  const outerClasses = classNames(
    'login-form section center-content',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  )

  const innerClasses = classNames(
    'login-form-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  )

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = async () => {
    const data = {
      name: username,
      password: password,
    }
    try {
      const res = await axios.post(`${urlPrefix}/users/login`, data)
      await AuthToken.storeToken(res.data.token)
    } catch (e) {
      console.log(e)
      if (e.response.data.message) {
      } else if (e.response.data) {
      }
    }
    // Router.push("/")
  }

  return (
    <section {...props} className={outerClasses}>
      <div className="container-sm">
        <div className={innerClasses}>
          <div className="login-form-content">
            <h2
              className="mt-0 mb-16 reveal-from-bottom"
              data-reveal-delay="200"
            >
              Welcome
            </h2>
            <div className="container-xs">
              <div className="mb-16 input-content reveal-from-bottom">
                <Input
                  label="Username"
                  name="username"
                  onChange={(e) => {
                    setUsername(e.target.value)
                  }}
                />
                <Input
                  label="Password"
                  name="password"
                  type="password"
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}
                />
              </div>
              <div className="reveal-from-bottom" data-reveal-delay="600">
                <ButtonGroup>
                  <Button
                    tag="button"
                    color="primary"
                    wideMobile
                    wide
                    onClick={login}
                  >
                    Login
                  </Button>
                </ButtonGroup>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

LoginForm.propTypes = propTypes
LoginForm.defaultProps = defaultProps

export default LoginForm
