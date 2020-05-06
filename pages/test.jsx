import privateRoute from "../components/private_route"

const Test = ({ auth }) => {
  return <div>test</div>
}

Test.getInitialProps = () => {
  console.log("test initial")
}

export default privateRoute(Test)
