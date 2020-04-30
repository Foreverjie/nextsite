import { useState, useEffect, Fragment } from "react"
import IndexHeader from "../components/index_header"
import IndexMain from "../components/index_main"
import Article from "../components/article"
import Footer from "../components/footer"
import axios from "axios"

import Nav2 from "../components/nav"

const Home = () => {
  const [articles, setArticles] = useState([])

  useEffect(() => {
    async function fetchArticles() {
      const articles = await axios.get("https://www.jie1203.com/api/articles")
      setArticles(articles.data)
    }
    fetchArticles()
  }, [])

  return (
    <Fragment>
      <IndexHeader />
      <Nav2 />

      <div className="container-fluid index">
        {/* <IndexNav /> */}
        <IndexMain />
      </div>
      <div
        className="container-fluid mr-auto"
        style={{ backgroundColor: "black", paddingTop: "5vh"}}
      >
        <Article articles={articles} />
        <Footer />
      </div>
    </Fragment>
  )
}

export default Home
