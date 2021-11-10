import * as React from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './navbar.css'

export default function navbar (props) {
    return (
        <Navbar bg="primary" variant="dark" >
            <Container>
                <Navbar.Brand href="#home">Distributed Tasks :)</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="list">Process List</Nav.Link>
                    <Nav.Link href="wizard">Create Process</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}