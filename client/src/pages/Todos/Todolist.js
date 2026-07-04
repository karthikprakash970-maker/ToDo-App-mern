import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Layout/Navbar'
import TodoServices from '../../Services/TodoServices';
import Spinner from '../../components/Spinner';

const TodoList = () => {
  const [ todoStatus, setTodosStatus ] = useState('');
  const [ filterdTask,setFilteredTask ] = useState([]);
  const [loading, setLoading]=useState(false)
  const [allTask, setAllTask] =useState([]);

  //Get usertodos
  const userData = JSON.parse(localStorage.getItem('todoapp'))
    const id = userData?.user?._id;
    const getUserTask = async () =>{
      setLoading(true)
      try{
        const { data } = await TodoServices.getAllTodo(id);
        setLoading(false)
        console.log(data);
        setAllTask(data?.todos);

      } catch(error){
        setLoading(false)
        console.log(error)
      }
    };

  useEffect(() =>{
    const incomplete = allTask?.filter(item => item?.isCompleted === false)
    const completed = allTask?.filter(item => item?.isCompleted === true)
    if (todoStatus === 'incomplete') {
      setFilteredTask(incomplete);
    } else if(todoStatus === 'completed') {
      setFilteredTask(completed);
    }
    getUserTask();
  }, [todoStatus]);

  return (
    <>
      <Navbar />
      <div className="filter-container">
        <h4>Filter Todos by :</h4>
        <div className='filter-group'>
          <select className='form-select' onChange={(e) => setTodosStatus(e.target.value) }>
            <option selected>Select Status</option>
            <option value="incomplete">incomplete</option> 
            <option value="completed">complete</option> 
          </select>
        </div>
      </div>
      {/* ***** */}
      {loading && <Spinner/>}
      <div className="card-container">
        {filterdTask?.length ===0 ? <h1>No tasks found</h1> : filterdTask?.map((task,i) => (
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
        ))}
      </div>
    </>
  );
};

export default TodoList;
