import {React,useEffect ,useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Sidebar from './Userdashboard/Sidebar'
import axios from 'axios';
import Unauthori from './Unauthori';
//{role==="admin" && <Admin/>}
//{role==="visitor" && <Visitor/>}
const Home = () => {
//const [role,setRole]=useState('')
const [name,setName]=useState('')
const [role,setRole]=useState('')
const [loading,setLoading]=useState(true);
const [id,setId]=useState('')
const [auth,setAuth]=useState(false);
const [Message,setMessage]=useState('');
const navigate =useNavigate()
axios.defaults.withCredentials =true;

useEffect(() => {
  axios.get('http://localhost:8084/dashboard')
    .then(res => {
      console.log("Response data:", res.data); 
      if (res.data.valid) {
        setAuth(true);
        setName(res.data.name);
        setId(res.data.id);
        setRole(res.data.role);
        setMessage(res.data.message); // Assuming this is an informational message
      } else {
        setAuth(false);
        console.log(res.data.message);
        setMessage(res.data.message); // Set message from response if available
        // Optionally navigate to a different page
        // navigate('/');
      }
      
      setLoading(false);
    })
    .catch(err => {
      if (err.response && err.response.status === 401) {
        setAuth(false);
        setMessage('User is not authenticated');
        // Optionally navigate to a different page
        // navigate('/notauthenticated');
      } else {
        setMessage('Error fetching data');
        
      }

      setLoading(false);
    });
}, [navigate]); // Include navigate in dependencies if you're using it inside useEffect

const handleDelete = () => {
  axios.get('http://localhost:8084/logout', { withCredentials: true })
    .then((res) => {
      console.log(res.data); // Optional: log response for debugging
      location.reload(true); // Force reload the page
    //  navigate('/login');
    })
    .catch((err) => {
      console.log(err); // Handle error if the request fails
    });
};

if (loading) {
  return (
    <div className="loading-container">
      <img src="/1488.gif" alt="Loading..." />
    </div>
  );
}
  return (
    <div>
      {
      
        auth ? 
        (
      <div>
      
       

 {role === "visitor" && <Sidebar name={name} role={role} id={id} handleDelete={handleDelete} />} 

 </div>
      ):(
        <div>
<Unauthori Message={Message} />
  </div>
      
   )}
      </div>
  );
};

export default Home;
