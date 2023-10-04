import React, { useContext, useState } from 'react';
import './Navbar.css';
import {RiMenu3Line,RiCloseLine} from "react-icons/ri";
import HexaLogo from "../../assets/Hexa_Logo-violet.png";
import {Link, useLocation} from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';

//BEM -> Block Element Modifier
const Navbar = () => {
  const [toggleMenu,setToggleMenu]=useState(false);
  const parent=useLocation().pathname;
  const menuLinkClassName={
    name:parent!=="/"?"menu_link":"",
  }

  const {getCurrentUser,getIsAdmin,logout}=useContext(AuthContext);
  const handleLogout=async(e)=>{
    e.preventDefault();
    try{
      await logout;
    }catch(err){

    }
  }
  // const menuStyle={
  //   color:parent!=="/" && '#7f57af'
  // }
  return (
    <div className={parent!=="/"?"projects_navbar":"hexa_navbar"} onMouseLeave={()=>setToggleMenu(false)}>
      <div className='hexa_navbar-links'>
        <div className='hexa_navbar-links_logo'>
        <Link to="/"><img src={HexaLogo} alt="hexa logo" /></Link>
        </div>
        {/* <div className='hexa_navbar-links_container'>
          <Menu linkClassName={menuLinkClassName.name}/>
        </div> */}
      </div>
      <div className='hexa_navbar-sign'>
        {getCurrentUser?(
          <>
            <p>{getCurrentUser.username}</p>
            <p className={menuLinkClassName.name} onClick={logout}>Logout</p>
          </>
        ):(
          <>
            <p className={menuLinkClassName.name} ><Link to={`/login?page=${parent}`}>Sign In</Link></p>
            <button type="button"><Link to="/register">Sign Up</Link></button>
          </>
        )}
      </div>


      <div className="hexa_navbar-menu" onClick={()=>setToggleMenu(!toggleMenu)}>
        {toggleMenu ?
        <>
          <RiCloseLine color="#fff" size={27} onClick={()=>setToggleMenu(false)} />
          <div className="hexa_navbar-menu_container scale-up-center">
            <div className="hexa_navbar-menu_container-links">
              <Menu isAdmin={getIsAdmin} user={getCurrentUser}/>
              <div className='hexa_navbar-menu_container-links_sign'>
              {getCurrentUser?(
                <>
                  <p>{getCurrentUser.username}</p>
                  <p className={menuLinkClassName.name} onClick={logout}>Logout</p>
                </>
              ):(
                <>
                  <Link to={`/login?page=${parent}`}><p className={menuLinkClassName.name} >Sign In</p></Link>
                  <button type="button"><Link to="/register">Sign Up</Link></button>
                </>
              )}
              </div>
            
            </div>
          </div>
        </>
        :
        <RiMenu3Line color="#fff" size={27} onClick={()=>setToggleMenu(true)}/>}
      </div>
      
      
    </div>
  )
}

const Menu =({linkClassName,isAdmin,user})=>(
  <>
    <p className={linkClassName}><Link to="/">Home</Link></p>
    <p className={linkClassName}><Link to="/projects">Projects</Link></p>
    {(user&&isAdmin)&&<p className={linkClassName}><Link to="/write-project">Create Project</Link></p>}
    <p className={linkClassName}><Link to="#features">Case Studies</Link></p>
    <p className={linkClassName}><Link to="#blog">Library</Link></p>
</>

)
export default Navbar