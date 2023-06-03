// import "./Slider.css"
import "./Slider.scss"
import "./Slide1.scss"
import "./Slide2.scss"
import "./Slide3.scss"
import "./Slide4.scss"
import {sliderData} from "./slider-data"
import { useEffect, useState } from "react"
import {AiOutlineArrowLeft,AiOutlineArrowRight} from "react-icons/ai"
import imgPause from "../../assets/pause.png"


const Slider=()=>{
    const [getCurrentSlide,setCurrentSlide]=useState(0);
    const [{scroll,mouseleaveInvoked},setScroll]=useState({scroll:true,
        mouseleaveInvoked:false});
    
    const currentSlide=(e)=>{
        if(e.target.id==="prev"){
        setCurrentSlide(prevData=>prevData>0?prevData-1:sliderData.length-1)  
        }
        else{
            setCurrentSlide(prevData=>prevData<sliderData.length-1?prevData+1:0)
        }
    }
    let slideInterval;
    function nextSlide(){
        setCurrentSlide(getCurrentSlide<sliderData.length-1?getCurrentSlide+1:0);
    }
    function autoScroll(t){
        slideInterval=setInterval(() => {
            nextSlide();
        }, t);
    }
    const mouseStatus=(e)=>{  
        if(e.type==="mouseenter"){
            setScroll({scroll:false,mouseleaveInvoked:false});
            // clearInterval(slideInterval);
        }
        if(e.type==="mouseleave"){
            setScroll({scroll:true,mouseleaveInvoked:true});
        }
    }
    useEffect(()=>{
        if(scroll){
            autoScroll(10000);
            // if(mouseleaveInvoked===true){
            //     autoScroll(2000);
            //     setScroll({scroll:true,mouseleaveInvoked:false})
            // }
            // else{
            // autoScroll(10000);
            // }
        }      
        return ()=>clearInterval(slideInterval); //clean callback function
    },[getCurrentSlide,scroll])

    useEffect(()=>{
        setCurrentSlide(0);
        
    },[])
    
    return(
// the slider main div
        <div className="slider" onMouseEnter={(e)=>mouseStatus(e)} onMouseLeave={(e)=>mouseStatus(e)}> 
        <img className="slider-paused" src={scroll?"":imgPause}></img>
{/* arrows */}
            <AiOutlineArrowLeft className="arrow prev" id="prev" onClick={(e)=>currentSlide(e)}/>
            <AiOutlineArrowRight className="arrow next" id="next" onClick={(e)=>currentSlide(e)}/>   
        {
// map through the slides array and show the current slide        
            sliderData.map((slide,index)=>(
                slide.id==getCurrentSlide&&(
                    <div className={`slide${slide.id+1} slide`} key={slide.id}>
                        {slide.background_image!==null&&<img src={slide.background_image} alt="img-bg" />}
                        {slide.image1!==null&&<img src={slide.image1} className="img1" alt="img1" />}
                        {slide.image2!==null&&<img src={slide.image2} className="img2" alt="img2" />}
                        {slide.image3!==null&&<img src={slide.image3} className="img3" alt="img3" />}
                        <div className="content">
                            <h2>{slide.heading}</h2>
                            <p>{slide.desc}</p>
                            <h2>{slide.offer}</h2>
                            <hr />
                            <button className="btn">Get Started</button> 
                        </div>
                        {scroll&&<hr className="progress-bar" />}
                    </div>
                )
            ))
        }
 
        {/* {
//my solution (I add id in the slider-data.js. This is what should be)
            getSliderData.map(slide=>(
                slide.id==getCurrentSlide&&(
                <div key={slide.id}>
                    <div>
                    <AiOutlineArrowLeft id="prev" onClick={(e)=>currentSlide(e)}/>
                    <AiOutlineArrowRight id="next" onClick={(e)=>currentSlide(e)}/>
                    </div>
                    <img src={slide.image} alt="" />
                    <h1>{slide.heading}</h1>
                    <p>{slide.desc}</p> 
                </div>
                )
            
            ))
        } */}
        </div>

    )
}

export default Slider