import axios from "axios";
import { useState,useEffect } from "react"

const useFetch =(url)=>{
    const [getData,setData]=useState([]);
    const [getIsLoading, setIsLoading]=useState(false);
    const [getIsError, setIsError]=useState();

    useEffect(()=>{
        const fetchData=async()=>{
            setIsLoading(true);
            try{
                const res=await axios.get(url);
                setData(res.data);
            }catch(err){
                setIsError(err);
            }
            setIsLoading(false);
        };
        fetchData();

    },[url]);

    const reFetch=async()=>{
        setIsLoading(true);
        try{
            const res=await axios.get(url);
            setData(res.data);
        }catch(err){
            setIsError(err);
        }
        setIsLoading(false);
    };
    
    return {getData,getIsLoading,getIsError, reFetch};
}

export default useFetch;