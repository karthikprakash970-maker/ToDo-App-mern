import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "./AuthStyle.css";
import toast from 'react-hot-toast';
import AuthServices from '../../Services/AuthServices';
import { getErrorMessage } from "../../Utils/ErrorMessage"

const Register = () => {
  const [username, setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const navigate = useNavigate()
    
    //register function
    const registereHandler = async (e) =>{
      try{
      e.preventDefault()
      const data ={username,email,password}
      const res = await AuthServices.registerUser(data)
      toast.success(res.data.message);
      navigate("/login");
      console.log(res.data)
      
    } catch (err){
      toast.error(getErrorMessage(err));
      console.log(err)}
    }

  return (
    <div className='form-container'>

      <div className='form'>

        <div className='mb-3'>
          <i className='fa-solid fa-circle-user'></i>
        </div>

        <div className='mb-3'>
          <input type="text" 
          className='form-control' 
          placeholder='Enter username' 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className='mb-3'>
          <input type="email" 
          className='form-control' 
          placeholder='Enter email' 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='mb-3'>
          <input type="password" 
          className='form-control' 
          placeholder='Enter password' 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className='form-bottom'>
          <p className='text-center'>
            already user? please
            <Link to="/login">Login</Link>
          </p>
          <button type='submit' className='login-btn' onClick={registereHandler}>
            Register
          </button>
        </div>
      </div>
    </div>
  )
}

export default Register
