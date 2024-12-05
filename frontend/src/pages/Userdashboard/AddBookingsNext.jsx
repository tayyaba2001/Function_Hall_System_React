
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Calendar from 'react-calendar'; // the Calendar component
import 'react-calendar/dist/Calendar.css'; // calendar styles
import { useOutletContext } from "react-router-dom";
import axios from 'axios';

function AddBookingsNext() {
    const [bookings, setBookings] = useState([]);
    const { venue_id } = useParams();
    const [markedCheckinDates, setMarkedCheckinDates] = useState([]);
    const [markedCheckoutDates, setMarkedCheckoutDates] = useState([]);
   // const { id } = useParams(); 
    const { id12: getid } = useOutletContext();
    
    const [venueName, setVenueName] = useState(''); 
    console.log('getid:', getid, 'Type:', typeof getid);
    const [error, setError] = useState(null);

    const [numAdults, setNumAdults] = useState('');
    const [numChildren, setNumChildren] = useState('');

    // Check-in state
    const [checkinDate, setCheckinDate] = useState(null);
    const [checkinTime, setCheckinTime] = useState('12:00'); // Default time

    // Check-out state
    const [checkoutDate, setCheckoutDate] = useState(null);
    const [checkoutTime, setCheckoutTime] = useState('12:00'); // Default time

    useEffect(() => {
        if (venue_id) {
            fetch(`http://localhost:8084/api/bookings/${venue_id}`)
                .then(res => res.json())
                .then(data => {
                    setBookings(data); // Set the state with the fetched data

                    // Extract check-in and check-out dates for marking on the calendar
                    const checkinDates = data.map(d => new Date(d.checkin_time));
                    const checkoutDates = data.map(d => new Date(d.checkout_time));
                    setMarkedCheckinDates(checkinDates);
                    setMarkedCheckoutDates(checkoutDates);
                })
               
                .catch(err => {
                    setError(err);
                    console.error('Fetch error:', err);
                });
              
   }
    if (venue_id) {
        fetch(`http://localhost:8084/api/gotvenuesname/${venue_id}`)
            .then(res => {
                console.log('Response:', res);
                return res.json();
            })
            .then(data => {
                console.log('Data received:', data);
                setVenueName(data.venue_name);
            })
            .catch(err => {
                setError(err);
                console.error('Fetch error:', err);
            });
    }
}, [venue_id]);

   

    // Function to handle check-in date selection
    const handleCheckinDateChange = (date) => {
        setCheckinDate(date);
    };

    // Function to handle check-out date selection
    const handleCheckoutDateChange = (date) => {
        // Ensure the check-out date is not before check-in date
        if (checkinDate && date <= checkinDate) {
            alert("Check-out date must be after check-in date.");
            setCheckoutDate(null);
        } else {
            setCheckoutDate(date);
        }
    };

    // Function to handle time input changes
    const handleCheckinTimeChange = (event) => {
        setCheckinTime(event.target.value);
    };

    const handleCheckoutTimeChange = (event) => {
        setCheckoutTime(event.target.value);
    };

    // Combine selected date and time into a single Date object
    const getSelectedDateTime = (date, time) => {
        if (!date || !time) return '';

        const [hours, minutes] = time.split(':');
        const updatedDateTime = new Date(date);
        updatedDateTime.setHours(parseInt(hours, 10), parseInt(minutes, 10));

        return updatedDateTime.toLocaleString(); // Format selected date-time
    };


    const handleInsertBooking = () => {
      if (!checkinDate || !checkoutDate || !numAdults || !numChildren) {
          alert("Please fill all the fields before submitting.");
       setError("Please fill all the fields before submitting.");
          return;
      }
    }

    const handleClick = async (e) => {
    
      try {
          const formdata8 = new FormData();  
          e.preventDefault(); // Prevent the default form submission behavior
  
          // Create newBooking object with all necessary data
          const newBooking = {
            client_id: getid,
            venue_id: parseInt(venue_id, 10),
            venue_name: venueName,
            checkin_time: getSelectedDateTime(checkinDate, checkinTime),
            checkout_time: getSelectedDateTime(checkoutDate, checkoutTime),
            num_adults: numAdults,
            num_children: numChildren
        };
          console.log('New Booking Data:', newBooking);
          const formatToMySQLDateTime = (dateString) => {
            const date = new Date(dateString);
            return date.toISOString().slice(0, 19).replace('T', ' '); // Formats to 'YYYY-MM-DD HH:MM:SS'
        };
        
        // Convert checkin_time and checkout_time
        const formattedBooking = {
            ...newBooking,
            checkin_time: formatToMySQLDateTime(newBooking.checkin_time),
            checkout_time: formatToMySQLDateTime(newBooking.checkout_time)
        };
        
        console.log('gprmatted Booking Data:',formattedBooking);
          // Append all values from newBooking to FormData
          Object.keys(formattedBooking).forEach(key => {
              formdata8.append(key, formattedBooking[key]);
          });
  
          // Logging the values for debugging
          console.log('FormData Values:', Array.from(formdata8.entries()));

     
  
          // Ensure the URL is formatted correctly
        
          await axios.post('http://localhost:8084/addingbookinggt', formattedBooking);

          alert("Booking added successfully!"); // Notify user on success
  
      } catch (err) {
      
       
        setError(err);
          console.log(err);
         // Set error state if something goes wrong
      }
  };
  






    return (
     
        <div className="form">
    <h3>Booked Times</h3>

    {/* Flex container for Check-in and Check-out */}
    <div className="flex flex-row justify-between">
        {/* Check-in Section */}
        <div className="mb-4 flex-1 mr-4">
            <h4>Check-in Date and Time</h4>
            <Calendar
                onChange={handleCheckinDateChange}
                tileClassName={({ date }) => {
                    const isCheckin = markedCheckinDates.some(markedDate => 
                        date.getFullYear() === markedDate.getFullYear() &&
                        date.getMonth() === markedDate.getMonth() &&
                        date.getDate() === markedDate.getDate()
                    );
                    const isCheckout = markedCheckoutDates.some(markedDate => 
                        date.getFullYear() === markedDate.getFullYear() &&
                        date.getMonth() === markedDate.getMonth() &&
                        date.getDate() === markedDate.getDate()
                    );
                    return isCheckin || isCheckout ? 'bg-red-500 text-white' : null;
                }}
                tileDisabled={({ date }) => {
                    const isCheckinDisabled = markedCheckinDates.some(markedDate => 
                        date.getFullYear() === markedDate.getFullYear() &&
                        date.getMonth() === markedDate.getMonth() &&
                        date.getDate() === markedDate.getDate()
                    );
                    const isCheckoutDisabled = markedCheckoutDates.some(markedDate => 
                        date.getFullYear() === markedDate.getFullYear() &&
                        date.getMonth() === markedDate.getMonth() &&
                        date.getDate() === markedDate.getDate()
                    );
                    return isCheckinDisabled || isCheckoutDisabled || (checkoutDate && date >= checkoutDate);
                }}
            />
            <div className="mt-4">
                <label htmlFor="checkinTimePicker" className="mr-2 font-semibold">Check-in Time:</label>
                <input
                    type="time"
                    id="checkinTimePicker"
                    value={checkinTime}
                    onChange={handleCheckinTimeChange}
                />
            </div>
        </div>

        {/* Check-out Section */}
        <div className="mb-4 flex-1">
            <h4>Check-out Date and Time</h4>
            <Calendar
                onChange={handleCheckoutDateChange}
                tileClassName={({ date }) => {
                    const isCheckin = markedCheckinDates.some(markedDate => 
                        date.getFullYear() === markedDate.getFullYear() &&
                        date.getMonth() === markedDate.getMonth() &&
                        date.getDate() === markedDate.getDate()
                    );
                    const isCheckout = markedCheckoutDates.some(markedDate => 
                        date.getFullYear() === markedDate.getFullYear() &&
                        date.getMonth() === markedDate.getMonth() &&
                        date.getDate() === markedDate.getDate()
                    );
                    return isCheckin || isCheckout ? 'bg-red-500 text-white' : null;
                }}
                tileDisabled={({ date }) => {
                    const isCheckinDisabled = markedCheckinDates.some(markedDate => 
                        date.getFullYear() === markedDate.getFullYear() &&
                        date.getMonth() === markedDate.getMonth() &&
                        date.getDate() === markedDate.getDate()
                    );
                    const isCheckoutDisabled = markedCheckoutDates.some(markedDate => 
                        date.getFullYear() === markedDate.getFullYear() &&
                        date.getMonth() === markedDate.getMonth() &&
                        date.getDate() === markedDate.getDate()
                    );
                    return isCheckinDisabled || isCheckoutDisabled || (checkinDate && date <= checkinDate);
                }}
            />
            <div className="mt-4">
                <label htmlFor="checkoutTimePicker" className="mr-2 font-semibold">Check-out Time:</label>
                <input
                    type="time"
                    id="checkoutTimePicker"
                    value={checkoutTime}
                    onChange={handleCheckoutTimeChange}
                />
            </div>
        </div>
    </div>

    {/* Display Selected Check-in and Check-out Date and Time */}
    <div className="flex flex-row mb-4 justify-between space-x-8">
    <div className='flex-1'>
        <p className="font-semibold">Selected Check-in Date and Time:</p>
        <p>{getSelectedDateTime(checkinDate, checkinTime)}</p>
    </div>
    <div className='flex-1'>
        <p className="font-semibold">Selected Check-out Date and Time:</p>
        <p>{getSelectedDateTime(checkoutDate, checkoutTime)}</p>
    </div>
</div>


    {/* Number of Adults and Children */}
    <div className="flex flex-row justify-between mb-4">
        <div className="flex-1 mr-4">
            <label className="font-semibold">Number of Adults:</label>
            <input
                type="number"
                value={numAdults}
                onChange={(e) => setNumAdults(parseInt(e.target.value))}
                min="0"
            />
        </div>
        <div className="flex-1">
            <label className="font-semibold">Number of Children:</label>
            <input
                type="number"
                value={numChildren}
                onChange={(e) => setNumChildren(parseInt(e.target.value))}
                min="0"
            />
        </div>
    </div>

    {/* Add Booking Button */}
    <button 
        onClick={handleClick} 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
        Add Booking
    </button>

    {/* Error Handling */}
    {error ? (
      <p className="text-red-500">{error.message}</p>  // Rendering the error message
    ) : (
      <p>All good!</p>
    )}

    {/* Table of bookings */}
    <table className="min-w-full table-auto mt-4">
        <thead>
            <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Venue Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-in Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-out Time</th>
            </tr>
        </thead>
        <tbody>
            {bookings.length > 0 ? (
                bookings.map((d, i) => (
                    <tr key={i}>
                        <td className="px-6 py-4 font-semibold text-lg text-gray-900 dark:text-white">{d.venue_name}</td>
                        <td className="px-6 py-4 font-semibold text-lg text-gray-900 dark:text-white">{new Date(d.checkin_time).toLocaleString()}</td>
                        <td className="px-6 py-4 font-semibold text-lg text-gray-900 dark:text-white">{new Date(d.checkout_time).toLocaleString()}</td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan="3" className="px-6 py-4 text-center text-lg text-gray-900 dark:text-white">No bookings found for this venue.</td>
                </tr>
            )}
        </tbody>
    </table>
</div>
  
    );
}

export default AddBookingsNext;













































/*
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Calendar from 'react-calendar'; // Importing the Calendar component
import 'react-calendar/dist/Calendar.css'; // Importing calendar styles

function AddBookingsNext() {
    const [bookings, setBookings] = useState([]);
    const { venue_id } = useParams();
    const [markedCheckinDates, setMarkedCheckinDates] = useState([]);
    const [markedCheckoutDates, setMarkedCheckoutDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null); // State for selected date
    const [selectedTime, setSelectedTime] = useState('12:00'); // Default time

    console.log('venue id:', venue_id); // Debugging the venueId

    useEffect(() => {
        if (venue_id) {
            fetch(`http://localhost:8084/api/bookings/${venue_id}`)
                .then(res => res.json())
                .then(data => {
                    console.log('Fetched Bookings:', data); // Log the fetched data to console
                    setBookings(data); // Set the state with the fetched data

                    // Extract check-in and check-out dates for marking on the calendar
                    const checkinDates = data.map(d => new Date(d.checkin_time));
                    const checkoutDates = data.map(d => new Date(d.checkout_time));
                    setMarkedCheckinDates(checkinDates);
                    setMarkedCheckoutDates(checkoutDates);
                })
                .catch(err => console.log(err));
        } else {
            console.log('Invalid venueId');
        }
    }, [venue_id]);

    // Function to handle date selection from the calendar
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    // Function to handle time input change
    const handleTimeChange = (event) => {
        setSelectedTime(event.target.value);
    };

    // Combine selected date and time into a single Date object
    const getSelectedDateTime = () => {
        if (!selectedDate || !selectedTime) return '';

        const [hours, minutes] = selectedTime.split(':');
        const updatedDateTime = new Date(selectedDate);
        updatedDateTime.setHours(parseInt(hours, 10), parseInt(minutes, 10));

        return updatedDateTime.toLocaleString(); // Format selected date-time
    };

    return (
        <div>
            <h3>Booked Times</h3>

            {/* Calendar Component 
            <div className="mb-4">
                <Calendar
                    onChange={handleDateChange} // Capture selected date
                    tileClassName={({ date }) => {
                        // Check if the date is in either markedCheckinDates or markedCheckoutDates
                        const isCheckin = markedCheckinDates.some(markedDate => 
                            date.getFullYear() === markedDate.getFullYear() &&
                            date.getMonth() === markedDate.getMonth() &&
                            date.getDate() === markedDate.getDate()
                        );
                        const isCheckout = markedCheckoutDates.some(markedDate => 
                            date.getFullYear() === markedDate.getFullYear() &&
                            date.getMonth() === markedDate.getMonth() &&
                            date.getDate() === markedDate.getDate()
                        );

                        return isCheckin || isCheckout ? 'bg-blue-500 text-white' : null; // Highlight marked dates
                    }}
                    tileDisabled={({ date }) => {
                        // Disable tiles that are marked as check-in or check-out dates
                        return markedCheckinDates.some(markedDate => 
                            date.getFullYear() === markedDate.getFullYear() &&
                            date.getMonth() === markedDate.getMonth() &&
                            date.getDate() === markedDate.getDate()
                        ) || markedCheckoutDates.some(markedDate => 
                            date.getFullYear() === markedDate.getFullYear() &&
                            date.getMonth() === markedDate.getMonth() &&
                            date.getDate() === markedDate.getDate()
                        );
                    }}
                />
            </div>

            {/* Time input field 
            <div className="mb-4">
                <label htmlFor="timePicker" className="mr-2 font-semibold">Select Time:</label>
                <input
                    type="time"
                    id="timePicker"
                    value={selectedTime}
                    onChange={handleTimeChange} // Capture selected time
                />
            </div>

            {/* Display Selected Date and Time 
            <div>
                <p className="font-semibold">Selected Date and Time:</p>
                <p>{getSelectedDateTime()}</p> {/* Output selected date and time 
            </div>

            {/* Table of bookings 
            <table className="min-w-full table-auto">
                <thead>
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Venue Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-in Time</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-out Time</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.length > 0 ? (
                        bookings.map((d, i) => (
                            <tr key={i}>
                                <td className="px-6 py-4 font-semibold text-lg text-gray-900 dark:text-white">{d.venue_name}</td>
                                <td className="px-6 py-4 font-semibold text-lg text-gray-900 dark:text-white">{new Date(d.checkin_time).toLocaleString()}</td>
                                <td className="px-6 py-4 font-semibold text-lg text-gray-900 dark:text-white">{new Date(d.checkout_time).toLocaleString()}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="px-6 py-4 text-center text-lg text-gray-900 dark:text-white">No bookings found for this venue.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default AddBookingsNext;

import React, {useState} from "react";
import './style.css';
import data from "./TemplateData.json";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <>
      <div className="templateContainer">
        <div className="searchInput_Container">
          <input id="searchInput" type="text" placeholder="Search here..." onChange={(event) => {
            setSearchTerm(event.target.value);
          }} />
        </div>
        <div className="template_Container">
          {
            data 
              .filter((val) => {
                if(searchTerm == ""){
                  return val;
                }else if(val.title.toLowerCase().includes(searchTerm.toLowerCase())){
                  return val;
                }
              })
              .map((val) => {
                return(
                  <div className="template" key={val.id}>
                      <img src={val.image} alt="" />
                      <h3>{val.title}</h3>
                      <p className="price">${val.price}</p>
                  </div> 
                )
              })
          }
        </div>
      </div>
    </>
  )
}

export default App;





*/

/*
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Calendar from 'react-calendar'; // Importing the Calendar component
import 'react-calendar/dist/Calendar.css'; // Importing calendar styles

function AddBookingsNext() {
    const [bookings, setBookings] = useState([]);
    const { venue_id } = useParams();
    const [markedCheckinDates, setMarkedCheckinDates] = useState([]);
    const [markedCheckoutDates, setMarkedCheckoutDates] = useState([]);

    console.log('venue id:', venue_id); // Debugging the venueId

    useEffect(() => {
        if (venue_id) {
            fetch(`http://localhost:8084/api/bookings/${venue_id}`)
                .then(res => res.json())
                .then(data => {
                    console.log('Fetched Bookings:', data); // Log the fetched data to console
                    setBookings(data); // Set the state with the fetched data

                    // Extract check-in and check-out dates for marking on the calendar
                    const checkinDates = data.map(d => new Date(d.checkin_time));
                    const checkoutDates = data.map(d => new Date(d.checkout_time));
                    setMarkedCheckinDates(checkinDates);
                    setMarkedCheckoutDates(checkoutDates);
                })
                .catch(err => console.log(err));
        } else {
            console.log('Invalid venueId');
        }
    }, [venue_id]);

    return (
        <div>
            <h3>Booked Times</h3>
            
          
            <div className="mb-4">
                <Calendar
                    tileClassName={({ date }) => {
                        // Check if the date is in either markedCheckinDates or markedCheckoutDates
                        const isCheckin = markedCheckinDates.some(markedDate => 
                            date.getFullYear() === markedDate.getFullYear() &&
                            date.getMonth() === markedDate.getMonth() &&
                            date.getDate() === markedDate.getDate()
                        );
                        const isCheckout = markedCheckoutDates.some(markedDate => 
                            date.getFullYear() === markedDate.getFullYear() &&
                            date.getMonth() === markedDate.getMonth() &&
                            date.getDate() === markedDate.getDate()
                        );

                        return isCheckin || isCheckout ? 'bg-blue-500 text-white' : null; // Highlight marked dates
                    }}
                    tileDisabled={({ date }) => {
                        // Disable tiles that are marked as check-in or check-out dates
                        return markedCheckinDates.some(markedDate => 
                            date.getFullYear() === markedDate.getFullYear() &&
                            date.getMonth() === markedDate.getMonth() &&
                            date.getDate() === markedDate.getDate()
                        ) || markedCheckoutDates.some(markedDate => 
                            date.getFullYear() === markedDate.getFullYear() &&
                            date.getMonth() === markedDate.getMonth() &&
                            date.getDate() === markedDate.getDate()
                        );
                    }}
                />
            </div>

            <table className="min-w-full table-auto">
                <thead>
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Venue Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-in Time</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-out Time</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.length > 0 ? (
                        bookings.map((d, i) => (
                            <tr key={i}>
                                <td className="px-6 py-4 font-semibold text-lg text-gray-900 dark:text-white">{d.venue_name}</td>
                                <td className="px-6 py-4 font-semibold text-lg text-gray-900 dark:text-white">{new Date(d.checkin_time).toLocaleString()}</td>
                                <td className="px-6 py-4 font-semibold text-lg text-gray-900 dark:text-white">{new Date(d.checkout_time).toLocaleString()}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="px-6 py-4 text-center text-lg text-gray-900 dark:text-white">No bookings found for this venue.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default AddBookingsNext;


import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Calendar from 'react-calendar'; // Importing the Calendar component
import 'react-calendar/dist/Calendar.css'; // Importing calendar styles

function AddBookingsNext() {
    const [bookings, setBookings] = useState([]);
    const { venue_id } = useParams();
    const [markedCheckinDates, setMarkedCheckinDates] = useState([]);
    const [markedCheckoutDates, setMarkedCheckoutDates] = useState([]);

    console.log('venue id:', venue_id); // Debugging the venueId

    useEffect(() => {
        if (venue_id) {
            fetch(`http://localhost:8084/api/bookings/${venue_id}`)
                .then(res => res.json())
                .then(data => {
                    console.log('Fetched Bookings:', data); // Log the fetched data to console
                    setBookings(data); // Set the state with the fetched data

                    // Extract check-in and check-out dates for marking on the calendar
                    const checkinDates = data.map(d => new Date(d.checkin_time));
                    const checkoutDates = data.map(d => new Date(d.checkout_time));
                    setMarkedCheckinDates(checkinDates);
                    setMarkedCheckoutDates(checkoutDates);
                })
                .catch(err => console.log(err));
        } else {
            console.log('Invalid venueId');
        }
    }, [venue_id]);

    return (
        <div>
            <h3>Booked Times</h3>
            
          
            <div className="mb-4">
                <Calendar
                    tileClassName={({ date }) => {
                        // Check if the date is in either markedCheckinDates or markedCheckoutDates
                        const isCheckin = markedCheckinDates.some(markedDate => 
                            date.getFullYear() === markedDate.getFullYear() &&
                            date.getMonth() === markedDate.getMonth() &&
                            date.getDate() === markedDate.getDate()
                        );
                        const isCheckout = markedCheckoutDates.some(markedDate => 
                            date.getFullYear() === markedDate.getFullYear() &&
                            date.getMonth() === markedDate.getMonth() &&
                            date.getDate() === markedDate.getDate()
                        );

                        return isCheckin || isCheckout ? 'bg-blue-500 text-white' : null; // Highlight marked dates
                    }}
                    tileDisabled={({ date }) => {
                        // Disable tiles that are marked as check-in or check-out dates
                        return markedCheckinDates.some(markedDate => 
                            date.getFullYear() === markedDate.getFullYear() &&
                            date.getMonth() === markedDate.getMonth() &&
                            date.getDate() === markedDate.getDate()
                        ) || markedCheckoutDates.some(markedDate => 
                            date.getFullYear() === markedDate.getFullYear() &&
                            date.getMonth() === markedDate.getMonth() &&
                            date.getDate() === markedDate.getDate()
                        );
                    }}
                />
            </div>

            <table className="min-w-full table-auto">
                <thead>
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Venue Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-in Time</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-out Time</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.length > 0 ? (
                        bookings.map((d, i) => (
                            <tr key={i}>
                                <td className="px-6 py-4 font-semibold text-lg text-gray-900 dark:text-white">{d.venue_name}</td>
                                <td className="px-6 py-4 font-semibold text-lg text-gray-900 dark:text-white">{new Date(d.checkin_time).toLocaleString()}</td>
                                <td className="px-6 py-4 font-semibold text-lg text-gray-900 dark:text-white">{new Date(d.checkout_time).toLocaleString()}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="px-6 py-4 text-center text-lg text-gray-900 dark:text-white">No bookings found for this venue.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default AddBookingsNext;
/*
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Calendar from 'react-calendar'; // Importing the Calendar component
import 'react-calendar/dist/Calendar.css'; // Importing calendar styles

function AddBookingsNext() {
    const [bookings, setBookings] = useState([]);
    const { venue_id } = useParams();
    const [markedDates, setMarkedDates] = useState([]);

    console.log('venue id:', venue_id); // Debugging the venueId

    useEffect(() => {
        if (venued) {
            fetch(`http://localhost:8084/api/bookings/${venue_id}`)
                .then(res => res.json())
                .then(data => {
                    console.log('Fetched Bookings:', data); // Log the fetched data to console
                    setBookings(data); // Set the state with the fetched data

                    // Extract check-in dates for marking on the calendar
                    const dates = data.map(d => new Date(d.checkin_time));
                    setMarkedDates(dates);
                })
                .catch(err => console.log(err));
        } else {
            console.log('Invalid venueId');
        }
    }, [venue_id]);

    return (
        <div>
            <h3>Booked Times</h3>
            
            Calendar Component 
            <div className="mb-4">
                <Calendar
                    tileClassName={({ date }) => 
                        markedDates.some(markedDate => 
                            date.getFullYear() === markedDate.getFullYear() &&
                            date.getMonth() === markedDate.getMonth() &&
                            date.getDate() === markedDate.getDate()
                        ) ? 'bg-blue-500 text-white' : null // Highlight marked dates
                    }
                />
            </div>

            <table className="min-w-full table-auto">
                <thead>
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Venue Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-in Time</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-out Time</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.length > 0 ? (
                        bookings.map((d, i) => (
                            <tr key={i}>
                                <td className="px-6 py-4 font-semibold text-lg text-gray-900 dark:text-white">{d.venue_name}</td>
                                <td className="px-6 py-4 font-semibold text-lg text-gray-900 dark:text-white">{new Date(d.checkin_time).toLocaleString()}</td>
                                <td className="px-6 py-4 font-semibold text-lg text-gray-900 dark:text-white">{new Date(d.checkout_time).toLocaleString()}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="px-6 py-4 text-center text-lg text-gray-900 dark:text-white">No bookings found for this venue.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default AddBookingsNext;




*/




/*
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
function AddBookingsNext() {
  const [bookings, setBookings] = useState([]);
  const { venue_id } = useParams();
  console.log('venue  id:', venue_id); 

  useEffect(() => {
    fetch(`http://localhost:8084/api/bookings/${venue_id}`)
      .then(res => res.json())
      .then(data => {
        console.log('Fetched Bookings:', data); // Log the fetched data to console
        setBookings(data); // Set the state with the fetched data
      })
      .catch(err => console.log(err));
  }, [venue_id]);

  return (
    <div>
      <h3>Booked Times</h3>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Venue Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-in Time</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-out Time</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
            bookings.map((d, i) => (
              <tr key={i}>
              <td className="px-6 py-4 font-semibold text-lg text-gray-900 dark:text-white">{d.venue_name}</td>
              <td className="px-6 py-4 font-semibold text-lg text-gray-900 dark:text-white">{new Date(d.checkin_time).toLocaleString()}</td>
              <td className="px-6 py-4 font-semibold text-lg text-gray-900 dark:text-white">{new Date(d.checkout_time).toLocaleString()}</td>
          </tr>
      ))  
            
          ) : (
            <tr>
              <td colSpan="3" className="px-6 py-4 text-center text-lg text-gray-900 dark:text-white">No bookings found for this venue.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AddBookingsNext;


const [selectedDate, setSelectedDate] = useState(null);




<h1>jdjdjd</h1>
      <input type="datetime-local" id="datetime" name="datetime"/>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        showTimeSelect
        dateFormat="Pp"
        placeholderText="Select date and time"
      />
*/ 
