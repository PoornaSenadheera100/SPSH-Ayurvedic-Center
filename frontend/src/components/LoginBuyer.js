import axios from "axios";
import { useState } from "react";
import Button from 'react-bootstrap/Button';

export default function LoginBuyer(){

    if(sessionStorage.getItem("sAyurCenReyub") !== null){
        window.location.replace("/buyerhome");
    }

    const [email, setEmail] = useState({});
    const [password, setPassword] = useState({});

    function validate(e){
        e.preventDefault();
        axios.get(`http://localhost:8070/buyer/get/email/${email}`).then((res)=>{
            if (res.data[0].password === password){
                sessionStorage.setItem("sAyurCenReyub", Math.random().toString());
                sessionStorage.setItem("buyerEmail", email);
                window.location.replace(`http://localhost:3000/buyerhome`);
            }
            else{
                alert("Invalid Credentials !");
            }
        }).catch((err)=>{
            alert("Please register your account !");
        })
    }

    return(
        
        <div className="container">
            <a href="/"><Button variant="dark">Back</Button></a>
            <form onSubmit={validate}>
                <section className="vh-100 gradient-custom">
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                                <div className="card bg-dark text-white" style={{borderRadius: "1rem"}}>
                                    <div className="card-body p-5 text-center">

                                        <div className="mb-md-5 mt-md-4 pb-5">

                                            <h2 className="fw-bold mb-2 text-uppercase">Buyer Login</h2>
                                            <p className="text-white-50 mb-5">Please enter your email and password!</p>

                                            <div className="form-outline form-white mb-4">
                                                <input type="email" id="email" className="form-control form-control-lg" placeholder="abc@gmail.com" required onChange={(e)=>{
                                                    setEmail(e.target.value);
                                                }}/>
                                                <label className="form-label" htmlFor="typeEmailX">Email</label>
                                            </div>

                                            <div className="form-outline form-white mb-4">
                                                <input type="password" id="password" className="form-control form-control-lg" placeholder="Password" required onChange={(e)=>{
                                                    setPassword(e.target.value);
                                                }}/>
                                                <label className="form-label" htmlFor="typePasswordX">Password</label>
                                            </div>

                                            <button className="btn btn-outline-light btn-lg px-5" type="submit">Login</button>

                                        </div>

                                        <div>
                                            <p className="mb-0">Don't have an account? <a href="/buyersignup" className="text-white-50 fw-bold">Sign Up</a>
                                            </p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </form>





        </div>
    )
}