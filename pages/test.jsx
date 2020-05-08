import withAuth from "../components/auth_route"
import { Button, Form, Input, InputNumber, Select } from "antd"

const { Option } = Select

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not validate email!",
    number: "${label} is not a validate number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
}

const Test = (props) => {
  const onFinish = (values) => {
    console.log("finish", values)
  }

  function topicsChange(value) {
    console.log(`selected ${value}`)
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
      <Form
        layout={"vertical"}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={["user", "name"]}
          label="Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["user", "email"]}
          label="Email"
          rules={[
            {
              type: "email",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["user", "age"]}
          label="Age"
          rules={[
            {
              type: "number",
              min: 0,
              max: 99,
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item name={["user", "website"]} label="Website">
          <Input />
        </Form.Item>
        <Form.Item name={["user", "introduction"]} label="Introduction">
          <Input.TextArea />
        </Form.Item>
        <Form.Item name={["user", "topics"]} label="Topics">
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="Please select"
            onChange={topicsChange}
          >
            <Option key={1}>1</Option>
            <Option key={2}>2</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default withAuth(Test)
