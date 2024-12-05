
import React, { useEffect, useState } from 'react';
import { Card } from "flowbite-react";
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
const BookingsU = () => {
  const [venues, setVenues] = useState([]);
  const [bookings, setBookings] = useState([]);

  // Helper function to convert binary image data into displayable image
  const displayImage = (imageData) => {
    if (!imageData) return null;

    const uint8Array = new Uint8Array(imageData.data);
    const blob = new Blob([uint8Array], { type: 'image/jpeg' });
    const imageUrl = URL.createObjectURL(blob);
    
    return imageUrl;
  };

  // Function to determine the booking status of each venue
  const determineVenueStatus = (venue) => {
    const currentDate = new Date();
    const venueBooking = bookings.find(booking => booking.venue_name === venue.venue_name);

    if (venueBooking) {
      const checkinTime = new Date(venueBooking.checkin_time);
      const checkoutTime = new Date(venueBooking.checkout_time);
      
      // Check if current time is between check-in and check-out times and the booking status is 'booked'
      if (currentDate >= checkinTime && currentDate <= checkoutTime && venueBooking.bstatus === 'booked') {
        console.log('booked');
        return 'Booked';
      } else if (venueBooking.bstatus === 'booked') {
        console.log('available');
        return 'Available'; // Booked but not within current time
      }
    }
    console.log('only returned after last');
    return 'Available'; // No booking found for this venue
  };

  useEffect(() => {
    // Fetch all venues
    fetch('http://localhost:8084/displaybookingtou')
      .then(res => res.json())
      .then(data => {
        console.log('Fetched venues:', data); // Debug log
        setVenues(data);
      })
      .catch(err => console.log(err));

    // Fetch all bookings
    fetch('http://localhost:8084/bookings') // Ensure you have this endpoint returning bookings
      .then(res => res.json())
      .then(data => {
        console.log('Fetched bookings:', data); // Debug log
        setBookings(data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="ml-10 mt-10 flex flex-wrap gap-4">
      {venues.map((venue, i) => (
        <Card key={i} className="max-w-xs" vertical>
          <img 
            src={displayImage(venue.picture1)} 
            alt={venue.venue_name} 
            className="w-64 h-64 object-cover"
          />
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {venue.venue_name}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Location: {venue.location} <br />
            Details: {venue.venue_details}
          </p>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Total Price: ${venue.total_price} ${venue.venue_id}
          </p>
          <p className={`font-bold ${determineVenueStatus(venue) === 'Booked' ? 'text-red-600' : 'text-green-600'}`}>
            Status: {determineVenueStatus(venue)}
          </p>
          <Link 
        to={`/home/showvenues/${venue.venue_id}`} 
        className="inline-flex items-center justify-center rounded-lg bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800" >
        See more
      </Link>
        </Card>
      ))}
    </div>
  );
};

export default BookingsU;






















/*import React, { useEffect, useState } from 'react'
import { Card } from "flowbite-react";


const BookingsU = () => {

    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
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
        useEffect(() => {
            fetch('http://localhost:8084/displaybookingtou')
                .then(res => res.json())
                .then(data => {
                    console.log('Fetched data:', data); // Debug log
                    setData(data);
                })
                .catch(err => console.log(err));
        }, []);
        

  return (

<div className="ml-10 mt-10 flex flex-wrap gap-4"> Added flex and gap utilities 
        
            {data.map((venues, i) => (
                <Card key={i} className="max-w-xs" vertical>
                      <img 
                        src={displayImage(venues.picture1)} 
                        alt={venues.venue_name} 
                        className="w-64 h-64 object-cover" // Resize to 400x100 pixels
                    />
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {venues.venue_name}
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        Location: {venues.location} Details:{venues.venue_details}
                    </p>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        Total Price: ${venues.total_price}
                    </p>
                     <a href="#" className="inline-flex items-center justify-center rounded-lg bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800">
                    See more
                    </a>      
                </Card>
            ))}
        </div>
  
  )
}

export default BookingsU


import React, { useEffect, useState } from 'react';
import { Card } from 'flowbite-react';

const BookingsU = () => {
  const [venuesData, setVenuesData] = useState([]);

  // Function to check if a venue is currently booked based on current time
  const checkBookingStatus = (bookings) => {
    const currentDate = new Date();

    return bookings.map((booking) => {
      const checkinTime = new Date(booking.checkin_time);
      const checkoutTime = new Date(booking.checkout_time);

      // Check if current date falls within the booking window
      const isBooked = currentDate >= checkinTime && currentDate <= checkoutTime;
      return {
        ...booking,
        status: isBooked ? 'booked' : 'notbooked', // Mark as 'booked' or 'notbooked'
      };
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch only 'booked' venues from the backend
        const bookingsRes = await fetch('http://localhost:8084/bookings');
        const bookings = await bookingsRes.json();

        // Check the current booking status for each venue
        const updatedBookings = checkBookingStatus(bookings);

        setVenuesData(updatedBookings);  // Update the state with the processed data
      } catch (err) {
        console.log("Error fetching bookings:", err);
      }
    };
  
    fetchData();
  }, []);

  return (
    <div className="ml-10 mt-10 flex flex-wrap gap-4">
      {venuesData.map((venue, i) => (
        <Card key={i} className="max-w-xs">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {venue.venue_name}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Check-in Time: {new Date(venue.checkin_time).toLocaleString()}<br />
            Check-out Time: {new Date(venue.checkout_time).toLocaleString()}
          </p>
          <p className={`font-bold ${venue.status === 'booked' ? 'text-red-600' : 'text-green-600'}`}>
            Status: {venue.status === 'booked' ? 'Currently Booked' : 'Not Booked'}
          </p>
        </Card>
      ))}
    </div>
  );
};

export default BookingsU;

/*
import React, { useEffect, useState } from 'react';
import { Card } from 'flowbite-react';

const BookingsU = () => {
  const [venuesData, setVenuesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch venues
        const venuesRes = await fetch('http://localhost:8084/displaybookingtou');
        const venues = await venuesRes.json();

        // Fetch bookings
        const bookingsRes = await fetch('http://localhost:8084/bookings');
        const bookings = await bookingsRes.json();

        // Log fetched bookings for debugging
        console.log("Fetched Bookings Data:", bookings);

        const updatedVenues = venues.map(venue => {
          // Find matching booking for each venue
          const venueBooking = bookings.find(b => b.venue_name.trim().toLowerCase() === venue.venue_name.trim().toLowerCase());

          return {
            ...venue,
            status: venueBooking ? venueBooking.status : 'Available' // Use the classified status
          };
        });

        setVenuesData(updatedVenues);
      } catch (err) {
        console.log("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  const displayImage = (imageData) => {
    if (!imageData) return null;
    const uint8Array = new Uint8Array(imageData.data);
    const blob = new Blob([uint8Array], { type: 'image/jpeg' });
    return URL.createObjectURL(blob);
  };

  return (
    <div className="ml-10 mt-10 flex flex-wrap gap-4">
      {venuesData.map((venue, i) => (
        <Card key={i} className="max-w-xs">
          <img 
            src={displayImage(venue.picture1)} 
            alt={venue.venue_name} 
            className="w-64 h-64 object-cover"
          />
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {venue.venue_name}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Location: {venue.location} Details: {venue.venue_details}
          </p>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Total Price: ${venue.total_price}
          </p>
          <p className={`font-bold ${venue.status === 'Booked' ? 'text-red-600' : 'text-green-600'}`}>
            Status: {venue.status === 'Booked' ? 'Booked' : 'Available'}
          </p>
          <a href="#" className="inline-flex items-center justify-center rounded-lg bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800">
            See more
          </a>
        </Card>
      ))}
    </div>
  );
};

export default BookingsU;
*/