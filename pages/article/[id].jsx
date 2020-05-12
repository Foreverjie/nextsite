import { useRouter } from "next/router"
import axios from "axios"
import { urlPrefix } from "../../config"
import { Fragment } from "react"
import IndexHeader from "../../components/index_header"
import Nav from "../../layout/nav"
import ReactMarkdown from "react-markdown"
import { Badge } from "antd"

const Article = (props) => {
  const router = useRouter()
  const { id } = router.query

  return (
    <Fragment>
      <IndexHeader title={props.article.title} />
      <Nav />

      <div
        className="d-flex flex-column align-items-center"
        style={{ marginTop: "10vh", height: "90vh" }}
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
        <h3 style={{ width: "fit-content", maxWidth: "60%" }}>
          <Badge color={"blue"} text={props.article.author.name} />
        </h3>
        <ReactMarkdown source={props.article.content} />
      </div>
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
