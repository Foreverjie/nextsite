import { useState, useEffect } from "react"
import IndexHeader from "../components/index_Header"
import IndexNav from "../components/index_Nav"
import IndexMain from "../components/index_main"
import Article from "../components/article"
import Footer from "../components/footer"
import axios from "axios"

const Home = ({ stars }) => {
  const [articles, setArticles] = useState([])

  useEffect(() => {
    async function fetchArticles() {
      const articles = await axios.get("http://localhost:4000/articles")
      setArticles(articles.data)
    }
    fetchArticles()
  }, [])

  return (
    <div className="container">
      <IndexHeader />
      <IndexNav />
      <IndexMain />

      <Article articles={articles} />

      <Footer />
    </div>
  )
}

export default Home
