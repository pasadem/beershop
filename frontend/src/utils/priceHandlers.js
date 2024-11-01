import { Row, Col } from "react-bootstrap";

export const discountCalc = (product) => {
  return product.price * ((100 - product.discount) / 100);
};

export const discountHandler = (product) => {
  return (
    <>
      {product.discount !== 0 ? (
        <>
          <Row>
            <Col xs={4} className="text-decoration-line-through">
              {product.price}
            </Col>
            <Col className="text-danger text-start" xs={8}>{`${discountCalc(
              product
            )} ${weightHandler(product)}`}</Col>
          </Row>
        </>
      ) : (
        `${product.price} ${weightHandler(product)}`
      )}
    </>
  );
};

export const weightHandler = (product) => {
  if (product.category === "Yeast") {
    return `грн/0.5 кг`;
  } else if (product.category === "Hops") {
    return `грн/кг`;
  }
};
