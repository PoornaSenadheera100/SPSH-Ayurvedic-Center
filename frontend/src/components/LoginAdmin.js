import { useState } from "react";
import axios from 'axios';

export default function LoginAdmin(){

    if(sessionStorage.getItem("sAyurCenNimda") !== null){
        window.location.replace("/adminhome");
    }

    const [email, setEmail] = useState({});
    const [password, setPassword] = useState({});

    function validate(e){
        e.preventDefault();
        axios.get(`http://localhost:8070/admin/get/email/${email}`).then((res)=>{
            console.log(res.data);
            if (res.data[0].password === password){
                sessionStorage.setItem("sAyurCenNimda", Math.random().toString());
                window.location.replace(`http://localhost:3000/adminhome`);
            }
            else{
                alert("Invalid Credentials!");
            }
        }).catch((err)=>{
            alert(err.message);
        })
    }

    return(
        <div>
            <a href="/"><button>Back</button></a>
            
            <h1>This is Admin Login</h1>

            <form onSubmit={validate}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="abc@gmail.com" required onChange={(e)=>{
                    setEmail(e.target.value);
                }}/>

                <br></br>

                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="Password" required onChange={(e)=>{
                    setPassword(e.target.value);
                }}/>

                <br></br>

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}