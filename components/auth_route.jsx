import ServerCookie from 'next-cookies'
import { TOKEN_STORAGE_KEY, AuthToken } from '../services/auth_token'

// const TOKEN_STORAGE_KEY = "nextSite.authToken"

export default AuthComponent => {
  const withAuth = props => {
    return <AuthComponent {...props} />
  }

  withAuth.getInitialProps = async ctx => {
    const token = ServerCookie(ctx)[TOKEN_STORAGE_KEY]
    const auth = new AuthToken(token)
    auth.expiresAt = auth.expiresAt().toLocaleString()
    const initialProps = {
      auth,
    }
    if (auth.isExpired()) {
      ctx.res.writeHead(302, {
        Location: "/login"
      })
      ctx.res.end()
    }
    if (AuthComponent.getInitialProps) {
      return AuthComponent.getInitialProps(initialProps)
    }
    return initialProps
  }

  return withAuth
}