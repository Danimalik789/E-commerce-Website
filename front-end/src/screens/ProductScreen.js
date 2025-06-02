import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  getProductDetails,
  createProductReview,
} from "../actions/productActions"
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
  Form,
} from "react-bootstrap"
import { Link, useNavigate, useParams } from "react-router-dom"
import Rating from "../components/Rating"
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants"
import Message from "../components/Message"
import Loader from "../components/Loader"

const ProductScreen = () => {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const { id } = useParams()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productCreateReview = useSelector((state) => state.productCreateReview)
  const { success: successProductReview, error: errorProductReview } =
    productCreateReview

  useEffect(() => {
    dispatch(getProductDetails(id))
  }, [dispatch, id])

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`)
  }
  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>

      <Row>
        <Col md={5}>
          <Image src={product.image} alt={product.name} fluid></Image>
        </Col>
        <Col md={4}>
          <ListGroup variant='flush'>
            <ListGroupItem>
              <h3>{product.name}</h3>
            </ListGroupItem>
            <ListGroupItem>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroupItem>
            <ListGroupItem>Price: ${product.price}</ListGroupItem>
            <ListGroupItem>Description: {product.description}</ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroupItem>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    <strong>
                      {product.countInStock > 0 ? "In Stock" : "Out of stock "}
                    </strong>
                  </Col>
                </Row>
              </ListGroupItem>
              {product.countInStock > 0 && (
                <ListGroupItem>
                  <Row>
                    <Col>Qty</Col>
                    <Col>
                      <Form.Control
                        as='select'
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroupItem>
              )}
              <ListGroupItem>
                <Button
                  onClick={addToCartHandler}
                  className='w-100'
                  type='button'
                  disabled={product.countInStock === 0}
                >
                  {" "}
                  Add To Cart
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <h2>Reviews</h2>
          {product.reviews.length === 0 && <Message>No Reviews</Message>}
          <ListGroup variant='flush'>
            {product.reviews.map((review) => (
              <ListGroupItem key={review._id}>
                <strong>{review.name}</strong>
                <Rating value={review.rating} />
                <p>{review.createdAt.substring(0, 10)}</p>
                <p>{review.comment}</p>
              </ListGroupItem>
            ))}
            <ListGroupItem>
              <h2>Write a Customer Review</h2>
              {userInfo ? (
                <h1> write a review</h1>
              ) : (
                <Message>
                  Please <Link to='/login'>sign in</Link>to write a review
                </Message>
              )}
            </ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
    </>
  )
}

export default ProductScreen
