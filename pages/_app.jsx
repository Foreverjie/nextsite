// import "../style/styles.css"
// import "../style/article_editor.css"
// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'antd/dist/antd.css'
// import '../style/style2.css'
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import '../assets/scss/style.scss'

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <ReactNotification />
      <Component {...pageProps} />
    </>
  )
}
