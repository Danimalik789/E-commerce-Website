import React from "react"
import { Nav, NavItem } from "react-bootstrap"
import { Link } from "react-router-dom"

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className='justify-content-center mb-4'>
      <NavItem>
        {step1 ? (
          <Nav.Link as={Link} to='/login'>
            Sign In
          </Nav.Link>
        ) : (
          <Nav.Link disabled>Sign In</Nav.Link>
        )}
      </NavItem>

      <NavItem>
        {step2 ? (
          <Nav.Link as={Link} to='/shipping'>
            Shipping
          </Nav.Link>
        ) : (
          <Nav.Link disabled>Shipping</Nav.Link>
        )}
      </NavItem>

      <NavItem>
        {step3 ? (
          <Nav.Link as={Link} to='/payment'>
            Payment
          </Nav.Link>
        ) : (
          <Nav.Link disabled>Payment</Nav.Link>
        )}
      </NavItem>
      <NavItem>
        {step4 ? (
          <Nav.Link as={Link} to='/placeorder'>
            Place Order
          </Nav.Link>
        ) : (
          <Nav.Link disabled>Place Order</Nav.Link>
        )}
      </NavItem>
    </Nav>
  )
}

export default CheckoutSteps
