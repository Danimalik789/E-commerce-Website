import React from "react"
import { Link } from "react-router-dom"
import { Container, Nav, Navbar } from "react-bootstrap"

const Header = () => {
  return (
    <header>
      <Navbar
        expand='lg'
        variant='white'
        collapseOnSelect
        className='bg-success'
      >
        <Container>
          <Navbar.Brand as={Link} to='/'>
            ProShop
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <Nav.Link as={Link} to='/cart'>
                {" "}
                <i className='fas fa-shopping-cart' />
                Cart{" "}
              </Nav.Link>
              <Nav.Link as={Link} to='/login'>
                <i className='fas fa-user' />
                Sign in
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
