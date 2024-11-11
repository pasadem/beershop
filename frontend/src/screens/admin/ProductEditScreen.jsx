import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from "../../slices/productsApiSlice";
import { discountCalc } from "../../utils/priceHandlers";
import { hopsCategoryData } from "../../products";

const ProductEditScreen = () => {
  const { id: productId } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [origin, setProducer] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(2);
  const [description, setDescription] = useState("");
  const [cropYear, setCropYear] = useState("");
  const [alfa, setAlfa] = useState("");
  const [ferment_temp, setFermentTemp] = useState("");
  const [ferment_type, setFermentType] = useState("");
  const [weight, setWeight] = useState("");
  const [discount, setDiscount] = useState(0);

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        productId,
        name,
        price,
        image,
        origin,
        category,
        description,
        countInStock,
        cropYear,
        alfa,
        ferment_temp,
        ferment_type,
        weight,
        discount,
      }).unwrap(); // NOTE: here we need to unwrap the Promise to catch any rejection in our catch block
      toast.success("Товар оновлено");
      refetch();
      navigate("/admin/productlist");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setProducer(product.origin);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
      setCropYear(product.cropYear);
      setAlfa(product.alfa);
      setFermentTemp(product.ferment_temp);
      setFermentType(product.ferment_type);
      setWeight(product.weight);
      setDiscount(product.discount);
    }
  }, [product]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Назад
      </Link>
      <FormContainer>
        <h4>Редагувати товар</h4>

        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error.data.message}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Назва</Form.Label>
              <Form.Control
                type="name"
                placeholder="Ввести назву"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Ціна</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Знижка</Form.Label>
              <Form.Control
                type="number"
                placeholder="Знижка"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Вага</Form.Label>
              <Form.Control
                type="text"
                placeholder="Вага"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Температура бродіння</Form.Label>
              <Form.Control
                type="textr"
                placeholder="Температура"
                value={ferment_temp}
                onChange={(e) => setFermentTemp(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Вміст альфа</Form.Label>
              <Form.Control
                type="textr"
                placeholder="Альфа"
                value={alfa}
                onChange={(e) => setAlfa(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Зображення</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.Control
                label="Вибрати файл"
                onChange={uploadFileHandler}
                type="file"
              ></Form.Control>
              {loadingUpload && <Loader />}
            </Form.Group>

            <Form.Group controlId="brand">
              <Form.Label>Виробник</Form.Label>
              <Form.Select>
                <option>{origin}</option>
                <option className="fw-bold" disabled>
                  Хміль
                </option>
                <hr/>
                
                  {hopsCategoryData.map((item, i) => (
                    <option
                      key={i}
                      as={Link}
                      to="/hops"
                      onClick={() => setProducer(item.eng)}
                    >
                      {item.ukr}
                    </option>
                  ))}
                
                 

                <option disabled></option>

                <option className="fw-bold" disabled>
                  Дріжджі
                </option>

                <option
                  type="text"
                  placeholder="Ввести виробника"
                  value={origin}
                  onClick={() => setProducer("Fermentis")}
                >
                  FERMENTIS
                </option>
                <option
                  type="text"
                  placeholder="Ввести виробника"
                  value={origin}
                  onClick={() => setProducer("Lallemand")}
                >
                  LALLEMAND
                </option>
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="countInStock">
              <Form.Label>Кількість на залишку</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ввести кількість"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="category">
              <Form.Label>Категорія</Form.Label>
              <Form.Select>
                <option>{category}</option>
                <option
                  type="text"
                  placeholder="Ввести виробника"
                  value={category}
                  onClick={() => setCategory("Hops")}
                >
                  Хміль
                </option>
                <option
                  type="text"
                  placeholder="Ввести виробника"
                  value={category}
                  onClick={() => setCategory("Yeast")}
                >
                  Дріжджі
                </option>
                <option
                  type="text"
                  placeholder="Ввести виробника"
                  value={category}
                  onClick={() => setCategory("Equipment")}
                >
                  Обладнання
                </option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Описання</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ввести описання"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Рік врожаю</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ввести рік"
                value={cropYear}
                onChange={(e) => setCropYear(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button
              type="submit"
              variant="primary"
              style={{ marginTop: "1rem" }}
            >
              Оновити
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
