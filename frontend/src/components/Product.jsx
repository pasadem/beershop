import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <Card className=" my-2 p-3 rounded hight-200px">
      <Link to={`/product/${product._id}`}>
        <Card.Img  src={product.image} variant="top" />
      </Link>
      <Card.Body as="div">
        <Link to={`/product/${product._id}`}>
          <Card.Title >
            <h6><strong>{product.name}</strong></h6>
          </Card.Title>
        </Link>
        <Card.Text as="div">Виробник: {product.producer}</Card.Text>
        <Card.Text as="h5">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
