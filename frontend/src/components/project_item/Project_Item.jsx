import React, { useContext } from 'react';
import {AuthContext} from '../../context/AuthContext';
import "./project_item.css";
import { Link } from 'react-router-dom';
const ProjectItem = ({project}) => {
  const backendURL=process.env.REACT_APP_BACKEND_URL;
  const {getCurrentUser,getIsAdmin}=useContext(AuthContext);
  return (
    <>
    <div className='project_item'>
        <img src={`${backendURL}/uploads/${project.img}`} alt="" />
        <div className='script'>
            <h3><Link to={`/project/${project._id}`}>{project.title}</Link></h3>
            <p>{project.desc}</p>
            <p>{project.category}</p>
            {(getCurrentUser&&getIsAdmin)&&
              <div className='action_buttons'>
                  <button><Link to="/write-project" state={project}>Edit</Link></button>
                  <button>Delete</button>
              </div>
            }
        </div>
        
        
    </div>
    </>
    
  )
}

export default ProjectItem