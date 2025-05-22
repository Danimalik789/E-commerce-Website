import bcrypt from "bcryptjs"

const users = [
  {
    name: "Admin user",
    email: "Admin@gmail.com",
    password: bcrypt.hashSync("admin", 10),
    isAdmin: true,
  },
  {
    name: "John Doe",
    email: "John@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Jane Doe",
    email: "jane@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Danyal Malik",
    email: "danyalmalik789@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
]

export default users
