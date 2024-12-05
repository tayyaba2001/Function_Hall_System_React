
import React, { useEffect, useState } from 'react';
import { Card } from "flowbite-react";
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
const EventsAll = () => {
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
      if (currentDate >= checkinTime && currentDate <= checkoutTime && venueBooking.bstatus === 'pending') {
        console.log('working on');
        return 'Working_On';
      } else if (venueBooking.bstatus === 'pending') {
        console.log('pending');
        return 'Pending'; // Booked but not within current time
      }
    }
    console.log('only returned after last');
    return 'Available'; // No booking found for this venue
  };

  useEffect(() => {
    // Fetch all venues
    fetch('http://localhost:8084/displaybookingtou1')
      .then(res => res.json())
      .then(data => {
        console.log('Fetched venues:', data); // Debug log
        setVenues(data);
      })
      .catch(err => console.log(err));

    // Fetch all bookings
    fetch('http://localhost:8084/bookings1') // Ensure you have this endpoint returning bookings
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
     {/* <!--- -->   <Link 
        to={`/home/showvenues/${venue.venue_id}`} 
        className="inline-flex items-center justify-center rounded-lg bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800" >
        See more
      </Link>*/}
        </Card>
      ))}
    </div>
  );
};

export default EventsAll;
