import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import data from './pages/productData';
import styled, {keyframes} from 'styled-components';

import About from './pages/About';
import Detail from './pages/Detail';
import Cart from './pages/Cart';

import {Container, Nav, Navbar, Row, Col} from 'react-bootstrap';
import {Routes, Route, Link, useNavigate} from 'react-router-dom';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addItem} from './pages/store';

const Wrap = styled.div`
    width: 1300px;
    margin: 0 auto;
`;

const TextBox = styled.div`
    background-color: #f8f8f8;
`;

function App() {
    const navigate = useNavigate();
    const [bests] = useState(data);
    const state = useSelector((state) => state);
    const dispatch = useDispatch();

    return (
        <div className='App'>
            <Navbar bg='dark' data-bs-theme='dark'>
                <Container>
                    <Navbar.Brand
                        onClick={() => {
                            navigate('/');
                        }}
                    >
                        Samjin_Shop
                    </Navbar.Brand>

                    <Nav className='me-auto'>
                        <Nav.Link
                            onClick={() => {
                                navigate('/');
                            }}
                        >
                            Home
                        </Nav.Link>

                        <Nav.Link
                            onClick={() => {
                                navigate('/about');
                            }}
                        >
                            About
                        </Nav.Link>

                        <Nav.Link
                            onClick={() => {
                                navigate('/about/info');
                            }}
                        >
                            Infomation
                        </Nav.Link>

                        <Nav.Link
                            onClick={() => {
                                navigate('/cart');
                            }}
                        >
                            Cart
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            <Routes>
                <Route
                    path='/'
                    element={
                        <Wrap>
                            <img src={process.env.PUBLIC_URL + '/images/visual_main_01.jpg'} alt='vm' style={{display: 'block', width: '100%'}} />
                            <h2 style={{padding: 50}}>BEST 상품</h2>
                            <Row>
                                {bests.map((best, index) => {
                                    return (
                                        <Col>
                                            <Link
                                                to={`detail/${index}`}
                                                style={{
                                                    textDecoration: 'none',
                                                    color: '#222',
                                                    display: 'block',
                                                    width: 280,
                                                    margin: '0 auto',
                                                    boxShadow: 'rgba(0,0,0,0.1) 3px 3px 14px',
                                                }}
                                            >
                                                <img src={best.image} alt='product_img' style={{width: 280}}></img>
                                                <TextBox>
                                                    <h4 style={{fontSize: 18, paddingTop: 10}}>{best.title}</h4>
                                                    <p
                                                        style={{
                                                            fontSize: 14,
                                                            margin: '10px 0',
                                                        }}
                                                    >
                                                        {best.desc}
                                                    </p>
                                                    <p>{best.price}</p>
                                                </TextBox>
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    dispatch(addItem({id: best.id, title: best.title, count: 1}));
                                                }}
                                            >
                                                장바구니
                                            </button>
                                        </Col>
                                    );
                                })}
                            </Row>
                        </Wrap>
                    }
                />
                <Route path='/' element={<div>hompage</div>}></Route>
                <Route path='about' element={<About />}>
                    <Route path='info' element={<div>Infomation</div>} />
                </Route>
                <Route path='detail/:id' element={<Detail bests={bests} />} />
                <Route path='cart' element={<Cart />} />
            </Routes>
        </div>
    );
}

export default App;
