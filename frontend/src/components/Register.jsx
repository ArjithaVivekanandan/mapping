import axios from "axios";

import "./register.css"
import {Room,Cancel} from '@material-ui/icons'
import { useState,useRef } from "react"




export default function Register({setShowRegister}){

    const [success,setSuccess] = useState(false);
    const [error,setError]= useState(false);
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

const handleSubmit = async(e)=>{
    e.preventDefault();
    const newUser = {
        username:nameRef.current.value,
        email:emailRef.current.value,
        password:passwordRef.current.value
    };
    try{

        const res = await axios.post("users/register",newUser);
        setError(false)
        setSuccess(true)
    }
    catch(err){
        setSuccess(false);
        setError(true);
        console.log(err)
    }
}
    return (
        <div className="registerContainer">
            
            <div className="logo">
                <Room/>
                Mapping
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="username" ref={nameRef}></input>
                <input type="email" placeholder="email" ref={emailRef}></input>

                <input type="password" placeholder="password" ref={passwordRef}></input>
                <button className="registerButton">Register</button>
                {success &&
                <span className="success">Successful..You can Login now!</span>
}
{error && 
                <span className="failure">Sorry..Registration Unsuccessful!</span>
}

            </form>
            <Cancel className="registerCancel" onClick={()=>setShowRegister(false)}/>


        </div>
    )
}