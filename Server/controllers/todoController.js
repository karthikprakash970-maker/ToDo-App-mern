const todoModel = require("../models/todoModel");

const createTodoController = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).send({
                success: false,
                message: "Please provide title and description",
            });
        }

        const todo = new todoModel({
            title,
            description,
            createdBy: req.user.id,
        });

        const result = await todo.save();

        res.status(201).send({
            success: true,
            message: "Your task has been created",
            result,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in create todo API",
            error: error.message,
        });
    }
};

//GET TODO
const getTodoController = async (req, res) => {
    try {
        const userId = req.user.id;
        const todos = await todoModel.find({
            createdBy: userId
        });
        res.status(200).send({
            success: true,
            message: "Your Todos",
            todos
        });

    } catch (error) {
        console.log(error);

        res.status(500).send({
            success: false,
            message: "Error in get todo API",
            error: error.message
        });
    }
};

//delete api
const deleteTodoController = async(req,res) =>{
    try{
        const { id } =req.params;
        if(!id){
            return res.status(404).send({
                success:false,
                message:"No todo found with this id"
            });
        };
    //find id
    const todo = await todoModel.findByIdAndDelete({_id:id})
    if(!todo){
        return res.status(404).send({
                success:false,
                message:"No task found"
            });
    };

    res.status(200).send({
        success:true,
        message:"Your Task has been Deleted",
    });
    } catch(error){
        res.status(500).send({
            success:false,
            error,
            message: "error in delete todo api",
            
        });
    };

};

//Update todo
const updateTodoController = async (req,res) =>{
    try{
        const {id} =req.params
        if(!id){
            return res.status(404).send({
                success:false,
                message:"please provide todo id"
            });
        };
        const data = req.body
        //update
        const todo = await todoModel.findByIdAndUpdate(id,{$set:data},{returnOriginal:false})
        res.status(200).send({
            success:true,
            message:"Your Task has been Updated",
        });

    } catch(error){
        res.status(500).send({
            success:false,
            error,
            message: "error in update todo api",
        });
    }
};
module.exports = {
    createTodoController,
    getTodoController, 
    deleteTodoController,
    updateTodoController
};