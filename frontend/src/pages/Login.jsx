// src/pages/Login.js
import React, { useState, useContext } from 'react';
//import { AuthContext } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
 import LoginValidation from './LoginValidation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Toast } from "flowbite-react";
import { Alert } from "flowbite-react";
import {Badge } from "flowbite-react";
import { HiCheck, HiExclamation, HiX } from "react-icons/hi";


const Login = () => {
  
  const navigate = useNavigate();
  
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    setValues(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };


  const [alertInfo, setAlertInfo] = useState({
    show: false,
    color: 'danger',
    message: ''
  });



axios.defaults.withCredentials=true;

  const handleSubmit = (event) => {
    event.preventDefault();
 
    console.log("Register button clicked");
    console.log("Values to be sent:", values);
  //  toast.info("Register button clicked. Processing registration...");
 
 const lv=LoginValidation(values);
setErrors(lv);
console.log(errors);
if (Object.keys(lv).length === 0) {
    axios.post('http://localhost:8084/login', values)
      .then(res => {
        if (res.data.Login) {
          // Navigate to the home page upon successful login
        
  
          // Show success alert
          setAlertInfo({
            show: true,
            color: 'success',
            message: 'Login successful!'
          });

          navigate('/home');

        } else {
          // Show error alert if the response is not "Success"
          setAlertInfo({
            show: true,
            color: 'error',
            message: res.data.message
          });
        }
      })
      .catch(err => {
        // Handle and show the error if there's an issue with the request
        console.log(err);
        setAlertInfo({
          show: true,
          color: 'error',
          message: `Error: ${err.message}`
        });
 });

} else {
  console.log("Validation errors:", lv);
}


  };
  

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
    <form className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Login</h2>
     
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
  
      <input
        type="email"
        name="email"
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Email"
        value={values.email}
        onChange={handleChange}
        required
      />  
    {errors.email && <span className="text-danger">{errors.email}</span>}
 
       </div>
         <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        value={values.password}
        onChange={handleChange}
        required
      />  {errors.password&& <span className="text-danger">{errors.password}</span>}

 </div>
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-300">
      Login
      </button>
      <p className="text-center mt-4">
          Don't have an account? 
          <Link to="/register" className="text-blue-500 hover:underline ml-2">Sign up</Link>
        </p>
    </form>


    {alertInfo.show && (
        <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg ${alertInfo.color === 'success' ? 'bg-green-500' :'bg-red-500' } text-white`}>
          <div className="flex items-center">
            {alertInfo.color === 'success' && <HiCheck className="h-5 w-5" />}
            {alertInfo.color === 'red' && <HiX className="h-5 w-5" />}
         
            <span className="ml-3 text-sm">{alertInfo.message}</span>
          </div>
          <button className="absolute top-2 right-2 text-white" onClick={() => setAlertInfo({ ...alertInfo, show: false })}>×</button>
        </div>
      )}




    </div>
  );
};

export default Login;