const express = require("express")
const db = require("./database")
const server = express()
server.use(express.json())

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
})

server.post("/users", (req, res) => {
    if (!res.body.name) {
        return res.status(401).json({
            message: "Need a user name"
        })
    }
    
    const newUser = db.createUser({
        name: req.body.name
    })

    res.json(newUser)
})
server.listen(8080, () => {
    console.log("server is running")
})