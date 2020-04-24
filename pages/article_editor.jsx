import { useState } from 'react'
import IndexNav from "../components/index_nav"
import Footer from "../components/footer"
import { log } from 'util'

const ReactMarkdown = require('react-markdown')

const ArticleEditor = () => {
  
  const [title, setTitle] = useState('title')
  const [content, setContent] = useState(`
  \`\`\`
  console.log(asd)
  \`\`\`
  `)

  function changeTitle(event) {
    setTitle(event.target.value)
  }

  function changeContent(event) {
    setContent(event.target.value)
  }

  const input = '# This is a header\n\nAnd this is a paragraph'

  return (
  <div className="container">
    <IndexNav />

    <main>
      <div className="main-article-editor">
        <div className="editor">
          <input placeholder="title" onChange={changeTitle}/>
          <textarea placeholder="content" rows="10" onChange={changeContent}/>
        </div>
        <div className="display">
          <h1 className="display-title">{title}</h1>
          <ReactMarkdown source={content} />
        </div>
      </div>

    </main>

    <Footer />
  </div>
)}

export default ArticleEditor