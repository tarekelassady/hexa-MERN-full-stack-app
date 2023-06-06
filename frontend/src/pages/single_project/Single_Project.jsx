import { Link, useLocation, useNavigate } from 'react-router-dom';
import Comments from "../../sections/comments/comments"
import useFetch from '../../hooks/useFetch';
import axios from 'axios';
import "./single_project.css";


const SingleProjects= () => {
  // const [getProject,setProject]=useState({});
  const location=useLocation();
  const navigate=useNavigate();
  const projectId=location.pathname.split("/")[2];

  const {getData,isLoading, isError, reFetch}=useFetch(`http://localhost:4000/projects/${projectId}`);

  const handleDelete=async()=>{
    try{
      await axios.delete(`http://localhost:4000/projects/${projectId}`)
      navigate("/projects");
    }catch(err){
      console.log(err);
    }

  }

  return (
    <>
    {isLoading?"Loading"
    :
    <div className='single_project'>
      <img src={`http://localhost:4000/uploads/${getData.img}`} alt="" />
      <h3>{getData.title}</h3>
      <p>{getData.desc}</p>
      <div className='action_buttons'>
        <button><Link to="/write-project" state={getData}>Edit</Link></button>
        <button className="delete_button" onClick={handleDelete}>Delete</button>
      </div>
      <div className='comments'>
        <Comments projectId={projectId}/>
      </div>
      
    </div>
    }
    </>
    
  )
}

export default SingleProjects