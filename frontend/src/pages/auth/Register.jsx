import { useState } from "react";
import {useNavigate} from "react-router-dom";

import "./auth.css";

import axios from "axios";
const backendURL=process.env.REACT_APP_BACKEND_URL;
const Register = () => {
  const [getCredentials,setCredentials]=useState({
    username:"",
    email:"",
    password:""
  });
  const [getRegMessage,setRegMessage]=useState("");
  const navigate=useNavigate();
  
  const handleChange=(e)=>{
    setCredentials(prev=>({...prev,[e.target.id]:e.target.value}));
  }

  const handleClick=async(e)=>{
    try{
      e.preventDefault();
      const res=await axios.post(`${backendURL}/users/register`,getCredentials);
      setRegMessage(res.data);
      setCredentials({username:"",email:"",password:""});
    }catch(err){
      setRegMessage(err.response.data);
    }
  }
  return (
    <div className="user_form">
      <form action="">
        <div className="user_form_input">
          <input type="text" id="username" placeholder="Username" value={getCredentials.username} onChange={handleChange}/>
          <input type="email" id="email" placeholder="Email" value={getCredentials.email} onChange={handleChange}/>
          <input type="password" id="password" placeholder="Password" value={getCredentials.password} onChange={handleChange} />
        </div>

        <div className="user_form_action_buttons">
          <button onClick={handleClick} disabled={!getCredentials.username||
          !getCredentials.email||!getCredentials.password}>Register</button>
          <button onClick={()=>navigate("/")}>Cancel</button>
        </div>

        <p className={getRegMessage==="User has been registered successfully"?"":"error_message"}>{getRegMessage}</p>
      </form>
      
      
    </div>
  )
}

export default Register