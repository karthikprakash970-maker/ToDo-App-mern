import React, { useEffect, useState, useCallback } from "react";
import Navbar from "../../components/Layout/Navbar";
import PopModel from "../../components/Layout/PopModel";
import TodoServices from "../../Services/TodoServices";
import Card from "../../components/Card/Card";
import Spinner from "../../components/Spinner";

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [allTask, setAllTask] = useState([]);

  // Handle modal
  const openModalHandler = () => {
    setShowModal(true);
  };

  // Get logged-in user
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

  // Search
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (!query) {
      getUserTask();
      return;
    }

    const filterList = allTask.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );

    setAllTask(filterList);
  };

  // Fetch todos on component mount
  useEffect(() => {
    getUserTask();
  }, [getUserTask]);

  return (
    <>
      <Navbar />

      <div className="container">
        <div className="add-task">
          <h1>Your Task</h1>

          <input
            type="search"
            placeholder="Search your task"
            value={searchQuery}
            onChange={handleSearch}
          />

          <button className="btn btn-primary" onClick={openModalHandler}>
            Create Task <i className="fa-solid fa-plus"></i>
          </button>
        </div>

        {loading ? (
          <Spinner />
        ) : (
          <Card allTask={allTask} getUserTask={getUserTask} />
        )}

        <PopModel
          showModal={showModal}
          setShowModal={setShowModal}
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          getUserTask={getUserTask}
        />
      </div>
    </>
  );
};

export default HomePage;