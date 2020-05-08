import withAuth from "../components/auth_route"
import { Button } from "antd"
import { Select } from 'antd'

const { Option } = Select

const Test = (props) => {

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

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
      <Button type="primary">Button</Button>
      <Select
        mode="multiple"
        style={{ width: '100%' }}
        placeholder="Please select"
        onChange={handleChange}
      >
        <Option key={1}>1</Option>
        <Option key={2}>2</Option>
        <Option key={3}>3</Option>
      </Select>
    </div>
  )
}

export default withAuth(Test)
