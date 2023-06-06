import { useContext, useState } from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import "./auth.css";

const Login = () => {
  const [getCredentials,setCredentials]=useState({
    username:"",
    password:"",
  })
  const [getLoginMsg,setLoginMsg]=useState("");
  const {login}=useContext(AuthContext);
  const navigate=useNavigate();
  const params=new URLSearchParams(window.location.search);
  const currentPage=params.get('page');

  const handleChange=(e)=>{
    setCredentials(prev=>({...prev,[e.target.id]:e.target.value}))
  }

  const handleClick=async(e)=>{
    e.preventDefault();
    try{
      await login(getCredentials);
      setLoginMsg(null);
      navigate(currentPage);
    }catch(err){
      setLoginMsg(err.response.data);
    }
  }

  return (
    <div className='user_form'>
      <form action="">
        <div className='user_form_input'>
          <input type="text" id="username" placeholder="Username" value={getCredentials.username} onChange={handleChange}/>
          <input type="password" id="password" placeholder="Password" value={getCredentials.password} onChange={handleChange}/>
        </div> 
        <div className='user_form_action_buttons'>
          <button onClick={handleClick} disabled={!getCredentials.username||
          !getCredentials.password}>Login</button>
          <button onClick={()=>navigate(currentPage)}>Cancel</button>
        </div>
        <p className='error_message'>{getLoginMsg}</p>
        <Link to="/register"><p>Have not registered yet?! <span style={{color:"white"}}>Register Now!</span> </p></Link>
      </form>
      
      
    </div>
  )
}

export default Login