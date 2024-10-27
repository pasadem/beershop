import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <Card className=" my-2 rounded " style={{ height: 280 }}>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" style={{ height: 180 }}/>
      </Link>
      <Card.Body>
      <Card.Title as="strong">{product.name}</Card.Title>

        <Card.Text as="div">Виробник: {product.origin}</Card.Text>
        <Card.Text as="h6">{product.price} грн</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
