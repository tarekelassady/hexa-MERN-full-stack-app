import React from 'react'
import "./project_item.css"
import { Link } from 'react-router-dom'
const ProjectItem = ({project}) => {
  return (
    <>
    <div className='project_item'>
        <img src={`http://localhost:4000/uploads/${project.img}`} alt="" />
        <div className='script'>
            <h3><Link to={`/project/${project._id}`}>{project.title}</Link></h3>
            <p>{project.desc}</p>
            <p>{project.category}</p>
            <div className='action_buttons'>
                <button><Link to="/write-project" state={project}>Edit</Link></button>
                <button>Delete</button>
            </div>
        </div>
        
        
    </div>
    </>
    
  )
}

export default ProjectItem