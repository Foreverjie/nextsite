import { useState, Fragment, useEffect } from "react"
import IndexHeader from "../components/index_header"
import Nav from "../layout/nav"
import Footer from "../components/footer"
import axios from "axios"
import ReactMarkdown from "react-markdown"
import withAuth from "../components/auth_route"
import { tokenConfig } from "../services/auth_token"
import { redirectToIndex } from "../services/redirect"

import { Form, Button, Input, Select } from "antd"

const { Option } = Select

const validateMessages = {
  required: "${label} is required!",
}

const ArticleEditor = (props) => {
  // 可选Topics
  const [topics, setTopics] = useState([])
  useEffect(() => {
    async function fetchTopics() {
      // const topics = await axios.get("https://www.jie1203.com/api/topics")
      const topics = await axios.get("http://localhost:4000/topics")
      // console.log(topics)
      setTopics(topics.data)
    }
    fetchTopics()
  }, [])

  // 正文内容
  const [content, setContent] = useState(`
  # test
  ## test
  \`\`\`js
  console.log(asd)
  \`\`\`
  `)
  function changeContent(event) {
    setContent(event.target.value)
  }

  async function onFinish(values) {
    const config = tokenConfig(props.auth.token)

    const res = await axios.post(
      "http://localhost:4000/articles",
      values.article,
      config
    )

    console.log(res.data)

    // 提交后重定向到主页
    redirectToIndex()
  }

  function topicsChange(value) {
    console.log(`selected ${value}`)
  }

  return (
    <Fragment>
      <IndexHeader title={"Editor"} />
      <Nav />

      <div
        className="d-flex"
        style={{ marginTop: "15vh", height: "fit-conotent" }}
      >
        <Form
          layout={"vertical"}
          style={{ padding: "0 2rem", width: "50vw" }}
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item
            name={["article", "title"]}
            label="Title"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["article", "desc"]}
            label="Description"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name={["article", "topics"]} label="Topics">
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Please select"
              onChange={topicsChange}
            >
              {topics.map((topic, i) => {
                return <Option key={topic._id}>{topic.name}</Option>
              })}
            </Select>
          </Form.Item>
          <Form.Item
            name={["article", "content"]}
            label="Content"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.TextArea rows={20} onChange={changeContent} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Publish
            </Button>
          </Form.Item>
        </Form>

        <div style={{ padding: "0 2rem" }}>
          <h1 className="badge badge-secondary">Content Preview</h1>
          <ReactMarkdown source={content} />
        </div>
      </div>

      <Footer color={"black"} />
    </Fragment>
  )
}

export default withAuth(ArticleEditor)
