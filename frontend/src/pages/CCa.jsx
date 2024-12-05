import React from 'react'
import Slider from "react-slick";
import './CCa.css';



const CCa = () => {



    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        arrows: true,
        slidesToScroll: 1,
        responsive: [
           
            {
              breakpoint: 1500, 
              settings: {
                slidesToShow: 2, 
              }
            },
            {
                breakpoint: 1000, 
                settings: {
                  slidesToShow: 1, 
                }
              },
          ]
       
      };
    
      return (
<>
        <div style={{ margin: '0 auto', padding: '60px', width: '100%' }}>
        
        <h1 className="display-4 fw-bolder font-sans text-black text-center">
  Events Booked
</h1>
          <Slider {...settings}>
          <div>
          <a href="/" aria-label="View Item">
    <div className="relative overflow-hidden transition duration-200 transform rounded shadow-lg hover:-translate-y-2 hover:shadow-2xl">
      <img className="object-cover w-full  h-[500px] md:h-[500px] xl:h-[500px]"
        src="./pro4.jpg"
        alt="Slide 1"
      />
     <div className="absolute inset-x-0 bottom-0 px-6 py-4 bg-black bg-opacity-75">
        <p className="text-2xl font-normal  font-large tracking-wide text-white">
     Intimate Celebration Setup
        </p>
      </div>
    </div>
  </a>
  </div><div>


  <a href="/" aria-label="View Item">
    <div className="relative overflow-hidden transition duration-200 transform rounded shadow-lg hover:-translate-y-2 hover:shadow-2xl">
      <img  className="object-cover w-full  h-[500px] md:h-[500px] xl:h-[500px]"
        src="./pro3.jpg"
        alt="Slide 2"    />
       <div className="absolute inset-x-0 bottom-0 px-6 py-4 bg-black bg-opacity-75">
        <p className="text-2xl font-normal  font-large tracking-wide text-white">
       Wedding banquet
        </p>
      </div> </div>
  </a>

  </div><div>
  <a href="/" aria-label="View Item">
    <div className="relative overflow-hidden transition duration-200 transform rounded shadow-lg hover:-translate-y-2 hover:shadow-2xl">
      <img className="object-cover w-full  h-[500px] md:h-[500px] xl:h-[500px]"
        src="./pro5.jpg"
        alt="Slide 3"
      />
     <div className="absolute inset-x-0 bottom-0 px-6 py-4 bg-black bg-opacity-75">
        <p className="text-2xl font-normal  font-large tracking-wide text-white">
        Engagement with floral setup
        </p>
      </div>
    </div>
  </a>
  </div><div>
  <a href="/" aria-label="View Item">
    <div className="relative overflow-hidden transition duration-200 transform rounded shadow-lg hover:-translate-y-2 hover:shadow-2xl">
      <img  className="object-cover w-full  h-[500px] md:h-[500px] xl:h-[500px]"
        src="./pro6.jpg"
        alt="Slide 4"
      />
      <div className="absolute inset-x-0 bottom-0 px-6 py-4 bg-black bg-opacity-75">
        <p className="text-2xl font-normal  font-large tracking-wide text-white">
      Outdoor Community Event
        </p>
      </div>
    </div>
  </a>

  </div><div>


  



          <a href="/" aria-label="View Item">
    <div className="relative overflow-hidden transition duration-200 transform rounded shadow-lg hover:-translate-y-2 hover:shadow-2xl">
      <img  className="object-cover w-full  h-[500px] md:h-[500px] xl:h-[500px]"
        src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1498&auto=format&fit=crop"
        alt="Slide 5"
      />
     <div className="absolute inset-x-0 bottom-0 px-6 py-4 bg-black bg-opacity-75">
        <p className="text-2xl font-normal  font-large tracking-wide text-white">
       Luxury ball room with decorations 
        </p>
      </div>
    </div>
  </a>


  </div><div>


            <a href="/" aria-label="View Item">
    <div className="relative overflow-hidden transition duration-200 transform rounded shadow-lg hover:-translate-y-2 hover:shadow-2xl">
      <img className="object-cover w-full  h-[500px] md:h-[500px] xl:h-[500px]"
        src="https://plus.unsplash.com/premium_photo-1664790560098-1fac17eb495e?q=80&w=1374&auto=format&fit=crop"
        alt="Slide 6"
      />
      <div className="absolute inset-x-0 bottom-0 px-6 py-4 bg-black bg-opacity-75">
        <p className="text-2xl font-normal  font-large tracking-wide text-white">
       Outdoor birthday Event
        </p>
      </div>
    </div>
  </a>

  </div><div>

  <a href="/" aria-label="View Item">
    <div className="relative overflow-hidden transition duration-200 transform rounded shadow-lg hover:-translate-y-2 hover:shadow-2xl">
      <img className="object-cover w-full  h-[500px] md:h-[500px] xl:h-[500px]"
        src="https://images.unsplash.com/photo-1558008258-3256797b43f3?q=80&w=1631&auto=format&fit=crop"
        alt="Slide 7"
      />
   <div className="absolute inset-x-0 bottom-0 px-6 py-4 bg-black bg-opacity-75">
        <p className="text-2xl font-normal  font-large tracking-wide text-white">
        Seminar/Conference setup
        </p>
      </div>
    </div>
  </a>
  
  </div><div>
  <a href="/" aria-label="View Item">
    <div className="relative overflow-hidden transition duration-200 transform rounded shadow-lg hover:-translate-y-2 hover:shadow-2xl">
      <img className="object-cover  h-[500px] md:h-[500px] xl:h-[500px]"
        src="https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1469&auto=format&fit=crop"
        alt="Slide 8"
      />
    <div className="absolute inset-x-0 bottom-0 px-6 py-4 bg-black bg-opacity-75">
        <p className="text-2xl font-normal  font-large tracking-wide text-white">
        Trade-show
        </p>
      </div>
    </div>
  </a> 
  </div><div>

  <a href="/" aria-label="View Item">
    <div className="relative overflow-hidden transition duration-200 transform rounded shadow-lg hover:-translate-y-2 hover:shadow-2xl">
      <img className="object-cover w-full  h-[500px] md:h-[500px] xl:h-[500px]"
        src="/pro.jpg"  alt="Slide 9"
      />
        <div className="absolute inset-x-0 bottom-0 px-6 py-4 bg-black bg-opacity-75">
        <p className="text-2xl font-normal  font-large tracking-wide text-white">
        Lavish wedding Decor
        </p>
      </div>
    </div>
    
  </a> 

  </div><div>
   <a href="/" aria-label="View Item">
    <div className="relative overflow-hidden transition duration-200 transform rounded shadow-lg hover:-translate-y-2 hover:shadow-2xl">
      <img className="object-cover w-full h-[500px] md:h-[500px] xl:h-[500px]"
        src="https://images.unsplash.com/photo-1523438885200-e635ba2c371e?q=80&w=1374&auto=format&fit=fill"
        alt="Slide 10"
      />
      <div className="absolute inset-x-0 bottom-0 px-6 py-4 bg-black bg-opacity-75">
        <p className="text-2xl font-normal  font-large tracking-wide text-white">
        Fairytale-inspired wedding setup
        </p>
      </div>
    </div>
  </a>

  </div>


  

            {/* You can add more images if needed */}
          </Slider>
<br/><br/><br/><br/><br/><br/>
          <div class="elfsight-app-f980791b-6666-410d-bd45-56a53860c935" data-elfsight-app-lazy></div>


</div>
</>

      );
}

  
export default CCa
