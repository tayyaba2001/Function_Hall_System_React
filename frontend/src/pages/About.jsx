import React from 'react'

const About = () => {
  return (
    <div>
      <section className="about-section py-16 bg-gray-100">
  <div className="container mx-auto px-4">
  <h1 className="display-4 fw-bolder font-sans text-black text-center">
  About us
</h1> 
    <div className="flex flex-wrap items-center justify-center">
      <div className="w-full md:w-1/2 lg:w-1/3 p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h3 className="text-3xl font-semibold text-blue-900 mb-4">Our Mission</h3>
          <p className="text-gray-700">
          
          At VTCC, our mission is to make every event special and memorable. We aim to provide a beautiful 
          and comfortable space for all types of gatherings, whether it's a wedding, birthday party, or corporate meeting
          
          
           </p>
        </div>
      </div>
      <div className="w-full md:w-1/2 lg:w-1/3 p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h3 className="text-3xl font-semibold text-blue-900 mb-4">Our Story</h3>
          <p className="text-gray-700">
          
          
          We want to make your experience easy and enjoyable by offering great spaces, helpful staff,
           and all the services you need. We aim to create unforgettable memories for you and your guests.
          
            </p>
        </div>
      </div>
      <div className="w-full md:w-1/2 lg:w-1/3 p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h3 className="text-3xl font-semibold text-blue-900 mb-4">Our Values</h3>
          <p className="text-gray-700">
          
          We believe that our customers come first. Every decision we make is based on what is best for our clients.
           We listen to their needs and work hard to exceed their expectations.
          
          
             </p>
        </div>
      </div>
    </div>
  </div>
</section>

    </div>
  )
}

export default About
