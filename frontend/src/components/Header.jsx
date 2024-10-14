import {
  Navbar,
  Nav,
  Col, 
  Row,
  Container,
  NavDropdown,
  Image,
  Badge,
} from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import SearchBox from "./SearchBox";
import logo from "../assets/logo.png";
import { resetCart } from "../slices/cartSlice";

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      // NOTE: here we need to reset cart state for when a user logs out so the next
      // user doesn't inherit the previous users cart and shipping
      dispatch(resetCart());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className="border-bottom">
      <Navbar bg="white" variant="light" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand as={Link} to="/">
            <Image src={logo} alt="BeerSystem" width="80" height="80" />
            <b className="text-black">BEER</b>SYSTEM
            
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
         
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Col className="ms-auto px-5">
                <Row>
                phone: +38 12 345 67 89
        
                </Row>
                <Row>
                email: beersystem@email.com
                </Row>
              </Col>
              <SearchBox />
              <Nav.Link as={Link} to="/cart">
                <FaShoppingCart /> Корзина
                {cartItems.length > 0 && (
                  <Badge pill bg="success" style={{ marginLeft: "5px" }}>
                    {cartItems.reduce((a, c) => a + c.qty, 0)}
                  </Badge>
                )}
              </Nav.Link>
              {userInfo ? (
                <>
                  <NavDropdown title={userInfo.name} id="username">
                    <NavDropdown.Item as={Link} to="/profile">
                      Профіль
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Вийти
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <Nav.Link as={Link} to="/login">
                  <FaUser /> Увійти
                </Nav.Link>
              )}

              {/* Admin Links */}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <NavDropdown.Item as={Link} to="/admin/productlist">
                    Товари
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/admin/orderlist">
                    Замовлення
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/admin/userlist">
                    Користувачі
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
