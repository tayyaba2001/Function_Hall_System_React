import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesome
import { faBuilding, faStar, faGlobe, faAward, faUsers, faTrophy, faHeart } from '@fortawesome/free-solid-svg-icons'; // Import icons
import './Services.css'; // Import custom styles if needed

const Services = () => {
  const servicesData = [
    { icon: faBuilding, title: 'Halls', number: '12', description: 'Spacious and luxurious halls for any event.' },
    { icon: faStar, title: 'Five Star Ratings', number: '2000', description: 'Our customers love us!' },
    { icon: faGlobe, title: 'International Guests', number: '31', description: 'Welcoming guests from all over the world.' },
    { icon: faAward, title: 'Awards', number: '4', description: 'Recognized for excellence in event management.' },
    { icon: faUsers, title: 'Teams', number: '8', description: 'Dedicated teams working for your event success.' },
    { icon: faTrophy, title: 'Events Hosted', number: '150+', description: 'A rich portfolio of successful events.' },
    { icon: faHeart, title: 'Happy Clients', number: '500+', description: 'Our clients are our pride and joy.' },
  ];

  return (
    <div className="outer-container">
       <h1 className="display-4 fw-bolder font-sans text-black text-center">
  Services
</h1>
    <div className="flex flex-wrap justify-center  flex-row gap-6 p-2">
   

      {servicesData.map((service, index) => (
        <div
          key={index}
          className="flex flex-col items-center bg-gradient-to-r from-blue-900 to-gray-900 rounded-lg p-6 w-80 shadow-lg transition-transform hover:scale-105"
        >
          <div className="text-white mb-4 animate-pulse">
            <FontAwesomeIcon icon={service.icon} size="3x" /> 
          </div>
          <h3 className="text-2xl font-bold text-white mb-2 font-canva-sans">
            {service.number} {service.title} {/* Number and Title */}
          </h3>
          <p className="text-white text-center">{service.description}</p> {/* Description */}
        </div>
      ))}
    </div>
    </div>
  );
};

export default Services;
