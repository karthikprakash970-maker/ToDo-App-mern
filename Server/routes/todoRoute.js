const express = require('express')
const { 
    createTodoController, 
    getTodoController, 
    deleteTodoController, 
    updateTodoController 
} = require('../controllers/todoController');

const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router()

//create todo
router.post("/create",authMiddleware, createTodoController);

//GET TODO
router.post('/getAll/:userId',authMiddleware, getTodoController)

//DELETE TODO
router.delete('/delete/:id',authMiddleware, deleteTodoController)

//UPDATE TODO
router.patch('/update/:id',authMiddleware, updateTodoController)

module.exports = router;