import React, { useEffect } from "react"
import { Table, Button } from "react-bootstrap"
import { Link, useNavigate } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../components/Loader"
import Message from "../components/Message"
import { listUsers } from "../actions/userActions"

const UserListScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userList = useSelector((state) => state.userList)
  const { loading, error, users } = userList

  useEffect(() => {
    dispatch(listUsers())
  }, [dispatch])

  const deleteHandler = (id) => {
    console.log("delete")
  }

  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : users && users.length > 0 ? (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className='fas fa-check' style={{ color: "green" }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <Link
                    to={`/user/${user._id}/edit`}
                    className='btn-sm'
                    variant='light'
                  >
                    <i className='fas fa-edit'></i>
                  </Link>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Message> No users Found</Message>
      )}
    </>
  )
}

export default UserListScreen
