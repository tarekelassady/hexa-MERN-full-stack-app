import React, { useState } from 'react';
import useFetch from '../hooks/useFetch';
import ProjectItem from '../components/project_item/project_item';


const Projects = () => {
  const [getSearchTitle,setSearchTitle]=useState("");
  const [getSearchCategory,setSearchCategory]=useState("");
  const [getSearchFeatured,setSearchFeatured]=useState(false);
  const {getData,getIsLoading,getIsError}=useFetch(`http://localhost:4000/projects/search/list?title=${
      getSearchTitle}&category=${getSearchCategory}&featured=${getSearchFeatured}`);

  
  return (
    <div>
        <div className='projects_search_section'>
          <div>
            <label className='projects_search_label' htmlFor="project_title">Title </label>
            <input type="text" className='search_item' id="project_title" onChange={e=>setSearchTitle(e.target.value)}/>
          </div>
          <div>
            <label htmlFor="project_category">Category  </label>
            <select name="select_category" className='search_item' id="project_category" onChange={(e)=>setSearchCategory(e.target.value)}>
              <option value="" defaultValue></option>
              <option value="Web Design">Web Design</option>
              <option value="Graphic Design">Graphic Design</option>
              <option value="SEO">SEO</option>
            </select>
          </div>
          <div>
            <input type="checkbox" className='search_item' id="project_featured" onChange={e=>setSearchFeatured(e.target.checked)} />
            <label htmlFor="project_featured">  Featured</label>
          </div>
        </div>
        <div className='projects_content'>
          {getIsLoading?<h3>Loading .. Please Wait</h3>
          :getData.map(project=>(
            <ProjectItem project={project} key={project._id}/>
          )
          )}
          {getIsError&&<p>{getIsError.message}</p>}
        </div>
        
    </div>
  )
}

export default Projects