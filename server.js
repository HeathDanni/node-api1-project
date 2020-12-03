const express = require("express")
const db = require("./database")
const server = express()
server.user(express.json())

server.get("/", (req, res) => {
    res.json({"message": "hello, world"})
})

server.get("/users", (req, res) => {
    const users = db.getUsers()
    res.json(users)
})

server.get("/users/:id", (req, res) => {
    const id = req.params.id
    const user = db.getUserById(id)
    if (user) {
        res.json(user)
    } else {
        res.status(404).json({
            message: 'user not found',
        })
    }

    res.json(newUser)
})

server.post("/users", (req, res) => {
    const newUser = db.createUser({
        name: "bob doe"
    })
})
server.listen(8080, () => {
    console.log("server is running")
})