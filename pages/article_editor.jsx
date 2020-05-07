import { useState, Fragment, useEffect } from "react"
import Nav2 from "../components/nav"
import Footer from "../components/footer"
import { Form, Button } from "react-bootstrap"
import { log } from "util"
import IndexHeader from "../components/index_header"
import axios from "axios"
import withAuth from "../components/auth_route"
import ReactMarkdown from "react-markdown"

const ArticleEditor = () => {
  const [content, setContent] = useState(`
  # test
  ## test
  \`\`\`
  console.log(asd)
  \`\`\`
  `)
  const [topics, setTopics] = useState([])
  useEffect(() => {
    async function fetchTopics() {
      // const topics = await axios.get("https://www.jie1203.com/api/topics")
      const topics = await axios.get("http://localhost:4000/topics")
      setTopics(topics.data)
    }
    fetchTopics()
  }, [])

  const [validated, setValidated] = useState(false)

  function changeContent(event) {
    setContent(event.target.value)
  }

  function handleSubmit(e) {
    // 表单校验
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    }
    setValidated(true)
    // 提交表单
    if (validated) {
      e.preventDefault()
      console.log(e.target[0].value)
    }
  }

  return (
    <Fragment>
      <IndexHeader title={"Editor"} />
      <Nav2 />

      <div className="d-flex" style={{ marginTop: "15vh", height: "85vh" }}>
        <Form
          validated={validated}
          style={{ padding: "0 2rem", width: "50vw" }}
          onSubmit={handleSubmit}
          noValidate
        >
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Here goes your article title"
            />
            {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
          </Form.Group>
          <Form.Group>
            <Form.Label>Topics</Form.Label>
            <Form.Control as="select" multiple>
              {topics.map((topic, i) => {
                return <option key={i}>{topic.name}</option>
              })}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows="20"
              onChange={changeContent}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Publish
          </Button>
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
