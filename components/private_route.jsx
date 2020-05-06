import { AuthToken } from "../services/auth_token"

const privateRoute = (BaseComponent) => (props) => {
  const state = {
    auth: new AuthToken(props.token),
  }

  return <BaseComponent auth={state.auth} />
}

export default privateRoute
