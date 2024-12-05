
import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { useParams } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { Link, useLocation, useNavigate } from "react-router-dom";// Assuming you're using react-bootstrap for form components


const AddBookings = () => {
  const { venue_id } = useParams();
  const [venue, setVenue] = useState({
    venue_name: '',
    location: '',
    capacity: 0,

    venue_details: '',
    venue_price: 0,
    gst: 0,
    total_price: 0,
    picture1: null,
    picture2: null,
  });
  console.log(venue_id);
  
    console.log(typeof venue_id); // This will output "string"
    const [errorMessage, setErrorMessage] = useState('');
    const venue_id_number = parseInt(venue_id);
    console.log(venue_id_number);
    console.log(typeof venue_id_number);
  // Fetch venue details when the component mounts
  useEffect(() => {
   
    axios.get(`http://localhost:8084/api/venues/${venue_id}`)
      .then(response => {
        const resData = response.data; // Assuming the response is an array and we want the first venue
        console.log(response.data);
        setVenue(prevVenue => ({
          ...prevVenue,
          venue_name: resData.venue_name,
          location: resData.location,
          capacity: resData.capacity,
       
          venue_details: resData.venue_details,
          venue_price: resData.venue_price,
          gst: resData.gst,
          total_price: resData.total_price,
          picture1: resData.picture1,
          picture2: resData.picture2,
        }));   
        setErrorMessage('');
      })
      .catch(error => {
        console.error('Error fetching venue details:', error);
        if (error.response && error.response.status === 404) {
          setErrorMessage('No venue found for this venue ID'); // Set error message for 404
        } else {
          console.error('Error fetching venue details:', error);
          setErrorMessage('An error occurred while fetching venue details'); // General error message
        }



      });
  }, [venue_id]); // Dependency on venue_id ensures data is fetched when it changes

  const displayImage = (imageData) => {
    // Assuming a function to convert binary data to a base64 string for displaying
    if (!imageData) return null;
    
    // Convert the array of integers to a Uint8Array
    const uint8Array = new Uint8Array(imageData.data);
    
    // Create a Blob object from the Uint8Array
    const blob = new Blob([uint8Array], { type: 'image/jpeg' });
    
    // Create a URL for the Blob
    const imageUrl = URL.createObjectURL(blob);
    
    return imageUrl;
  };

  return (
    <div className="ml-10 mt-10">
      <h2>Venue Details for Venue ID: {venue_id}</h2>
   
      {errorMessage && <h1>{errorMessage}</h1>} {/* Display error message in <h1> if any */}
    
      {!errorMessage && ( 

<Row className="flex flex-col md:flex-row" >

<Col>
<br/><br/>
    <div className="flex items-center space-x-4 mb-4">
      <h3 className="text-lg font-semibold text-darkblue">Venue Name:</h3>
      <h5 className="text-gray-700">{venue.venue_name}</h5>
    </div>

    <div className="flex items-center space-x-4 mb-4">
      <h3 className="text-lg font-semibold text-darkblue">Venue Location:</h3>
      <h5 className="text-gray-700">{venue.location}</h5>
    </div>

    <div className="flex items-center space-x-4 mb-4">
      <h3 className="text-lg font-semibold text-darkblue">Venue Capacity:</h3>
      <div className="flex items-center bg-gray-300 text-blue text-md font-bold px-3 py-1 rounded-full">
        {venue.capacity}
      </div>
    </div>

    <div className="mb-4">
      <h3 className="text-lg font-semibold text-darkblue">Venue Details:</h3>
      <p className="text-gray-700">{venue.venue_details}</p>
    </div>

    <div className="flex items-center space-x-4 mb-4">
      <h3 className="text-lg font-semibold text-darkblue">Venue Price:</h3>
      <div className="flex items-center bg-gray-300 text-blue text-md font-bold px-3 py-1 rounded-full">
        ${parseFloat(venue.venue_price).toFixed(2)} {/* Format to two decimal places */}
      </div>
    </div>
 
    <div className="flex items-center space-x-4 mb-4">
      <h3 className="text-lg font-semibold text-darkblue">GST:</h3>
      <div className="flex items-center bg-gray-300 text-blue text-md font-bold px-3 py-1 rounded-full">
        {parseFloat(venue.gst).toFixed(2)}% {/* Format to two decimal places */}
      </div>
    </div>
 
    <div className="flex items-center space-x-4 mb-4">
      <h3 className="text-lg font-semibold text-darkblue">Total Price After GST:</h3>
      <div className="flex items-center bg-gray-300 text-blue text-md font-bold px-3 py-1 rounded-full">
        ${parseFloat(venue.total_price).toFixed(2)} 
      </div>
    </div>

    <div className="mt-6">
                <Link to={`/home/showvenues/addbookings/${venue_id}`}>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg">
                    Add Booking
                  </button>
                </Link>
              </div>

</Col>

  <Col>
    {venue.picture1 && (
      <img
        src={displayImage(venue.picture1)} 
        style={{ width: '400px', height: '300px' }}
        className="w-16 md:w-32 h-16 md:h-32 max-w-full max-h-full"
        alt="Venue Image 1"
      />
    )}
    {venue.picture2 && (
      <img
        src={displayImage(venue.picture2)} 
        style={{ width: '400px', height: '300px' }}
        className="w-16 md:w-32 h-16 md:h-32 max-w-full max-h-full"
        alt="Venue Image 2"
      />
    )}
  </Col>
</Row>






      )}
    </div>
  );
};

