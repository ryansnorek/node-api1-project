const express = require('express');
const Users = require('./users/model');

const server = express();

server.use(express.json());

// INSERT NEW USER
server.post('/api/users', async (req, res) => {
    if (!req.body.name || !req.body.bio) {
        return res.status(400).json({ 
            message: "Please provide name and bio for the user"
        });
    }
    try {
        const newUser = await Users.insert(req.body);
        res.status(201).json(newUser);
    } catch (e) {
        res.status(500).json({
            message: "There was an error while saving the user to the database",
            error: e.message
        });
    }
})
// GET ALL USERS //
server.get('/api/users', async (req, res) => {
    try {
        const users = await Users.find();
        res.json(users);
    } catch (e) {
        res.status(500).json({
            message: "The users information could not be retrieved",
            error: e.message
        });
    }
})
// GET USER BY ID //
server.get('/api/users/:id', async (req, res) => {
    try {
        const user = await Users.findById(req.params.id);

        if (user) return res.json(user);

        return res.status(404).json({
            message: "The user with the specified ID does not exist"
        });
    } catch (e) {
        res.status(500).json({
            message: "The user information could not be retrieved",
            error: e.message
        });
    }
})
// REMOVE USER //
server.delete('/api/users/:id', async (req, res) => {
    try {
        const userExists = await Users.findById(req.params.id);
        if (userExists) {
            const deleteUser = await Users.remove(req.params.id);
            return res.json(deleteUser);
        }
        return res.status(404).json({
            message: "The user with the specified ID does not exist"
        });
    } catch (e) {
        res.status(500).json({
            message: "The user could not be removed",
            error: e.message
        });
    }
})
// UPDATE USER //
server.put('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    const { body } = req;

    if (!body.name || !body.bio) {
        return res.status(400).json({
            message: "Please provide name and bio for the user"
        });
    }
    try {
        const updatedUser = await Users.update(id, body);

        if (updatedUser) return res.json(updatedUser);
        
        return res.status(404).json({
            message: "The user with the specified ID does not exist"
        });
    } catch (e) {
            res.status(500).json({
            message: "The user information could not be modified",
            error: e.message
        });
    }
})

module.exports = server;
