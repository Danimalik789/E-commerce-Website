import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { Col, Row } from "react-bootstrap"
import { listProducts } from "../actions/productActions"
import Loader from "../components/Loader"
import Message from "../components/Message"
import Product from "../components/Product"
import Paginate from "../components/Paginate"
import ProductCarousel from "../components/ProductCarousel"

const HomeScreen = () => {
  const { keyword } = useParams()
  const { pageNumber } = useParams() || 1
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, pages, page } = productList

  return (
    <>
      {!keyword && <ProductCarousel />}
      <h1 style={{ color: "white" }}>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products &&
              Array.isArray(products) &&
              products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  )
}

export default HomeScreen
