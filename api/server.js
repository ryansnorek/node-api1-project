const express = require('express');
const Users = require('./users/model');

const server = express();

server.use(express.json());

// POST	/api/users
server.post('/api/users', async (req, res) => {
    try {
        if (!req.body.name || !req.body.bio) {
            res.status(400).json({ 
                message: "Please provide name and bio for the user"
            })
        }
        else {
            const newUser = await Users.insert(req.body);
            res.status(201).json(newUser);
        }

    }   catch (err) {
        res.status(500).json({
            message: "There was an error while saving the user to the database",
            error: err.message
        })
    }
})
// GET	/api/users
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
// GET	/api/users/:id
server.get('/api/users/:id', async (req, res) => {
    try {
        if (!req.body.name) {
            res.status(404).json({
                message: "The user with the specified ID does not exist"
            })
        }
        else {
            const user = await Users.findById(req.params.id);
            res.json(user);
        }
    } catch (err) {
        res.status(500).json({
            message: "The user information could not be retrieved",
            error: err.message
        });
    }
})
// DELETE	/api/users/:id
server.delete('/api/users/:id', async (req, res) => {
    try {
        const deleteUser = await Users.remove(req.body);

    } catch (err) {
        res.status(500).json({
            message: "you broke it",
            error: err.message
        })
    }
})
// PUT	/api/users/:id


// {
//     id: "a_unique_id", // String, required
//     name: "Jane Doe",  // String, required
//     bio: "Having fun", // String, required
//   }

module.exports = server;
