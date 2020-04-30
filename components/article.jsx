import { Card, Button } from "react-bootstrap"

const Article = (props) => {
  return props.articles.map((article, i) => {
    return (
      <Card key={i} bg="dark" text="light" style={{ marginBottom: "5vh" }}>
        <Card.Header as="h5">Featured</Card.Header>
        <Card.Body>
          <Card.Title>{article.title}</Card.Title>
          <Card.Text>{article.desc}</Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    )
  })
}

export default Article
