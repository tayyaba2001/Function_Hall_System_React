import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Link} from 'react-router-dom'
const Unauthori = ({ Message }) => {
  const navigate= useNavigate();

  const handleGoHome = () => {
    navigate('/register');
  };

  return (
     <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        
        <h1 className="text-4xl text-red-500 font-bold mb-4">Unauthorized {Message}</h1>
        <p className="text-lg mb-4">
          You are not authorized to access this page. Please log in to continue.
        </p>
        <p className="text-center mt-4">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-500 hover:underline ml-2">Sign up</Link>
        </p>
        <div className="flex justify-center mb-6">
          <video
            className="w-[400px] h-[500px] rounded-lg shadow-lg 
                      sm:w-[400px] sm:h-[400px] 
                      md:w-[500px] md:h-[300px] 
                      lg:w-[500px] lg:h-[500px]"
            autoPlay
            loop
            muted
          >
            <source src="/vid401.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};

export default Unauthori;