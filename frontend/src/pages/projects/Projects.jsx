import React, { useState } from 'react';
import useFetch from '../../hooks/useFetch';
import ProjectItem from '../../components/project_item/Project_Item';
import "./projects.css";


const Projects = () => {
  const backendURL=process.env.REACT_APP_BACKEND_URL;
  const [getSearchTitle,setSearchTitle]=useState("");
  const [getSearchCategory,setSearchCategory]=useState("");
  const [getSearchFeatured,setSearchFeatured]=useState(false);
  
  const {getData,getIsLoading,getIsError}=useFetch(`${backendURL}/projects/search/list?title=${
      getSearchTitle}&category=${getSearchCategory}&featured=${getSearchFeatured}`);

  
  return (
    <div>
      <div className='projects_search_section'>
        <div className='projects_search_inputs'>
          <div className='input_title'>
            <input type="text" className='search_item' id="project_title" placeholder="Name" onChange={e=>setSearchTitle(e.target.value)}/>
          </div>
          <div>
            <select name="select_category" className='search_item' id="project_category" onChange={(e)=>setSearchCategory(e.target.value)}>
              <option value="" defaultValue>All Categories</option>
              <option value="Web Design">Web Design</option>
              <option value="Graphic Design">Graphic Design</option>
              <option value="SEO">SEO</option>
            </select>
          </div>
          <div className='input_featured'>
            <input type="checkbox" className='search_item' id="project_featured" onChange={e=>setSearchFeatured(e.target.checked)} />
            <label htmlFor="project_featured">Featured</label>
          </div>
        </div>
      </div>
      {/* project items */}
      <div className='projects_content'>
        {getIsLoading?<h3>Loading .. Please Wait</h3>
        :getData.map(project=>(
          <ProjectItem project={project} key={project._id}/>
        ))}
        {getIsError&&<p>{getIsError.message}</p>}
      </div>
       
    </div>
  )
}

export default Projects