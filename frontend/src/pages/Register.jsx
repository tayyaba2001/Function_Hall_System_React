import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Toast } from "flowbite-react";
import { Alert } from "flowbite-react";
import {Badge } from "flowbite-react";
import { HiCheck, HiExclamation, HiX } from "react-icons/hi";
import LoginValidation from './LoginValidation'
const Register = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: ''
  });
 

  
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

 
  const [alertInfo, setAlertInfo] = useState({
    show: false,
    color: 'danger',
    message: ''
  });

  const handleInputChange = (e) => {
    setValues ({ ...values, [e.target.name]: e.target.value });
   
  };



  const handleRegister = (event) => {
    event.preventDefault();
    console.log("Register button clicked");
    console.log("Values to be sent:", values);
  //  toast.info("Register button clicked. Processing registration...");
 
 const lv=LoginValidation(values);
setErrors(lv);
console.log(errors);
if (Object.keys(lv).length === 0) {
    axios.post('http://localhost:8084/register', values)
      .then(res => {
        console.log("Registration successful:", res.data.message);
     //   toast.success("Registration successful: " + res.data.message);
     setAlertInfo({
      show: true,
      color: 'success',
      message: `Registration successful: ${res.data.message}`
    });

      })
      .catch(err => {
        if (err.response) {
          
          console.error("Error response data:", err.response.data);
          console.error("Error response status:", err.response.status);
        //  toast.error("Error: " + err.response.data + " Status: " + err.response.status);
        const errorMessage = typeof err.response.data === 'object' 
        ? JSON.stringify(err.response.data)  // Convert object to string
        : err.response.data; 
        setAlertInfo({
          show: true,
          type: 'red',
           message: `Error: ${errorMessage}`
        });
        } else {
          console.error("Registration failed:", err.message);
          const errorMessage = typeof err.response.data === 'object' 
          ? JSON.stringify(err.response.data)  // Convert object to string
          : err.response.data; 
          setAlertInfo({
            show: true,
            type: 'red',
            message: `Error: ${errorMessage}`
          });
       //   toast.error("Registration failed: " + err.message);
        }
      });
    } else {
      console.log("Validation errors:", lv);
    }


  };
  







  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full" onSubmit={handleRegister}>
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Register</h2>
       
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleInputChange}
            placeholder="Enter name"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
          {errors.name && <p style={{color:"red"}}>{errors.name}</p>}
        </div>
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
           value={values.email}
            onChange={handleInputChange}
            placeholder="Enter email"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
         
          />
          {errors.email && <p style={{color:"red"}}>{errors.email}</p>}
        </div>
        
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
        value={values.password}
            onChange={handleInputChange}
            placeholder="Enter password"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
           
          />
          {errors.password && <p style={{color:"red"}}>{errors.password}</p>}
        </div>
        
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-300">
          Register
        </button>
        
        <p className="text-center mt-4">
          Already have an account? 
          <Link to="/login" className="text-blue-500 hover:underline ml-2">Login</Link>
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
<></>

    </div>
  );
};

export default Register;
