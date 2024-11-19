import { Table, Button, Row, Col, ButtonGroup } from "react-bootstrap";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import Paginate from "../../components/Paginate";
import filteredByCategory from "../../utils/categoryUtils";
import {
  useGetProductsQuery,
  useDeleteProductMutation,
  useCreateProductMutation,
} from "../../slices/productsApiSlice";
import { toast } from "react-toastify";
import { useState } from "react";

const ProductListScreen = () => {
  const { pageNumber } = useParams();

  const [category, setCategory] = useState("");

  const { data, isLoading, error, refetch } = useGetProductsQuery({
    pageNumber,
  });

  // console.log(filteredByCategory(data.products, 'Hops', ''))

  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Ви впевнені, що хочете видалити товар?")) {
      try {
        await deleteProduct(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();

  const createProductHandler = async () => {
    if (window.confirm("Ви впевнені, що хочете створити новий товар?")) {
      try {
        await createProduct();
        refetch();
        setCategory("new");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Товари</h1>
        </Col>
        <Col className="text-end">
          <Button className="my-3" onClick={createProductHandler}>
            <FaPlus /> Створити товар
          </Button>
        </Col>
      </Row>
      <Row className="align-items-center">
        <Col className="text-end">
          <ButtonGroup className="pb-3">
          
            <Button onClick={() => setCategory("Hops")}>Хміль</Button>
            <Button onClick={() => setCategory("Yeast")}>Дріжджі</Button>
            <Button onClick={() => setCategory("Malt")}>Солод</Button>
            <Button onClick={() => setCategory("Equipment")}>Обладнання</Button>

          </ButtonGroup>
        </Col>
      </Row>
      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error.data.message}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>НАЗВА</th>
                <th>ЦІНА</th>

                <th>КАТЕГОРІЯ</th>
                <th>ВИРОБНИК</th>
                <th>НАЯВНІСТЬ</th>
                <th>ЗНИЖКА</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredByCategory(data.products, category).map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.price}.00</td>

                  <td>{product.category}</td>
                  <td>{product.origin}</td>
                  <td>{product.countInStock}</td>
                  <td>{product.discount}</td>
                  <td>
                    <Button
                      as={Link}
                      to={`/admin/product/${product._id}/edit`}
                      variant="light"
                      className="btn-sm mx-2"
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <FaTrash style={{ color: "white" }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={data.pages} page={data.page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default ProductListScreen;
