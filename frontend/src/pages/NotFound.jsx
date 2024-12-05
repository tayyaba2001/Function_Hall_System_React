import React from 'react';
import { Link} from 'react-router-dom'


const NotFound = () => {
  const displayImage = (src) => {
    // Assuming this function processes the image source
    return src || "./errro404.jpg"; // Fallback in case of no src
  };

  return (
    <>
     <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        
        <h1 className="text-4xl text-red-500 font-bold mb-4">PageNotFound</h1>
        <p className="text-lg mb-4">
          Sorry Broken Link
        </p>
        <p className="text-center mt-4">
          Go back to website?{' '}
          <Link to="/register" className="text-blue-500 hover:underline ml-2">VTCC Website</Link>
        </p>
        <div className="flex justify-center mb-6">
  

        <img
        src="/errro404.jpg" // No need to reference /public, start from root
        onError={(e) => {
          e.target.onerror = null; // Prevent infinite loops
          e.target.src = "/fallback-image.jpg"; // Use another fallback if needed
        }}
        alt="Error 404"
        className="w-[600px] h-[500px] rounded-lg shadow-lg"
      />


     
    

        </div>
      </div>
    </div></>

  )
}

export default NotFound
 
      //  src="./errro404.jpg"
      //  alt="Image not available"

 //   className="w-[400px] h-[500px] rounded-lg shadow-lg 
       //            sm:w-[400px] sm:h-[400px] 
        //           md:w-[500px] md:h-[300px] 
          //         lg:w-[500px] lg:h-[500px]"
        // Hidden by default