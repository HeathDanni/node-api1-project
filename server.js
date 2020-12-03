const express = require("express")
const db = require("./database")

const server = express()
server.use(express.json())

server.get("/", (req, res) => {
    res.json({"message": "hello, world"})
})

server.get("/api/users", (req, res) => {
    const users = db.getUsers()
    res.json(users)
})

server.get("/api/users/:id", (req, res) => {
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

server.post("/api/users", (req, res) => {
    if (!req.body.name) {
        return res.status(400).json({
            message: "name is required"
        })
    }
    const newUser = db.createUser({
        name: req.body.name,
    })

    res.json(newUser)
})

server.put("/api/users/:id", (req, res) => {
    const user = db.getUserById(req.params.id)

    if (user) {
        const updatedUser = db.updateUser(user.id, {
            name: req.body.name || user.name,
        })
        res.json(updatedUser)
    } else {
        res.status(404).json({
            message: "User not found",
        })
    }
})

server.delete("/api/users/:id", (req, res) => {
    const user = db.getUserById(req.params.id)

    if (user) {
        db.deleteUser(user.id)
        res.status(204).end()
    } else {
        res.status(404).json({
            message: "user not found"
        })
    }
})

server.listen(8080, () => {
    console.log("server is running")
})