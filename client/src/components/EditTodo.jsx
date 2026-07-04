import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import TodoServices from '../Services/TodoServices';


const EditTodo = ({ task, setShowModal, getUserTask }) => {
    const [title,setTitle] = useState(task?.title);
    const [description, setDescription] = useState(task?.description);
    const [isCompleted, setIsCompleted] = useState(task?.isCompleted);

    const handleClose = () =>{
        setShowModal(false)
    }

    const handleSelectChange = (e) => {
    setIsCompleted(e.target.value === "true");
    }
    const id = task?._id
    //update
    const handleSubmit = async() =>{
        try{
            const userData = JSON.parse(localStorage.getItem('todoapp'))
            const createdBy = userData && userData.user.id;
            const data = { title, description, isCompleted };
            // if(!title || !description){
            //     return toast.error('please provide title or description')
            // }
            await TodoServices.updateTodo(id, data);
            setShowModal(false)
            toast.success("Task Updated Successfully");
            setTitle('');
            setDescription('');
            getUserTask();

        } catch(error){
            console.log(error)
            toast.error(error)
        }
        
    };
  return (
    <>
    {task && (

    
    <div className='modal' tabIndex="-1" role='dialog' style={{display:'block',backgroundColor:'rgba(0,0,0,0.5)'}}>
        <div className='modal-dialog' role='document'>
            <div className='modal-content'>
                <div className='modal-header'>
                    <h5 className='modal-title'>Update Your Task</h5>
                    <button
                      type="button" className="btn-close" 
                      aria-label="Close" onClick={handleClose}
                    ></button>
                </div>
                <div className='modal-body'>
                    <div className='mb-3'>
                        <label className='form-label'>Title</label>
                        <input type='text' className='form-control' 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className='form-floating'>
                        <textarea className='form-control' id='floatingTextarea' 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} ></textarea>
                        <label htmlFor='floatingTextarea'>Description</label>
                    </div>
                    <div className='my-3'>
                        <select className='form-select' onChange={handleSelectChange}>
                            <option selected>Select Status</option>
                            <option value={true}>Completed</option>
                            <option value={false}>Incomplete</option>
                        </select>
                    </div>
                </div>
                <div className='modal-footer'>
                    <button type='button' className='btn btn-secondary' 
                    onClick={handleClose}>
                    Close
                    </button>

                    <button type='button' className='btn btn-primary' 
                    onClick={handleSubmit}>
                    Update
                    </button>

                </div>
            </div>
        </div>
      
    </div>
    )}
    </>
  )
}


export default EditTodo
