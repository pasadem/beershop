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
import { useSelector } from "react-redux";

const HopsScreen = () => {
  const { pageNumber, keyword } = useParams();
  const category = useSelector(state => state.category.items.category)
  const producer = useSelector(state => state.category.items.producer)

  console.log(category)


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
         
          <Row>
            {filteredByCategory(data.products, 'Hops', producer).map((product) => (
              (product.countInStock > 0) &&
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
