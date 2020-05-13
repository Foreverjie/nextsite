import { useRouter } from "next/router"
import axios from "axios"
import { urlPrefix } from "../../config"
import { Fragment } from "react"
import IndexHeader from "../../components/index_header"
import Nav from "../../layout/nav"
import Footer from "../../components/footer"
import ReactMarkdown from "react-markdown"
import { Badge } from "antd"

const Article = (props) => {
  const router = useRouter()
  const { id } = router.query

  const updateAt = new Date(props.article.updatedAt).toLocaleString("chinese", {
    hour12: false,
  })

  return (
    <Fragment>
      <IndexHeader title={props.article.title} />
      <Nav />

      <div
        className="d-flex flex-column align-items-center"
        style={{ margin: "10vh 0 3vh" }}
      >
        <div
          style={{
            width: "fit-content",
            maxWidth: "60%",
            fontSize: "40px",
            lineHeight: "48px",
            fontFamily:
              'medium-content-title-font, Georgia, Cambria, "Times New Roman", Times, serif',
          }}
        >
          {props.article.title}
        </div>

        <div
          style={{ width: "fit-content", maxWidth: "60%", padding: "2rem 0" }}
        >
          <Badge
            color={"blue"}
            text={props.article.author.name + " - " + updateAt}
          />
        </div>

        <div
          style={{
            width: "60%",
            maxWidth: "60%",
            fontSize: "21px",
            lineHeight: "32px",
            fontFamily:
              'medium-content-title-font, Georgia, Cambria, "Times New Roman", Times, serif',
          }}
        >
          <ReactMarkdown source={props.article.content} />
        </div>
      </div>

      <Footer color={"black"} />
    </Fragment>
  )
}

Article.getInitialProps = async (ctx) => {
  // console.log(ctx)
  const { id } = ctx.query
  const res = await axios.get(`${urlPrefix}/articles/${id}`)

  const intialProps = {
    article: res.data,
  }
  return intialProps
}

export default Article
