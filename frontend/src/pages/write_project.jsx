import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import './pages.css'
import { useLocation } from 'react-router-dom';
import axios from "axios";

const WriteProject = () => {
  const state=useLocation().state;
  const [getTitle,setTitle]=useState(state?.title||"");
  const [getDescription,setDescription]=useState(state?.desc||"");
  const [getFile,setFile]=useState(state?.img||null);
  const [getCat,setCat]=useState(state?.category||"");
  const [getDone,setDone]=useState(false);

  const upload=async()=>{
    try{
      const formData=new FormData();
      formData.append("file",getFile);
      const res= await axios.post("http://localhost:4000/upload",formData);
      return res.data;
    }catch(err){
      console.log(err);
    }
  }
  
  const handleClick=async(e)=>{
    e.preventDefault();
    const imgName=await upload();
    try{
      state?
      await axios.put(`http://localhost:4000/projects/${state._id}`,{
        title:getTitle,
        desc:getDescription,
        category:getCat,
        img:getFile?imgName:"",
      })
      :
      await axios.post("http://localhost:4000/projects",{
        title:getTitle,
        desc:getDescription,
        category:getCat,
        img:getFile?imgName:"",
      })
      setDone(true);
    }catch(err){
      console.log(err);
    }
    
  }

  return (
    <>
      <div className='create_project_form'>
      <form className="form" action="">
        <div>
          <label htmlFor="title">Title:</label>
          <input id="title" type="text" placeholder="Title" name="title" value={getTitle} onChange={e=>setTitle(e.target.value)}/>
          <ReactQuill className='description' name="description" value={getDescription} onChange={setDescription} theme="snow" />
          <div className='load_img'>
            <img src={`http://localhost:4000/uploads/${getFile}`} alt="image is here" />
            <input type="file" id="file" name="img" onChange={e=>setFile(e.target.files[0])} style={{display:"none"}}/>
            <label className='file' htmlFor="file">Upload File</label>
          </div>
          
          <div className='categories'>
            <h2>Project Category:</h2>
            <div className='cat'>
              <input type="radio" id="web_design" name="cat" value="Web Design" checked={getCat==="Web Design"} onChange={e=>setCat(e.target.value)} />
              <label htmlFor="web_design">Web Design</label>
            </div>
            <div className='cat'>
              <input type="radio" id="seo" name="cat" value="SEO" checked={getCat==="SEO"} onChange={e=>setCat(e.target.value)} />
              <label htmlFor="seo">SEO</label>
            </div>
            <div className='cat'>
              <input type="radio" id="graphic_design" name="cat" value="Graphic Design" checked={getCat==="Graphic Design"} onChange={e=>setCat(e.target.value)} />
              <label htmlFor="graphic_design">Graphic Design</label>
            </div>
          </div>
            <div className='action_buttons'>
              <button onClick={handleClick}>{state?`Update Project`:`Create Project`}</button>
              <button>Cancel</button>
            </div>
            <p>{getDone&&"New Project has been added successfully"}</p>
        </div>
      </form>
      </div>
    </>
  )
}

export default WriteProject