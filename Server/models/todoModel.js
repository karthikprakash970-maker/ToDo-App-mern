const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    isCompleted:{
        type:Boolean,
        required:true,
        default:false
    },
    createdBy:{
        ref:"users",
        type:mongoose.Schema.ObjectId,
    }
},{timestamps:true});

const todoModel = mongoose.model('todo',todoSchema);

module.exports = todoModel;