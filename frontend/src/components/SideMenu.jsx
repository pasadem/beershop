import { Nav, Container,Row, Col, NavDropdown, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateCategory, updateProducer } from '../slices/categorySlice.js'

import React from "react";

const SideMenu = () => {

  const dispatch = useDispatch();
  return (
    <Navbar className="border-bottom  px-100px " sticky='top' >
      {/* <Row>
        <Col ><Nav className="py-2 px-4 link-dark width-500px bg-opacity-75">
        {/* <Nav.Link as={Link} to="/hops"  className="py-3 px-4 link-dark"> */}
         <Nav className="flex-column" sticky='top'>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title="Хміль"
              menuVariant="light"
              className=" mx-2 link-dark"
            >
              <NavDropdown.Item as={Link} to="/hops" onClick={() => dispatch(updateProducer(''))}>Всі виробники</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/hops" onClick={() => dispatch(updateProducer('Germany'))}>Німеччина</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/hops" onClick={() => dispatch(updateProducer('South Africa'))}>ПАР</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/hops" onClick={() => dispatch(updateProducer('Slovenia'))}>Словенія</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/hops" onClick={() => dispatch(updateProducer('Chech Republic'))}>Чехія</NavDropdown.Item>
            </NavDropdown>
      
       
            <NavDropdown
              id="nav-dropdown-dark-example"
              title="Дріжджі"
              menuVariant="light"
              className="mx-2 link-dark"
            >
              
              <NavDropdown.Item as={Link} to="/yeast" onClick={() => dispatch(updateProducer(''))}>Всі виробники</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/yeast" onClick={() => dispatch(updateProducer('Lallemand'))}>Lallemand</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/yeast" onClick={() => dispatch(updateProducer('Fermentis'))}>Fermentis</NavDropdown.Item>
              
            </NavDropdown>
       
        
            <NavDropdown
              id="nav-dropdown-dark-example"
              title="Солод"
              menuVariant="light"
              className="mx-2 link-dark"
            >
              
              <NavDropdown.Item as={Link} to="/hops">Німеччина</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">ПАР</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/hops">Словенія</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Чехія</NavDropdown.Item>
            </NavDropdown>
        <Nav.Link as={Link} to="/cart" className="mx-2 link-dark">
          Обладнання
        </Nav.Link>
        <Nav.Link as={Link} to="/cart" className="mx-2 link-dark">
          Інше
        </Nav.Link>
        <Nav.Link as={Link} to="/cart" className="mx-2 link-dark">
          Знижки
        </Nav.Link>
        <Nav.Link as={Link} to="/cart" className="mx-2 link-dark">
          Про нас
        </Nav.Link>
        <Nav.Link as={Link} to="/cart" className="mx-2 link-dark">
          Контакти
        </Nav.Link>
      </Nav>
        
    
      
    </Navbar>
      
   
  );
};

export default SideMenu;
