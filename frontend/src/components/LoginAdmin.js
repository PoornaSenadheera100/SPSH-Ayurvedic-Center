import { useState } from "react";
import axios from 'axios';

export default function LoginAdmin(){

    const [email, setEmail] = useState({});
    const [password, setPassword] = useState({});

    function validate(e){
        e.preventDefault();
        axios.get(`http://localhost:8070/admin/get/email/${email}`).then((res)=>{
            console.log(res.data);
            if (res.data[0].password == password){
                console.log("Done");
            }
            else{
                console.log("err");
            }
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

                <label for="password">Password</label>
                <input type="password" id="password" placeholder="Password" required onChange={(e)=>{
                    setPassword(e.target.value);
                }}/>

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}