import React,{useState,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';

const Navbar = () => {
    const [username, setUsername] = useState('')
    const navigate = useNavigate();

    const logOutHandler = () => {
        localStorage.removeItem('todoapp');
        toast.success("logout successfully")
        navigate('/login');
    }

    //get username
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('todoapp'));
        console.log('username data ===>' + userData && userData.user.username);
        setUsername(userData && userData.user.username)
    }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">

    <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" 
    data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" 
    aria-expanded="false" aria-label="Toggle navigation">

      <span className="navbar-toggler-icon" />
    </button>

    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
        <h4 className='navbar-brand'>
            <i className="fa-solid fa-user" />&nbsp;
            <i>Welcome </i>{username}
        </h4>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/home">
          Home
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/about">About</Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link active" to="/todoList">My todo List</Link>
        </li>
        <li className="nav-item">
          <button className="nav-link" title='logout' onClick={logOutHandler} >
            <i className="fa-solid fa-arrow-right-from-bracket fa-2x" />
          </button>
        </li>
      </ul>
    </div>
  </div>
</nav>


    </div>
  )
}

export default Navbar
