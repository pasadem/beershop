import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { weightHandler } from "../utils/priceHandlers";
import { discountHandler}  from "../utils/priceHandlers";

const Product = ({ product }) => {
  
  const addDiscount = (product) => {
    if (product.discount !== 0) {
      return (
        <>
          <Card.ImgOverlay >
            <h4 className="text-danger fw-bold text-center mt-5 pt-5">
              ЗНИЖКА {product.discount} %
            </h4>
          </Card.ImgOverlay>
        </>
      );
    } else {
      return <></>;
    }
  };

  const sizeHandler = (product) => {
    if (product.origin === "Fermentis") {
      return (
        <>
          <Card.Img
            
            src={product.image}
            variant="top"
            style={{ height: "180px", width: "180px" }}
          />
        </>
      );
    }
    return (
      <>
        <Card.Img
          src={product.image}
          variant="top"
          style={{ height: "160px", width: "200px"}}
        />
      </>
    );
  };

  return (
    <Card className="my-2 p-2 text-center rounded">
      <Link to={`/product/${product._id}`}>
        {sizeHandler(product)}
        {addDiscount(product)}
      </Link>

      
        <Link to={`/product/${product._id}`}>
          <div className=" text-start">            <strong>{product.name}</strong>
          </div>
        </Link>
        <Card.Text className="text-start" as="div">Виробник: {product.origin}</Card.Text>
        <h9 className="text-start">{discountHandler(product)}</h9>
      
    </Card>
  );
};

export default Product;
