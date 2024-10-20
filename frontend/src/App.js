import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container,Row, Col } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { logout } from './slices/authSlice';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Categories from './components/Categories';
import SideMenu from './components/SideMenu';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const expirationTime = localStorage.getItem('expirationTime');
    if (expirationTime) {
      const currentTime = new Date().getTime();

      if (currentTime > expirationTime) {
        dispatch(logout());
      }
    }
  }, [dispatch]);

  return (
    <>
      <ToastContainer />
      <Header />
      <Categories />
      
      <Row>
      
        <Col sm={2} className='py-3 px-5'>
        <SideMenu />
        </Col>
      
      <Col sm={9}>
      <main className='py-3'>
        <Container>
          <Outlet />
        </Container>
      </main>
      </Col>
      </Row>
      
      
      <Footer />
    </>
  );
};

export default App;