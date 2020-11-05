import React,{useState} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'


 const Signin = () =>{
    const history = useHistory()
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")

    const PostData = ()=>{
        fetch("/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,
                email
            })
        }).then(res=>res.json())
        .then(data=>{
           if(data.error){
              M.toast({html: data.error})
           }
           else{
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                history.push('/menu')
           }
        }).catch(err=>{
            console.log(err)
        })
    } 
    return (
        <div className="forms">
            <h1>SignIn</h1>
            <input
            type = "text"
            placeholder = "email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
            <input
            type = "text"
            placeholder = "password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            />
            <button onClick={()=>PostData()}>
                Login
            </button>
        </div>
    )
}

export default Signin