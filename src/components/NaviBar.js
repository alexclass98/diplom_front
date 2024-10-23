import React, {useState} from "react";
import {Navbar, Nav, Button, Container, Modal, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import styled from "styled-components";

const Styles = styled.div`
  a, .navbar-brand, .navbar-nav, .nav-link{
    color: #adb1b8;
    &:hover{
      color: white;
    }
  }
`
export default function NaviBar(){
    return(
        <>
            <Styles>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand> Эмулятор</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link><Link to="/">Главная</Link></Nav.Link>
                                <Nav.Link><Link to="/newtag">Метки</Link></Nav.Link>
                                <Nav.Link><Link to="/newreader">Считытыватели</Link></Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </Styles>
        </>
    )
}