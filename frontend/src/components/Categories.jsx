import { Nav, Container, Row, Col, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateCategory, updateProducer } from "../slices/categorySlice.js";

import React from "react";
import { equipmentCategoryData, hopsCategoryData } from "../products.js";

const Categories = () => {
  const dispatch = useDispatch();
  return (
    <Container className="border-bottom  px-100px ">
      <Row>
        <Col>
          <Nav className="py-2 px-4 link-dark width-500px bg-opacity-75">
            {/* <Nav.Link as={Link} to="equipment"  className="py-3 px-4 link-dark"> */}

            <NavDropdown
              id="nav-dropdown-dark-example"
              title="Хміль"
              menuVariant="light"
              className=" mx-2 link-dark"
              drop='end'
            >
              {hopsCategoryData.map((item, i) => (
                <NavDropdown.Item
                  key={i}
                  as={Link}
                  to="/hops"
                  onClick={() => dispatch(updateProducer(item.eng))}
                >
                  {item.ukr}
                </NavDropdown.Item>
              ))}
            </NavDropdown>

            <NavDropdown
              id="nav-dropdown-dark-example"
              title="Дріжджі"
              menuVariant="light"
              className="mx-2 link-dark"
            >
              <NavDropdown.Item
                as={Link}
                to="/yeast"
                onClick={() => dispatch(updateProducer(""))}
              >
                Всі виробники
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/yeast"
                onClick={() => dispatch(updateProducer("Lallemand"))}
              >
                Lallemand
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/yeast"
                onClick={() => dispatch(updateProducer("Fermentis"))}
              >
                Fermentis
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown
              id="nav-dropdown-dark-example"
              title="Солод"
              menuVariant="light"
              className="mx-2 link-dark"
            >
              Солод
            </NavDropdown>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title="Обладнання"
              menuVariant="light"
              className=" mx-2 link-dark"
            >
              {equipmentCategoryData.map((item, i) => (
                <NavDropdown.Item
                  key={i}
                  as={Link}
                  to="/equipment"
                  onClick={() => dispatch(updateProducer(item.eng))}
                >
                  {item.ukr}
                </NavDropdown.Item>
              ))}
            </NavDropdown>

            <Nav.Link as={Link} to="/cart" className="mx-2 link-dark">
              Інше
            </Nav.Link>
            <Nav.Link as={Link} to="/discount" className="mx-2 link-dark">
              Знижки
            </Nav.Link>
            <Nav.Link as={Link} to="/cart" className="mx-2 link-dark">
              Про нас
            </Nav.Link>
            <Nav.Link as={Link} to="/cart" className="mx-2 link-dark">
              Контакти
            </Nav.Link>
          </Nav>
        </Col>
      </Row>
    </Container>
  );
};

export default Categories;
