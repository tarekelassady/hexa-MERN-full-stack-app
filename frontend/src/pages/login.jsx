import { useContext, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [getCredentials,setCredentials]=useState({
    username:"",
    password:"",
  })
  const [getLoginMsg,setLoginMsg]=useState("");
  const {login}=useContext(AuthContext);
  const navigate=useNavigate();
  const handleChange=(e)=>{
    setCredentials(prev=>({...prev,[e.target.id]:e.target.value}))
  }

  const handleClick=async(e)=>{
    e.preventDefault();
    try{
      await login(getCredentials);
      setLoginMsg(null);
      navigate("/");
    }catch(err){
      setLoginMsg(err.response.data);
    }
  }

  return (
    <div className='user_form'>
      <form action="">
        <div className='user_form_input'>
          <label htmlFor="username">Username </label>
          <input type="text" id="username" value={getCredentials.username} onChange={handleChange}/>
        </div> 
        <div className='user_form_input'>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={getCredentials.password} onChange={handleChange}/>
        </div>
        <div className='user_form_action_buttons'>
          <button onClick={handleClick}>Login</button>
          <button onClick={()=>navigate("/")}>Cancel</button>
        </div>
        <p className='error_message'>{getLoginMsg}</p>
      </form>
      
      <Link to="/register"><p>Have not registered yet?! <span style={{color:"white"}}>Register Now!</span> </p></Link>
    </div>
  )
}

export default Login