import { useState, Fragment, useEffect } from 'react'
import Nav2 from "../components/nav"
import Footer from "../components/footer"
import { Form, Button } from 'react-bootstrap'
import { log } from 'util'
import IndexHeader from '../components/index_header'
import axios from "axios"

const ReactMarkdown = require('react-markdown')

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
      log(topics)
      setTopics(topics.data)
    }
    fetchTopics()
    log(topics)
  }, [])

  function changeContent(event) {
    setContent(event.target.value)
  }

  return (
  <Fragment>
    <IndexHeader title={'Editor'} />
    <Nav2 />

    <div className="d-flex" style={{marginTop: '15vh'}}>
      <Form style={{padding:'0 2rem', width: '50vw'}}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control type="email" placeholder="Here goes your article title" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Topics</Form.Label>
          <Form.Control as="select" multiple>
            {topics.map((topic, i) => {
              return (
                <option key={i}>{topic.name}</option>
              )}
            )}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Content</Form.Label>
          <Form.Control as="textarea" rows="8" onChange={changeContent} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Publish
        </Button>
      </Form>

      <div style={{padding: '0 2rem'}}>
        <h1 className="badge badge-secondary">Content Preview</h1>
        <ReactMarkdown source={content} />
      </div>
    </div>

    <Footer color={'black'}/>
  </Fragment>
)}

export default ArticleEditor