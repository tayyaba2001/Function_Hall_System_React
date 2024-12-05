import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import LandingPage from './pages/LandingPage';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Register from './pages/Register';
import Login from "./pages/Login";
import Home from './pages/Home';
import Unauthori from './pages/Unauthori';
import NotFound from './pages/NotFound';
import AddBookings from './pages/Userdashboard/AddBookings';
import UserProfile from './pages/Userdashboard/UserProfile';
import 'flowbite';
import BookingsU from "./pages/Userdashboard/BookingsU";
import AddBookingsNext from './pages/Userdashboard/AddBookingsNext';
import BookingsToConsider from "./pages/Userdashboard/BookingsToConsider";
import Eratings from "./pages/Userdashboard/Eratings";
import EditTheBooking from "./pages/Userdashboard/EditTheBooking";
import EventsAll from "./pages/Userdashboard/EventsAll";
function App() {

  return (
  <>
  <Router>
  <Routes>
    {/* Route for the landing page */}
    <Route path="/" element={<LandingPage />} />
 <Route path="/register" element={<Register/>} />
 <Route path="/login" element={<Login/>} />
 
 <Route path="/unauthorized" element={<Unauthori/>} />
 {/* Add this route  first home had /home/*    
 
 Behavior: In this case, the route for /home is defined specifically without the wildcard (/*). 
 This means that when a user navigates to /home, it will render the Home component, and only the
  defined nested routes (/home/updateprofile/:id, /home/showbooking, and /home/showvenues/:venue_id)
   will be accessible.
  If the user tries to access any other sub-route like /home/unknown, it will render the NotFound component.
 
 In this version, the /* allows for a more flexible route structure. 
 The /home/* path indicates that any route that starts with /home (including /home, /home/anything, etc.) will 
 render the Home component. This means that the NotFound component will be shown for any undefined routes under /home,
  not just directly under /home. For example, /home/unknown would also trigger the NotFound component.
 
 instead of /home */}
       
       <Route path="/home" element={<Home />}>
     {/*     <Route path="updateprofile" element={<UserProfile />} />  Nested route */}
          <Route path="updateprofile/:id" element={<UserProfile />} />
          <Route path="showbooking" element={<BookingsU />} />
          <Route path="showvenues/:venue_id" element={<AddBookings />} />
          <Route path="*" element={<NotFound/>} />
          <Route path="showvenues/addbookings/:venue_id" element={<AddBookingsNext/>}/>
          <Route path="showuserbooking" element={<BookingsToConsider/>} />

          <Route path="editonuser/bookings/:booking_id" element={<EditTheBooking />} />
          <Route path="events/all" element={<EventsAll />} />
          <Route path="eratings" element={<Eratings/>} />

        </Route>

   {/*        <Route path="*" element={<NotFound/>} /> */}
    
  </Routes>
</Router>
</>
  );
}

export default App;
//may use component isnted of element