import axios from "axios"
import { urlPrefix } from "../../config"
import { Fragment } from "react"
import IndexHeader from "../../components/index_header"
import Nav from "../../layout/nav"
import Footer from "../../components/footer"
import ReactMarkdown from "react-markdown"
import { Badge, Tag, Affix, Button } from "antd"
import { EditOutlined, LikeOutlined } from "@ant-design/icons"
import dateFormat from "dateformat"
import withAuth from "../../components/auth_route"

const Article = (props) => {
  const updateAt = new Date(props.article.updatedAt)
  const updateTime = dateFormat(updateAt, "yyyy-mm-dd HH:MM")

  return (
    <Fragment>
      <IndexHeader title={props.article.title} />
      <Nav />

      <div
        className="d-flex flex-column align-items-center"
        style={{ margin: "10vh 0 3vh", minHeight: "80vh" }}
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
          className="d-flex flex-column align-items-center"
          style={{ width: "fit-content", maxWidth: "60%", padding: "2rem 0" }}
        >
          <Badge
            color={"blue"}
            text={props.article.author.name + " - " + updateTime}
          />
          <div style={{ paddingTop: "0.5rem" }}>
            {props.article.topics.map((topic, i) => {
              return (
                <Tag color="blue" key={topic._id}>
                  {topic.name}
                </Tag>
              )
            })}
          </div>
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
        <Affix style={{ position: "fixed", bottom: "5rem", right: "5rem" }}>
          {props.article.author._id == props.auth.decodedToken._id ? <Button
            type="primary"
            className="d-flex justify-content-center"
            shape="circle"
            size="large"
          >
            <EditOutlined />
          </Button> : <Button
            type="default"
            className="d-flex justify-content-center"
            shape="circle"
            size="large"
          >
            <LikeOutlined />
          </Button>}
        </Affix>
      </div>

      <Footer color={"black"} />
    </Fragment>
  )
}

Article.getInitialProps = async (ctx) => {
  const { id } = ctx.query
  const res = await axios.get(`${urlPrefix}/articles/${id}`)

  const intialProps = {
    article: res.data,
  }
  return intialProps
}

export default withAuth(Article)
