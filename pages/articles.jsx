import { useState, useEffect, Fragment } from "react"
import IndexHeader from "../components/index_header"
import Article from "../components/article"
import Footer from "../components/footer"
import axios from "axios"
import Nav from "../layout/nav"
import { urlPrefix } from '../config'


const Home = () => {
  const [articles, setArticles] = useState([])

  useEffect(() => {
    async function fetchArticles() {
      // const articles = await axios.get("https://www.jie1203.com/api/articles")
      const res = await axios.get(`${urlPrefix}/articles`)
      setArticles(res.data)
      // console.log(res.data)
    }
    fetchArticles()
  }, [])

  return (
    <Fragment>
      <IndexHeader title={'Articles'}/>
      <Nav />

      <div
        className="container-fluid mr-auto"
        style={{ backgroundColor: "black", paddingTop: "15vh" }}
      >
        <Article articles={articles} />
        <Footer />
      </div>
    </Fragment>
  )
}

export default Home
