import React from 'react'
import "./Header.css"
import Hexagons from "../../assets/hexagons.png"
const Header = () => {
  return (
    <div className="hexa_header section_padding" id="home">
      <div className="hexa_header-content">
        <div className='hexa_header-content_desc'>
          <h1 className="hexa_header-content_desc-title gradient_text">The Powerful Web Solutions For You</h1>
          <p>Hexa is a business identity based in Hurghada, Egypt. 
          We provide web solutions for all business sectors all over the world, 
          including web / graphic design and digital marketing to establish and 
          improve your online presence, potential growth and competition.
          </p>
          <p>We do a lot of research and ultimately we come up with web solutions specifically tailored for your company. Keeping track with the latest of trends in the web design, graphic design and digital marketing sphere is a must. We tend to be creative and innovative, constantly utilizing new tactics in order to achieve your goals.
          </p>
          <p>You are always welcome and we are ready to give you a hand and guide you to the best valuable online business that meets your requirements.
          </p>
        </div>
        <div className="hexa_header-content_hexadesign">
          <img src={Hexagons} alt="hexagons" />
          <h1 className='gradient_text'>hexa</h1>
          {/* <h2 className='hexagon'></h2> */}
        </div>
        
        
      </div>  
     
        <div className='hexa_header-subscribe'>
          <input type="email" placeholder='Your Email Address'/>
          <button type="button">Get Started</button>
        </div>
    </div>
  )
}

export default Header