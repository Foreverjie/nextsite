import { Badge } from "react-bootstrap"

const TopicLabel = (props) => {
  return props.topics.map((topic, i) => {
    return (
      <Badge pill variant="primary" key={i} style={{ marginRight: "1rem" }}>
        <a href="#" style={{ color: "white" }}>
          {topic.name}
        </a>
      </Badge>
    )
  })
}

export default TopicLabel
