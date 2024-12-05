import React from 'react'
import { Link } from 'react-router-dom';
import './Carousellan.css'
const Carousellan = () => {

  return (

<>

<div>
        <div id="hero-carousel" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#hero-carousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#hero-carousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#hero-carousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>

    <div class="carousel-inner">
      <div class="carousel-item active c-item">
        <img src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1374&auto=format&fit=crop" 
           class="d-block h-100 object-cover c-img w-100"
            alt="Slide 1"/>
        <div class="carousel-caption top-0 mt-4">
          <p class="mt-5 fs-3 text-uppercase">Book conference halls</p>
          <h1 class="display-1 fw-bolder text-capitalize text-white">The Aurora Tours</h1>
          <button class="btn btn-primary px-4 py-2 fs-5 mt-5"> <Link to="/login" className="text-white">Book A Hall</Link></button>
        </div>
      </div>
      <div class="carousel-item c-item">
        <img src="https://images.unsplash.com/photo-1620735692151-26a7e0748429?q=80&w=1374&auto=format&fit=crop" 
        class="d-block w-100 h-100 object-cover c-img" alt="Slide 2"/>
        <div class="carousel-caption top-0 mt-4">
          <p class="text-uppercase fs-3 mt-5">Wedding season has arrived</p>
          <p class="display-1 fw-bolder text-capitalize">3 available pakages</p>
          <button class="btn btn-primary px-4 py-2 fs-5 mt-5" data-bs-toggle="modal"
            data-bs-target="#booking-modal"> <Link to="/register" className="text-white">Register</Link></button>
        </div>
      </div>
      <div class="carousel-item c-item">
      
      <img
        src="https://images.unsplash.com/photo-1697630424982-0097287e6984?q=80&w=1470&auto=format&fit=crop"
        alt="Formal Dinner Table Setting"
       class="d-block w-100 h-full object-cover c-img"
        
      />
      
       <div class="carousel-caption top-0 mt-4">
          <p class="text-uppercase fs-3 mt-5">Party Avenues</p>
          <p class="display-1 fw-bolder text-capitalize">Style best party</p>
          <button class="btn btn-primary px-4 py-2 fs-5 mt-5" data-bs-toggle="modal"
            data-bs-target="#booking-modal"> <Link to="/register" className="text-white">Register</Link></button>
        </div>
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#hero-carousel" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#hero-carousel" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
    </div>
    </>
  )
}

export default Carousellan
