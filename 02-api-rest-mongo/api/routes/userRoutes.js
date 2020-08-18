const express = require('express');
const router = express.Router();
const { getAllUsers, newUser, getUser, updateUser, deleteUser } = require('../controller/userController');

router
    .get('/', getAllUsers)
    .post('/', newUser)
    .get('/:id', getUser)
    .put('/:id', updateUser)
    .delete('/:id', deleteUser)


module.exports = router;