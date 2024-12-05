
import axios from "axios";
import React from "react";
import { useState,useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useParams} from "react-router-dom";

// import { getPage } from 'pdfjs-dist';

const UserProfile = ()=> {
    const [book, setBook] = useState({
        name: '',
        email: '',
        role: 'visitor',
          profile_image:null,
     password:'',
      });

  const [error,setError] = useState(false)
  const [image95, setImage95] = useState(null)
  const navigate = useNavigate();
//  const [validated, setValidated] = useState(false);
 
const displayImage = (imageData) => {
    if (!imageData) return null;
    
    // Convert the array of integers to a Uint8Array
    const uint8Array = new Uint8Array(imageData.data);
    
    // Create a Blob object from the Uint8Array
    const blob = new Blob([uint8Array], { type: 'image/jpeg' });
    
    // Create a URL for the Blob
    const imageUrl = URL.createObjectURL(blob);
    
    return imageUrl;
  };


const location = useLocation();
const { id } = useParams(); 
const { id12: getid } = useOutletContext();

console.log('id:', id, 'Type:', typeof id);
console.log('getid:', getid, 'Type:', typeof getid);


  const reading =(e) =>{
    const file = e.target.files[0];

  //  if (file.size > 2 * 1024 * 1024) { // Limit to 2 MB
  //    alert('File is too large. Please upload a file smaller than 2MB.');
  //    return;
  //  }

  if (file.size > 64 * 1024 * 1024) {
    alert('File is too large. Please upload a file smaller than 64MB.');
    return;
  }


    if (e.target.files && e.target.files[0]) {
      
      setImage95(URL.createObjectURL(e.target.files[0]));
 //     console.log('File path:', imageFile.path);
    }
  const file23 = e.target.files[0];
    setBook((prev) => ({ ...prev, profile_image: file23 }));
  }
  const roles = [
    { value: 'admin', label: 'admin' },
    { value: 'staff', label: 'staff' },
    { value: 'visitor', label: 'visitor' }
  ];

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };


  useEffect(() => {
    if (getid !== parseInt(id)) {
      navigate('/unauthorized'); // Redirect if not the same user
    }
else{

    axios.get(`http://localhost:8084/gettingusers/${id}`)
    .then(response => {
      // Update state with fetched book details
      const resData = response.data;
      setBook(prevBook => ({
        ...prevBook,
        name: resData.name,
        email: resData.email,
        role: resData.role,
        profile_image: resData.profile_image,
      }));
    })
    .catch(error => {
      console.error('Error fetching book details:', error);
    });
  }
  }, [id,getid,navigate]);
  
const handleClick = async (e) => {
 

e.preventDefault();
    try {
      const formdata8 = new FormData();
      formdata8.append('role',book.role);
      formdata8.append('profile_image',book.profile_image);
      formdata8.append('name',book.name);
   //   formdata.append('maintenance',book.maintenance);

   

     await axios.put(`http://localhost:8084/updatingusers/${getid}`,formdata8);
  //  await axios.post("http://localhost:8081/books", { ...book, image: Array.from(book.image) });
  
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true)

    
    }
  };

 
  return (
    <div class="form"  >
      <div className="flex justify-center">
    <h1 className=" mb-4 px-4 text-2xl">Update User</h1>
</div>

     
      <Form  >

      <Row>
      <Form.Label>User Image</Form.Label>
      <Col  >
{/* <input type="file" id="file-input" name="profile_image" onChange={reading} accept="image/*" />  */}

{book.profile_image && <img src={displayImage(book.profile_image)} style={{width:'200px' , height:'200px' }} className="w-16 md:w-32 h-16 md:h-32 max-w-full max-h-full" alt={book.username} />}

<input type="file" id="file-input" name="image" onChange={reading} accept="image/*" />




    <Form.Group className="mb-3" controlId="formGroupLaptop">

    <Form.Label>User Name</Form.Label>
    <br/>
    <Form.Control  type="text" name="name" value={book.name} onChange={handleChange}  placeholder="User name" />
  </Form.Group>

  {/*      <Form.Group controlId="processorGenerationDropdown">
          <Form.Label>Role:</Form.Label>
       <Col xs={6} lg={4} md={6} >
  
          <Form.Select aria-label="Role" name="role" value={book.role} onChange={handleChange}>
          <option>Open this select menu</option>
           
       
            {roles.map((generation, index) => (
              <option key={index} value={generation.value}>
                {generation.label}
              </option>
            ))} 
          </Form.Select>
      \
        </Form.Group>
        */}
        

   {/*       <Form.Label>Password</Form.Label>
 <Col xs={6} lg={4} md={6} >
 <br/>
  <input type="text" value={book.password} name="password"  id="passwordInput" placeholder="Enter password" disabled />
 
 <br/>
 <Form.Label>Update Password</Form.Label>
{/*<Col xs={6} lg={4} md={6} >
<br/>
<input type="text" name="password" value={book.password} onChange={handleChange} id="passwordInput" 
placeholder="Enter password"  required/>

*/}




<Form.Group className="mb-3" controlId="formGrouphLaptop">
<br/>
<Form.Label>Email</Form.Label>
<br/>
<InputGroup className="mb-2">

<Form.Control  type="text" name="email" value={book.email}  placeholder="Email" disabled />
</InputGroup>
</Form.Group>


</Col>
<Col><img alt="preview image" src={image95} style={{width:'200px' , height:'200px' }}/></Col>
<div className="flex flex-wrap items-baseline space-x-4 justify-start mb-3">

      </div>
</Row>

<button onClick={handleClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-6 rounded">
  Add User
</button>
{error && <p className="text-red-500">Something went wrong!</p>}


      </Form>
    </div>


    
 

 //{/*
   //   <input type="text"   placeholder="Book title"  name="name"  onChange={handleChange} />
   //   <input type="text"   placeholder="Book title"  name="gen"  onChange={handleChange} />
      
   //   */}
   


 

  
 // {/*
//
//  < 
  // input
//        type="checkbox"
//        name="maintenance"
//        checked={book.maintenance}
//        onChange={handleCheckboxChange1}
 //     />
//*/}


  );
};

export default UserProfile;
//<Link to="/signup" className="ml-6 text-green-500 font-bold py-2 px-4 border-4  border-green-500 rounded  hover:text-green-700">
//See all users
//</Link>
