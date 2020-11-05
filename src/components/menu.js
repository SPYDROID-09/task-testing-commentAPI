import React,{useState,useEffect,useContext} from 'react'
import Menuimage from "./Menuimage.jpg"
import {UserContext} from '../App'
import {Link} from 'react-router-dom'
import '../App.css';

 const Menu = () => {
    const [data,setData] = useState([])
    const {state,dispatch} = useContext(UserContext)


    const makeComment = (text,postId)=>{
        fetch('/comment',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId,
                text
            })
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = data.map(item=>{
              if(item._id==result._id){
                  return result
              }else{
                  return item
              }
           })
          setData(newData)
        }).catch(err=>{
            console.log(err)
        })
    }
    return (
        <div>
            {
                data.map(item=>{
                    return(
                        <div className="card home-card" key={item._id}>
                                 {
                                     item.comments.map(record=>{
                                         return(
                                         <h6 key={record._id}><span style={{fontWeight:"500"}}>{record.postedBy.name}</span> {record.text}</h6>
                                         )
                                     })
                                 }
                                 <form onSubmit={(e)=>{
                                     e.preventDefault()
                                     makeComment(e.target[0].value,item._id)
                                 }}>
                                   <input type="text" placeholder="add a comment" />  
                                 </form>
                                 
                             </div>
                    )
                })
            }
           
           
        </div>
    )

    
}

export default Menu