import {createContext, useState,useEffect} from "react";
import axios from 'axios';

export const AuthContext =createContext();  

export const AuthContextProvider=({children})=>{
    const [getCurrentUser,setCurrentUser]=useState(JSON.parse(localStorage.getItem("user")) || null);
    const [getIsLoading, setIsLoading]=useState(false);
    const [getIsError,setIsError]=useState("");
    
    const login=async(inputs)=>{
        const res = await axios.post("http://localhost:4000/users/login",inputs);
        setCurrentUser(res.data);
    }

    const logout=async()=>{
        // setIsLoading(true);
        await axios.post("http://localhost:4000/users/logout");
        setCurrentUser(null);
    }

    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(getCurrentUser));

    },[getCurrentUser])

    return(
        <AuthContext.Provider value={{getCurrentUser,login,logout,getIsError,getIsLoading}}>{children}</AuthContext.Provider>
    )
}