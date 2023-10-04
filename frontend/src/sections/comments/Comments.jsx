import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import "./comments.css"
import { AuthContext } from '../../context/AuthContext';



const Comments = ({projectId}) => {
  const backendURL=process.env.REACT_APP_BACKEND_URL;
  const [getText,setText]=useState("");
  const [getComments,setcomments]=useState([]);
  const {getCurrentUser}=useContext(AuthContext);
  const [getEditId, setEditId]=useState();
    
    
    useEffect(()=>{
      const fetchData=async()=>{
        const resComments=await axios.get(`${backendURL}/comments/${projectId}`)
        setcomments(resComments.data); 
      }
      fetchData();
      // console.log(getCurrentUser._id, getComments);
    })

    const handleAddComment=async(e)=>{
      e.preventDefault();
      try{
        await axios.post(`${backendURL}/comments/${projectId}`,{
          userId:getCurrentUser._id,
          comment:getText
        })
      }catch(err){
        console.log(err);
      }
    }

    const handleUpdate=async(commentId)=>{
      console.log(commentId);
      try{
        await axios.put(`${backendURL}/comments/${commentId}`,{
          comment:getText
        });
        setEditId(null);
      }catch(err){
        console.log(err);
      }
    }

    const handleDelete=async(commentId)=>{
      try{
        await axios.delete(`${backendURL}/comments/${commentId}/${projectId}`);
      }catch(err){
        console.log(err);
      }
    }

  return (
    <div className='comments'>
        <form className='comment_form' action="">
        {getCurrentUser?
        <>
          <input type="text" name="comment" id="comment" onChange={e=>setText(e.target.value)} />
          <button onClick={handleAddComment} disabled={!getText}>Add Comment</button>
        </>
        :
        <p>Please login to add comment</p>
        }
        
      </form>
      {getComments.map(comment=>(
          <div className='prev_comments' key={comment._id}>
            {/* <h3>{comment.userId._id}</h3> */}
            <h3>{comment.userId.username}</h3>
            <p>{comment.comment}</p>
            {(getCurrentUser&&getEditId===comment._id)&&
            <>
              <input type="text" onChange={e=>setText(e.target.value)} />
              <div>
                <button onClick={()=>handleUpdate(comment._id)}>Save</button>
                <button onClick={()=>setEditId(null)}>Cancel</button>
              </div>
            </>
            }
            <div className='action_buttons'>
            {(getCurrentUser&&getCurrentUser._id===comment.userId._id)&&
            <>
              <button className="update_button" onClick={()=>setEditId(comment._id)}>Edit Comment</button>
              <button className='delete_button' onClick={e=>handleDelete(comment._id)}>Delete Comment</button>
            </>
            }
            </div>
            
          </div>
          
        ))}
    </div>
  )
}

export default Comments