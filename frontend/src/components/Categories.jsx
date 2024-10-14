import { Nav, Container,Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import React from "react";

const Categories = () => {
  return (
    <Container className="border-bottom  px-100px ">
      <Row>
        <Col ><Nav className="  width-500px bg-opacity-75">
        <Nav.Link as={Link} to="/hops"  className="py-3 px-4 link-dark">
          Хміль
        </Nav.Link>
       
        <Nav.Link as={Link} to="/yeast" className=" py-3 mx-3 link-dark"  >
          Дріжді
        </Nav.Link>
       
        
        <Nav.Link as={Link} to="/cart" className=" py-3 mx-3 link-dark">
          Солод
        </Nav.Link>
        <Nav.Link as={Link} to="/cart" className=" py-3 mx-3 link-dark">
          Обладнання
        </Nav.Link>
        <Nav.Link as={Link} to="/cart" className=" py-3 mx-3 link-dark">
          Очистка
        </Nav.Link>
      </Nav></Col>
        
      </Row>
      
    </Container>
      
   
  );
};

export default Categories;
