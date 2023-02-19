import { useState } from "react";
import axios from 'axios';

export default function LoginAdmin(){

    const [email, setEmail] = useState({});

    function validate(e){
        e.preventDefault();
        axios.get(`http://localhost:8070/admin/get/email/${email}`).then((res)=>{
            console.log(res.data);
        }).catch((err)=>{
            alert(err.message);
        })
    }

    return(
        <div>
            <h1>This is Admin Login</h1>

            <form onSubmit={validate}>
                <label for="email">Email</label>
                <input type="email" id="email" placeholder="abc@gmail.com" required onChange={(e)=>{
                    setEmail(e.target.value);
                }}/>
            </form>
        </div>
    )
}