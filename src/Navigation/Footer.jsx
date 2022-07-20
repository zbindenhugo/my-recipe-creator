import './Footer.css';

import { Container, Navbar, Nav } from 'react-bootstrap';

function Footer () {

    return(
        <Container fluid style={{textAlign: 'content'}}>
            <Navbar fixed='bottom'>
                <Container fluid id='navbar-container'>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Item>Ce site a été réalisé par Hugo ZBINDEN. | © Hugo Zbinden | © CRECIPE all rights reserved</Nav.Item>
                    </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>
        </Container>
    )
}

export default Footer;