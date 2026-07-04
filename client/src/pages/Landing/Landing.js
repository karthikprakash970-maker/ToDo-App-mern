import React from 'react'
import { Link } from 'react-router-dom';
import ToDoimage from '../../assets/images/ToDo_Image.jpg'
import "./Landing.css";

const Landing = () => {
  return (
    <div className='main'>
        <div className='intro-text'>
            <h1>
                <span className='tagline1'>Stay organized, stay productive.</span> <br/>
                <span className='tagline2'>Your tasks, simplified.</span>
            </h1>
            <p>
                A to-do app helps you manage your daily tasks in one simple place. <br/>
                Track your work easily so you can stay focused, organized, and get <br/>
                things done on time without missing anything important.
            </p>
            <Link className='btn red' to="/register">Register Now!</Link>
            <Link className='btn blue' to="/login">Login</Link>
        </div><br/>

        <div className=''>
            <img src={ToDoimage} alt='' width={'100%'} height={515}/>
        </div>
    </div>
  )
}

export default Landing