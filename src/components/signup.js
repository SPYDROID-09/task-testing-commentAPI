import React,{useState} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'


const Signup=()=> {
    const history = useHistory()
    const [name,setName] = useState("")
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")

    const PostData = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
            return
        }
        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                password,
                email
            })
        }).then(res=>res.json())
        .then(data=>{
           if(data.error){
              M.toast({html: data.error})
           }
           else{
               M.toast({html:data.message})
               history.push('/signin')
           }
        }).catch(err=>{
            console.log(err)
        })
    }

    return (

        <div className="forms">
            <h1>SignUp</h1>
            <input
                type = "text"
                placeholder = "Name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
            />
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
                SignUp
            </button>
        </div>

    )
}

export default Signup