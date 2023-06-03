import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import Comments from "../sections/comments/comments"
import useFetch from '../hooks/useFetch';


const SingleProjects= () => {
  // const [getProject,setProject]=useState({});
  const location=useLocation();
  const projectId=location.pathname.split("/")[2];
  


  // useEffect(()=>{
  //   const fetchData=async()=>{
  //     const res=await axios.get(`http://localhost:4000/projects/${projectId}`);
  //   setProject(res.data);
  //   }
  //   fetchData();
  // },[])

  const {getData,isLoading, isError, reFetch}=useFetch(`http://localhost:4000/projects/${projectId}`);


  return (
    <>
    {isLoading?"Loading"
    :
    <div className='single_project'>
      <img src={`http://localhost:4000/uploads/${getData.img}`} alt="" />
      <h3>{getData.title}</h3>
      <p>{getData.desc}</p>
      <button><Link to="/write-project" state={getData}>Edit</Link></button>
      <Comments projectId={projectId}/>
      
    </div>
    }
    </>
    
  )
}

export default SingleProjects