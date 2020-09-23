import ServerCookie from 'next-cookies'
import { TOKEN_STORAGE_KEY, AuthToken } from '../services/auth_token'
import { redirectToLogin } from '../services/redirect'

const AuthHOC = (AuthComponent) => {
  const withAuth = (props) => {
    return <AuthComponent {...props} />
  }

  withAuth.getInitialProps = async (ctx) => {
    const token = ServerCookie(ctx)[TOKEN_STORAGE_KEY]
    const auth = new AuthToken(token)
    auth.expiresTime = auth.expiresAt().toLocaleString()
    let initialProps = {
      auth,
    }
    if (auth.isExpired()) {
      console.log(ctx.res)
      redirectToLogin(ctx.res)
    }
    if (AuthComponent.getInitialProps) {
      const authComponentProps = await AuthComponent.getInitialProps(ctx)
      initialProps = { ...authComponentProps, ...initialProps }
    }
    return initialProps
  }

  return withAuth
}

export default AuthHOC
