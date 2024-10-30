import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { weightHandler } from "../utils/weightHundler";

const Product = ({ product }) => {

  const sizeHandler = (product) => {
    if (product.origin === 'Fermentis') {
      return (
        <>
          <Card.Img
          className="mx-4"
          src={product.image}
          variant="top"
          style={{ height: "180px", width: "180px" }}
        />
        </>
      )
    }
    return (
      <>
      <Card.Img
          src={product.image}
          variant="top"
          style={{ height: "180px" }}
        />
      </>
    )
  } 

  return (
    <Card className="my-2  rounded">
      <Link to={`/product/${product._id}`}>
        {sizeHandler(product)}
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Text as="div" className="product-title">
            <strong>{product.name}</strong>
          </Card.Text>
        </Link>
        <Card.Text as="div">Виробник: {product.origin}</Card.Text>

        <Card.Text as="div">{weightHandler(product)}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
