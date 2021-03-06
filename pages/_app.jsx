// import "../style/styles.css"
// import "../style/article_editor.css"
// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'antd/dist/antd.css'
// import '../style/style2.css'
import '../assets/scss/style.scss'
import ToastContainer from '../utils/toast/ToastContainer'

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <ToastContainer />
      <Component {...pageProps} />
    </>
  )
}
