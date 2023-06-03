import React from 'react'
import "./Services.css"
import {servicesList} from "./services-list"
const Services = () => {
  return (
    <div className="hexa_services section_padding" id="home">
      <h2 className='hexa_services-heading'>How Can We Help You</h2>
      <div className="hexa_services-list">
          {servicesList.map((service)=>(
            <div className="service-item" key={service.id}>
              <service.icon className='service-icon'/>
              <h1 className='service-name'>{service.name}</h1>
              <p className='service-desc'>{service.desc}</p>
            </div>
    ))}
      </div>
      <button className='hexa_services-readmorebutton'>Read More</button>
      
    </div>
    
  )
}

export default Services