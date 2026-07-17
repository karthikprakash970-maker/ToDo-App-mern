import React, { useState, useEffect, useCallback } from "react";
import Navbar from "../../components/Layout/Navbar";
import TodoServices from "../../Services/TodoServices";
import Spinner from "../../components/Spinner";

const TodoList = () => {
  const [todoStatus, setTodosStatus] = useState("");
  const [filteredTask, setFilteredTask] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allTask, setAllTask] = useState([]);

  const userData = JSON.parse(localStorage.getItem("todoapp"));
  const id = userData?.user?._id;

  // Get user todos
  const getUserTask = useCallback(async () => {
    if (!id) return;

    setLoading(true);
    try {
      const { data } = await TodoServices.getAllTodo(id);
      setAllTask(data?.todos || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  // Fetch todos once
  useEffect(() => {
    getUserTask();
  }, [getUserTask]);

  // Filter todos
  useEffect(() => {
    if (todoStatus === "incomplete") {
      setFilteredTask(
        allTask.filter((item) => item.isCompleted === false)
      );
    } else if (todoStatus === "completed") {
      setFilteredTask(
        allTask.filter((item) => item.isCompleted === true)
      );
    } else {
      setFilteredTask(allTask);
    }
  }, [todoStatus, allTask]);

  return (
    <>
      <Navbar />

      <div className="filter-container">
        <h4>Filter Todos by :</h4>

        <div className="filter-group">
          <select
            className="form-select"
            value={todoStatus}
            onChange={(e) => setTodosStatus(e.target.value)}
          >
            <option value="">Select Status</option>
            <option value="incomplete">Incomplete</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {loading && <Spinner />}

      <div className="card-container">
        {filteredTask.length === 0 ? (
          <h1>No tasks found</h1>
        ) : (
          filteredTask.map((task) => (
            <div
              className="card border-primary mb-3 mt-3"
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
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default TodoList;