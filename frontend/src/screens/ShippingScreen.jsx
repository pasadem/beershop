import { useState, useEffect } from "react";
import { Form, Button, NavDropdown, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { saveShippingAddress } from "../slices/cartSlice";

import { NP_URL } from "../constants";
import axios from "axios";

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);

  const { shippingAddress } = cart;
  console.log(shippingAddress);

  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [results, setResults] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState(
    shippingAddress.phoneNumber || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");
  const [openList, setOpenList] = useState(false);

  console.log(results);

  const fetchPoshtaItems = async (city) => {
    const options = {
      method: "POST",
      url: NP_URL,

      data: {
        apiKey: "523e492b98793a5cb639344b6a556643",
        modelName: "AddressGeneral",
        calledMethod: "getWarehouses",
        methodProperties: {
          CityName: city,
        },
      },
    };
    const response = await axios.request(options);
    setResults(response.data.data);
  };

  const cityHandler = (res) => {
    return res.length ? res : "@";
  };

  useEffect(() => {
    fetchPoshtaItems(cityHandler(city));
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submiCitytHandler = () => {
    fetchPoshtaItems(cityHandler(city));
    setOpenList(true);

  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, phoneNumber, country }));
    navigate("/payment");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h3>Доставка</h3>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="city">
          <Form.Label>Місто</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              placeholder="Введіть назву міста"
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            ></Form.Control>
            <Button onClick={submiCitytHandler}>Знайти відділення</Button>
          </InputGroup>
        </Form.Group>
        <>
          {openList &&
          <NavDropdown
            id="nav-dropdown-dark-example"
            title="Відділення Нової Пошти"
            menuVariant="light"
            className="mx-2 link-dark"
          >
            {results.length > 0
              ? results.map((item, index) => (
                  <NavDropdown.Item
                    key={index}
                    onClick={() => {setCountry(item.Description); setOpenList(false)}}
                  >
                    {item.Description}
                  </NavDropdown.Item>
                ))
              : ' В цьому населеному пункті відсутні відділення "Нової Пошти" '}
          </NavDropdown>
}
        </>

        <Form.Group className="my-2" controlId="address">
          <Form.Label>П.І.Б</Form.Label>
          <Form.Control
            type="text"
            placeholder="Введіть прізвище та ім'я"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="postalCode">
          <Form.Label>Телефон</Form.Label>
          <Form.Control
            type="text"
            placeholder="Введіть номер телефону"
            value={phoneNumber}
            required
            onChange={(e) => setPhoneNumber(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {/* <Form.Group className="my-2" controlId="country">
          <Form.Label>Область</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter country"
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group> */}

        <Button type="submit" variant="primary">
          Продовжити
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
