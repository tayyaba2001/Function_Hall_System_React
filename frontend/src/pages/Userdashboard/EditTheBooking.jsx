import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useOutletContext } from "react-router-dom";
import { Link } from 'react-router-dom';
const EditTheBooking = () => {
  const { booking_id } = useParams();

console.log('Booking ID:', booking_id);
const { id12: getid } = useOutletContext(); 

  const [bookingDetails, setBookingDetails] = useState({
    catering: "no",     // "yes" or "no"
    photography: "no",  // "yes" or "no"
    supplier: "no",     // "yes" or "no"
    decoration: "no",   // "yes" or "no"
    pdf_file_from_client: null
  });
  const [error, setError] = useState(null);
  const [fileError, setFileError] = useState(null);
  const [pdfFile, setPdfFile] = useState(null); // State for storing PDF preview URL
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();
 // Assuming 'getid' is coming from context
  console.log('booking_id:', booking_id);
  console.log('getid:', getid);
  
  useEffect(() => {
  
const fetchBookingDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8084/getBooking/${booking_id}/${getid}`);
        setBookingDetails(response.data);
        if (response.data.pdf_file_from_client) {
       //   const blob = new Blob([response.data.pdf_file_from_client], { type: 'application/pdf' });
       //   const pdfUrl = URL.createObjectURL(blob);
        //  setPdfFile(pdfUrl); // Use this for the PDF preview
         // 
         const uint8Array = new Uint8Array(response.data.pdf_file_from_client.data);
         const blob = new Blob([uint8Array], { type: 'application/pdf' });
         const pdfUrl = URL.createObjectURL(blob);
         setPdfFile(pdfUrl); // Use this for the PDF preview

       //   setPdfFile(response.data.pdf_file_from_client); // Set existing PDF
        }else {
          setPdfFile(null); // Reset if no PDF exists
        }
      
      } catch (error) {
        console.error('Error fetching booking details:', error);
        setError('Failed to load booking details');
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };
  
    fetchBookingDetails();
  }, [booking_id, getid]);


  // Handle file change for PDF uploads
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      if (file.size > 64 * 1024 * 1024) {
        alert('File is too large. Please upload a file smaller than 64MB.');
        return;
      }
      setBookingDetails({ ...bookingDetails, pdf_file_from_client: file });
      setPdfFile(URL.createObjectURL(file)); // Generate preview URL for the PDF
      console.log(pdfFile);
      setFileError(null);
    } else {
      setFileError('Only PDF files are allowed');
    }
  };

  // Handle form submission
  const handleUpdate = async (event) => {
    event.preventDefault();
    
    // Create form data for file upload
    const formData = new FormData();
    formData.append('catering', bookingDetails.catering);
    formData.append('photography', bookingDetails.photography);
    formData.append('supplier', bookingDetails.supplier);
    formData.append('decoration', bookingDetails.decoration);
    formData.append('pdf_file_from_client', bookingDetails.pdf_file_from_client);

    try {
      await axios.put(`http://localhost:8084/updateBooking/${booking_id}/${getid}`, formData);
      alert('Booking updated successfully');
      navigate('/home'); // Redirect after successful update
    } catch (error) {
      console.error('Error updating booking:', error);
      alert('Failed to update booking');
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading message
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Edit Booking {booking_id}</h1>
      <form onSubmit={handleUpdate}>
     {/* Catering Section */}
     <div className="flex items-center ml-2">
  <h5 className="text-lg font-semibold mr-4">Need Catering (Yes/No):</h5>
  <label className="inline-flex items-center">
    <input
      type="checkbox"
      checked={bookingDetails.catering === "yes"}
      onChange={e => setBookingDetails({ ...bookingDetails, catering: e.target.checked ? "yes" : "no" })}
      className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring focus:ring-blue-200"
    />
  </label>
  </div>
  <div className="flex items-center ml-2">
  <h5 className="text-lg font-semibold mr-4"> Need Photography (Yes/No):</h5>
  <label className="inline-flex items-center">
    <input
      type="checkbox"
      className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring focus:ring-blue-200"
      checked={bookingDetails.photography === "yes"}
      onChange={e => setBookingDetails({ ...bookingDetails, photography: e.target.checked ? "yes" : "no" })}
    />
  </label>
</div>

  <div className="flex items-center ml-2">
    <h5 className="text-lg font-semibold mr-4">Need Supplier (Yes/No):</h5>
    <label className="inline-flex items-center">
      <input
        type="checkbox"
        className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring focus:ring-blue-200"
        checked={bookingDetails.supplier === "yes"}
        onChange={e => setBookingDetails({ ...bookingDetails, supplier: e.target.checked ? "yes" : "no" })}
      />
    </label>
</div>


  <div className="flex items-center ml-2">
    <h5 className="text-lg font-semibold mr-4">Need Decoration (Yes/No):</h5>
    <label className="inline-flex items-center">
      <input
        type="checkbox"
        className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring focus:ring-blue-200"
        checked={bookingDetails.decoration === "yes"}
        onChange={e => setBookingDetails({ ...bookingDetails, decoration: e.target.checked ? "yes" : "no" })}
      />
    </label>
  </div>


<div className="mb-6 ml-2">
  <label className="text-lg font-semibold">Upload PDF File for your Requirements in detail:</label>
  <input
    type="file"
    accept=".pdf"
    className="mt-2"
    onChange={handleFileChange}
  />
  {fileError && <p className="text-red-600 mt-1">{fileError}</p>}
</div>

     
      
        
        {/* Display PDF preview if a file is selected */}
        {pdfFile && (
          <div>
            <h4>PDF Preview:</h4>
            <object data={pdfFile} type="application/pdf" width="1200" height="900">
      <p>Your browser does not support PDFs. <a href={pdfFile}>Download the PDF</a>.</p>
    </object>
          </div>
        )}
        
        <button
  type="submit"
  className="mt-4 bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
>
  Update Booking
</button>

      </form>
    </div>
  );
};

export default EditTheBooking;
