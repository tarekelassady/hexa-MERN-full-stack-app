import {createContext, useState,useEffect} from "react";
import axios from 'axios';

export const AuthContext =createContext();  

export const AuthContextProvider=({children})=>{
    const backendURL=process.env.REACT_APP_BACKEND_URL;
    const [getCurrentUser,setCurrentUser]=useState(JSON.parse(localStorage.getItem("user")) || null);
    const [getIsLoading, setIsLoading]=useState(false);
    const [getIsError,setIsError]=useState("");
    const [getIsAdmin,setIsAdmin]=useState(false);
    
    const login=async(inputs)=>{
        const res = await axios.post(`${backendURL}/users/login`,inputs);
        const {isAdmin,password,...otherDetails}=res.data;
        setCurrentUser({...otherDetails});
        setIsAdmin(isAdmin);
    }

    const logout=async()=>{
        // setIsLoading(true);
        await axios.post(`${backendURL}/users/logout`);
        setCurrentUser(null);
    }

    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(getCurrentUser));

    },[getCurrentUser])

    return(
        <AuthContext.Provider value={{getCurrentUser,login,logout,getIsError,getIsLoading,getIsAdmin}}>{children}</AuthContext.Provider>
    )
}