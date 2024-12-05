import React from 'react'
import Carousellan from './Carousellan'
import Services from './Services'
import { Statistic } from './Statistic'
import About from './About'
import CCa from './CCa'
import Footerate from './Footerate'

const Herosectionlan = () => {
  return (
    <div>
<section id="services">
 <Carousellan/>
<Statistic/>
</section>


      <section id="about">
        <Services/>
 
  <About/>
  <CCa/>

</section>



<section id="contact">
  
  <Footerate/>
</section>
    </div>
  )
}

export default Herosectionlan
