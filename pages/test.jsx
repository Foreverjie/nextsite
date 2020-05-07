import withAuth from "../components/auth_route"

const Test = (props) => {
  return (
    <div>
      <h1>test</h1>
      <h2>
        <strong>Name: </strong>
        {props.auth.decodedToken.name}
      </h2>
      <h2>
        <strong>Expired At: </strong>
        {props.auth.expiresTime}
      </h2>
    </div>
  )
}

export default withAuth(Test)
