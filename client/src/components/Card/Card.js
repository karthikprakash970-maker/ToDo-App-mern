import React, { useState } from "react";
import EditTodo from "../EditTodo";
import TodoServices from "../../Services/TodoServices";
import toast from "react-hot-toast";

const Card = ({ allTask, getUserTask }) => {
  const [selectedTask, setSelectedTask] = useState(null);

  // Handle Edit
  const handleEdit = (task) => {
    setSelectedTask(task);
  };

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      await TodoServices.deleteTodo(id);
      toast.success("Task Deleted Successfully");
      getUserTask();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete task");
    }
  };

  return (
    <>
      <div className="card-container">
        {allTask?.map((task) => (
          <div
            className="card border-primary mb-3"
            style={{ maxWidth: "18rem" }}
            key={task._id}
          >
            <div className="card-header">
              <div className="chead">
                <h6 style={{ fontWeight: "bold" }}>
                  {task.title.substring(0, 10)}
                </h6>

                <h6 className={task.isCompleted ? "task-cmp" : "task-inc"}>
                  {task.isCompleted ? "Completed" : "Incomplete"}
                </h6>
              </div>
            </div>

            <div className="card-body">
              <h6>{task.title}</h6>
              <p className="card-text">{task.description}</p>
              <h6>Date: {task.createdAt?.substring(0, 10)}</h6>
            </div>

            <div className="card-footer bg-transparent border-primary">
              <button
                className="btn btn-warning"
                title="Edit Task"
                onClick={() => handleEdit(task)}
              >
                <i className="fa-solid fa-pen-to-square"></i>
              </button>

              <button
                className="btn btn-danger ms-2"
                title="Delete Task"
                onClick={() => handleDelete(task._id)}
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Render only one EditTodo modal */}
      {selectedTask && (
        <EditTodo
          task={selectedTask}
          setShowModal={() => setSelectedTask(null)}
          getUserTask={getUserTask}
        />
      )}
    </>
  );
};

export default Card;