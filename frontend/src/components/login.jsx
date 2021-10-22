import axios from "axios";

import "./login.css"
import {Room,Cancel} from '@material-ui/icons'
import { useState,useRef } from "react"




export default function Login({setShowLogin,myStorage,setCurrentUser}){

    
    const [error,setError]= useState(false);
    const nameRef = useRef();
    
    const passwordRef = useRef();

const handleSubmit = async(e)=>{
    e.preventDefault();
    const user = {
        username:nameRef.current.value,
        
        password:passwordRef.current.value
    };
    try{

        const res = await axios.post("users/login",user);
        myStorage.setItem("user",res.data.username);
        setCurrentUser(res.data.username);
        setShowLogin(false)
        
        
    }
    catch(err){
        
        setError(true);
        console.log(err)
    }
}
    return (
        <div className="loginContainer">
            
            <div className="logo">
                <Room/>
                Mapping
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="username" ref={nameRef}></input>

                <input type="password" placeholder="password" ref={passwordRef}></input>
                <button className="loginButton">Login</button>
               

{error && 
                <span className="failure">Sorry..Login Unsuccessful!</span>
}

            </form>
            <Cancel className="loginCancel" onClick={()=>setShowLogin(false)}/>


        </div>
    )
}