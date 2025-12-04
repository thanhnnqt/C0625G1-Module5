import { Routes, Route } from 'react-router-dom'
import { Link } from "react-router-dom";
import './App.css'
import ListPlayerComponent from "./assets/component/ListPlayerComponent.jsx";
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.js"
import AddPlayerComponent from "./assets/component/AddPlayerComponent.jsx";
import DetailPlayerComponent from "./assets/component/DetailPlayerComponent.jsx";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
        {/*<nav>*/}
        {/*    <ul>*/}
        {/*        <li>*/}
        {/*            <Link to="/" ><button>Danh sách</button></Link>*/}
        {/*        </li>*/}
        {/*        <li>*/}
        {/*            <Link to="/add" ><button>Thêm mới</button></Link>*/}
        {/*        </li>*/}
        {/*    </ul>*/}
        {/*</nav>*/}
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand ><Link to="/" >Danh sách</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Tin tức</Nav.Link>
                        <Nav.Link href="#link">Thị trường</Nav.Link>
                        <NavDropdown title="Hành động" id="basic-nav-dropdown">
                            <NavDropdown.Item><Link to="/" >Danh sách</Link></NavDropdown.Item>
                            <NavDropdown.Item>
                                <Link to="/add" >Thêm mới</Link>
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <Routes>
            <Route path="/" element={<ListPlayerComponent />} />
            <Route path="/add" element={<AddPlayerComponent />} />
            <Route path="/" element={<ListPlayerComponent />} />
            <Route path="/detail/:id" element={<DetailPlayerComponent />} />
        </Routes>
            <ToastContainer/>
    </>
  )
}

export default App
