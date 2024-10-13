import { Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

import React from "react";

const Categories = () => {
  return (
    
      <Nav className=" ms-auto sticky-top border-bottom  px-4 bg-white bg-opacity-75">
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
      </Nav>
   
  );
};

export default Categories;