export default AddBookings;

/*

Form>
        <Row>
          <Col>
            <Form.Group controlId="venueName">
              <Form.Label>Venue Name</Form.Label>
              <Form.Control
                type="text"
                name="venue_name"
                value={venue.venue_name}
                   placeholder="Venue Name"
              />
            </Form.Group>

            <Form.Group controlId="location">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={venue.location}
                disabled
                placeholder="Location"
              />
            </Form.Group>

            <Form.Group controlId="capacity">
              <Form.Label>Capacity</Form.Label>
              <Form.Control
                type="number"
                name="capacity"
                value={venue.capacity}
                disabled
                placeholder="Capacity"
              />
            </Form.Group>

         

            <Form.Group controlId="venueDetails">
              <Form.Label>Venue Details</Form.Label>
              <Form.Control
                as="textarea"
                name="venue_details"
                value={venue.venue_details}
                disabled
                placeholder="Details about the venue"
              />
            </Form.Group>

            <Form.Group controlId="venuePrice">
              <Form.Label>Venue Price</Form.Label>
              <Form.Control
                type="text"
                name="venue_price"
                value={venue.venue_price} // Formatting to 2 decimal places
                disabled
                placeholder="Venue Price"
              />
            </Form.Group>

            <Form.Group controlId="gst">
              <Form.Label>GST</Form.Label>
              <Form.Control
                type="text"
                name="gst"
                value={venue.gst} // Formatting to 2 decimal places
                disabled
                placeholder="GST"
              />
            </Form.Group>

            <Form.Group controlId="totalPrice">
              <Form.Label>Total Price</Form.Label>
              <Form.Control
                type="text"
                name="total_price"
                value={venue.total_price} // Formatting to 2 decimal places
                disabled
                placeholder="Total Price"
              />
            </Form.Group>
          </Col>

          <Col>
            {venue.picture1 && (
              <img
                src={displayImage(venue.picture1)} // Assuming displayImage is a function to format the image URL
                style={{ width: '200px', height: '200px' }}
                className="w-16 md:w-32 h-16 md:h-32 max-w-full max-h-full"
                alt="Venue Image 1"
              />
            )}
            {venue.picture2 && (
              <img
                src={displayImage(venue.picture2)} // Assuming displayImage is a function to format the image URL
                style={{ width: '200px', height: '200px' }}
                className="w-16 md:w-32 h-16 md:h-32 max-w-full max-h-full"
                alt="Venue Image 2"
              />
            )}
          </Col>
        </Row>
      </Form>
*/