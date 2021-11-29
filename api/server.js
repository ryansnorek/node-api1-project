const express = require('express');
const Users = require('./users/model');

const server = express();

server.use(express.json());

// INSERT NEW USER
server.post('/api/users', async (req, res) => {
    try {
        if (!req.body.name || !req.body.bio) {
            res.status(400).json({ 
                message: "Please provide name and bio for the user"
            });
        }
        else {
            const newUser = await Users.insert(req.body);
            res.status(201).json(newUser);
        }

    }   catch (err) {
        res.status(500).json({
            message: "There was an error while saving the user to the database",
            error: err.message
        });
    }
})
// GET ALL USERS //
server.get('/api/users', async (req, res) => {
    try {
        const users = await Users.find();
        res.json(users);

    } catch (err) {
        res.status(500).json({
            message: "The users information could not be retrieved",
            error: err.message
        });
    }
})
// GET USER BY ID //
server.get('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await Users.findById(id);
        if (!user) {
            res.status(404).json({
                message: "The user with the specified ID does not exist"
            });
        }
        else {
            res.json(user);
        }
    } catch (err) {
        res.status(500).json({
            message: "The user information could not be retrieved",
            error: err.message
        });
    }
})
// REMOVE USER //
server.delete('/api/users/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deleteUser = await Users.remove(id);
        if (!deleteUser) {
            res.status(404).json({
                message: "The user with the specified ID does not exist"
            });
        }
        else {
            res.json(deleteUser);
        }

    } catch (err) {
        res.status(500).json({
            message: "The user could not be removed",
            error: err.message
        });
    }
})
// UPDATE USER //
server.put('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    const { body } = req;

    try {
        const updatedUser = await Users.update(id, body);
        if (!updatedUser) {
            res.status(404).json({
                message: "The user with the specified ID does not exist"
            });
        } 
        else if (!body.name || !body.bio) {
            res.status(400).json({
                message: "Please provide name and bio for the user"
            });
        }
        else {
            res.json(updatedUser);
        }
    } catch (err) {
            res.status(500).json({
            message: "The user information could not be modified",
            error: err.message
        });
    }
})

module.exports = server;
