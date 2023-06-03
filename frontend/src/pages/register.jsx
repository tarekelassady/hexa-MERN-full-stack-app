import { useState } from "react";
import {useNavigate} from "react-router-dom";
import "./pages.css";
import axios from "axios";
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
    console.log(getCredentials);
  }

  const handleClick=async(e)=>{
    try{
      e.preventDefault();
      const res=await axios.post("http://localhost:4000/users/register",getCredentials);
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
          <label htmlFor="username">Username </label>
          <input type="text" id="username" value={getCredentials.username} onChange={handleChange}/>
        </div>
        <div className="user_form_input">
          <label htmlFor="email">Email </label>
          <input type="email" id="email" value={getCredentials.email} onChange={handleChange}/>
        </div>
        <div className="user_form_input">
          <label htmlFor="password">Password </label>
          <input type="password" id="password" value={getCredentials.password} onChange={handleChange} />
        </div>
        <div className="user_form_action_buttons">
          <button onClick={handleClick}>Register</button>
          <button onClick={()=>navigate("/")}>Cancel</button>
        </div>
        
      </form>
      <p className={getRegMessage==="User has been registered successfully"?"":"error_message"}>{getRegMessage}</p>
      
    </div>
  )
}

export default Register