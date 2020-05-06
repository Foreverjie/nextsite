const Footer = (props) => (
  <div className="d-flex justify-content-center">
    <a
      href="http://www.beian.miit.gov.cn/"
      style={{ color: props.color ? props.color : "white" }}
      target="_blank"
    >
      粤ICP备18087217
    </a>
  </div>
)

export default Footer
