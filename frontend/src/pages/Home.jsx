import React, { useContext, useEffect, useState } from 'react'
import {Footer,NavBar,Slider} from "../components"
import {Header,Services} from "../sections"
import { useLocation } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const Home = () => {
  
  return (
    <div className="App gradient_bg">
        <div className="App gradient_bg">
            <NavBar />
            <Header/>
            <Slider/>
            <Services/>
            <Footer />

        </div>
    </div>
  )
}

export default Home