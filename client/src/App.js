import './App.css';
import {Routes, Route} from 'react-router-dom';
import Landing from './pages/Landing/Landing';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import About from './pages/About/About';
import Todolist from './pages/Todos/Todolist';
import {Toaster} from 'react-hot-toast';
import HomePage from './pages/Home/HomePage';

function App() {
  return (
    <div >
      
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/todoList" element={<Todolist />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
