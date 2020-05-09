import { useRouter } from 'next/router'
import axios from 'axios'
import { urlPrefix } from '../../config'


const Article = (props) => {
  const router = useRouter()
  const { id } = router.query

  return (
    <div>
      <h1>Post: {id}</h1>
      <h2>Article: {props.article.title}</h2>
    </div>
  )
}

Article.getInitialProps = async (ctx) => {
  // console.log(ctx)
  const { id } = ctx.query
  const res = await axios.get(`${urlPrefix}/articles/${id}`)

  const intialProps = {
    article: res.data
  }
  return intialProps
}

export default Article