import React ,{useState} from 'react'
import { FaBars, FaBell, FaSearch, FaUserCircle } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Routes,
  Route,
Link 
} from "react-router-dom";

const Headeru = ({ sidebarToggle, setSidebarToggle,id }) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate(); 
  const handleDelete3 = () => {
    axios.get('http://localhost:8084/logout', { withCredentials: true })
      .then(res => {
        console.log('Logged out successfully');
        // Optionally reload or navigate to another page
        navigate('/login'); // Redirect to login page after logout
      })
      .catch(err => {
        console.error('Error logging out:', err);
      });
  };

  return (
    <>  
  

  <nav className='bg-gray-800 py-3 flex justify-between'>
      <div className='flex items-center text-xl'>
        <FaBars 
          className='text-white me-4 cursor-pointer' 
          onClick={() => setSidebarToggle(!sidebarToggle)} 
        />
        <span className='text-white font-semibold'>Event management</span>
      </div>
      <div className='flex  items-center justify-center gap-x-5'>
        <div className='relative md:w-66'>
          <span className='relative md:absolute inset-y-0 left-0  flex flex-row items-center pl-2'>
            <button className='p-1 focus:outline-none text-black md:text-black'>
            <FaSearch/></button>
          </span>
          <input 
        id="myInput" // Adding an id to the input field
        name="myInputName" // Adding a name to the input field
        type="text" 
        className="w-full px-4 py-1 text-black pl-12 rounded shadow outline-none md:block"
        value={inputValue} // Controlled input field value from state
        onChange={(e) => setInputValue(e.target.value)} // Update state on user input
      />
        </div>
        <div className='text-white'><FaBell className='w-6 h-6'/></div>
        <div className='relative flex flex-row items-center '>
      <button
        className='text-white'
        onClick={() => setSearchVisible(!searchVisible)}
      >
        <FaUserCircle className='mt-1 w-6 h-6' />
      </button>
      <ul
              className={`py-2 text-sm text-gray-100 bg-gray-900 top-10 rounded-lg shadow-lg w-32 absolute right-0 z-50 transition-all duration-300 ease-out ${
                searchVisible ? 'block' : 'hidden'
              }`}
            >
   {/*   <ul className="py-2 text-sm text-gray-950">
       Dropdown Menu
      <div
        className={`z-50 bg-white top-10 rounded-lg shadow-lg w-32 absolute right-0 transition-all duration-300 ease-out ${
          searchVisible ? 'block' : 'hidden'
        }`}
      > */}
          <li className="bg-gray-900  text-gray-900 py-2 cursor-pointer">
          <Link to={`/home/updateprofile/${id}`} className="text-white" style={{ textDecoration: 'none' }}>
            Profile
          </Link>
            </li>
          <li className="bg-gray-900 py-2 cursor-pointer"> <Link to={`/home/updateprofile/${id}`} className="text-white" style={{ textDecoration: 'none' }}>
        Settings
          </Link>
         </li>
          <li className="bg-gray-900 py-2 cursor-pointer">
         <button className="text-white" onClick={handleDelete3}>
                  Logout
                </button>
          </li>
            </ul>
     
    </div>

      </div>
    </nav>
  
    </>
  )
}

export default Headeru
/*    




<div className='relative'> 
  <button className=' text-white ' onClick={() => setSearchVisible(!searchVisible)}>
        <FaUserCircle className='mt-1 w-6 h-6'/>
        <div className={`z-10 bg-white top-8 rounded-lg shadow w-32 absolute right-0 transition-all duration-300 ${searchVisible ? 'block' : 'hidden'}`}>
<ul className="py-2 text-sm text-gray-950"><li> <a href="">
              Profile
            </a></li>
            <li> <a href="">
              Setting
            </a></li>

<li> <a href="">
           Logout
            </a></li></ul>

        </div></button></div>














<nav className='bg-gray-800 py-3 flex justify-between'>
      <div className='flex items-center text-xl'>
        <FaBars 
          className='text-white me-4 cursor-pointer' 
          onClick={() => setSidebarToggle(!sidebarToggle)} 
        />
        <span className='text-white font-semibold'>E-commerce</span>
      </div>
      <div className='flex items-center gap-x-5'>
        <div className='relative w-65'>
          <span className='relative md:absolute inset-y-0 left-0 flex items-center pl-2'>
            <button className='p-1 focus:outline-none text-white md:text-black'>
            <FaSearch className='text-white me-1'/></button>
          </span>
          <input 
            type='text' 
            className='w-full px-4 pl-12 rounded shadow outline-none hidden'
          />
        </div>
        <div className='text-white'><FaBell className='w-6 h-6'/></div>

<div className='relative'> <button 
  className='p-1 focus:outline-none group
   text-white md:text-black' onClick={() => setSearchVisible(!searchVisible)}
>
        <FaUserCircle className='mt-1 w-6 h-6'/>
<div className='z-10 hidden bg-white absolute rounded-lg shadow w-32 group-focus:block top-full right-0'></div>
<ul className="py-2 text-sm text-gray-900"><li> <a href="">
              Profile
            </a></li>
            <li> <a href="">
              Setting
            </a></li>

<li> <a href="">
           Logout
            </a></li></ul>

        </button></div>
      </div>
    </nav>*/