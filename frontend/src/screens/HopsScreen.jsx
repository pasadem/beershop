import { Row, Col, Nav, NavDropdown } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
// import ProductCarousel from '../components/ProductCarousel';
import Meta from "../components/Meta";
import filteredByCategory from "../utils/categoryUtils";
import { useState } from "react";

const HopsScreen = () => {
  const { pageNumber, keyword } = useParams();
  const [producer, setProducer] = useState('')

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  const sortArr = (arr) => arr.filter((it, index) => index === arr.indexOf(it = it.trim()));

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta />
          <Nav>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title="Виробник"
              menuVariant="light"
            >
              {
                filteredByCategory(data.products, "Hops", producer).map((product) => (
                  <NavDropdown.Item key={ product._id} onClick={() => setProducer(product.origin)}>{product.producer}</NavDropdown.Item>
                ))
              }
              {/* <NavDropdown.Item onClick={() => setProducer('Germany')}>Німеччина</NavDropdown.Item> */}
              {/* <NavDropdown.Item href="#action/3.2">ПАР</NavDropdown.Item>
              <NavDropdown.Item onClick={() => setProducer('Slovenia')}>Словенія</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Чехія</NavDropdown.Item> */}
            </NavDropdown>
          </Nav>
          <Row>
            {filteredByCategory(data.products, "Hops", producer).map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default HopsScreen;
