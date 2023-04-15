import axios from "axios";
import { useState } from "react";

export default function SignupBuyer(){

    const [name, setName] = useState({});
    const [address, setAddress] = useState({});
    const [nic, setNic] = useState({});
    const [email, setEmail] = useState({});
    const [phone, setPhone] = useState({});
    const [password, setPassword] = useState({});
    const [rePassword, setRePassword] = useState({});

    function proceed(e){
        e.preventDefault();

        if (password !== rePassword){
            alert("Re-entered password does not match with the password that you have entered!");
        }
        else{
            // checkAccount();
            axios.get(`http://localhost:8070/buyer/get/email/${email}`).then((res)=>{
                if (res.data[0] === undefined){
                    const newBuyer = {
                        name,
                        address,
                        nic,
                        email,
                        phone,
                        password
                    }

                    axios.post("http://localhost:8070/buyer/add", newBuyer).then(()=>{

                        axios.post(`http://localhost:8072/email/register/${name}/${email}`).catch((err)=>{
                            alert("Email Service is not available.");
                        });

                        alert("Registration Successfull !");
                        window.location.replace("http://localhost:3000");
                    }).catch((err)=>{
                        alert("Something went wrong !");
                    })
                }
                else{
                    alert("You already have an account !");
                }
            }).catch((err)=>{
                console.log(err);
            })
        }
    }

    return(
        <div className="container">
            <a href="/buyerlogin"><button className="btn btn-primary">Back</button></a>

            <form onSubmit={proceed}>
                <section className="vh-100 gradient-custom">
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                                <div className="card bg-dark text-white" style={{borderRadius: "1rem"}}>
                                    <div className="card-body p-5 text-center">

                                        <div className="mb-md-5 mt-md-4 pb-5">

                                            <h2 className="fw-bold mb-2 text-uppercase">Create Your Account</h2>
                                            <p className="text-white-50 mb-5">Please enter your details!</p>

                                            <div className="form-outline form-white mb-4">
                                                <input type="text" id="name" className="form-control form-control-lg" placeholder="Enter your name" pattern="[A-Za-z .]{1,100}" required onChange={(e)=>{
                                                    setName(e.target.value);
                                                }}/>
                                                <label className="form-label" htmlFor="name">Name</label>
                                            </div>

                                            <div className="form-outline form-white mb-4">
                                                <input type="text" id="address" className="form-control form-control-lg" placeholder="Enter your address" required onChange={(e)=>{
                                                    setAddress(e.target.value);
                                                }}/>
                                                <label className="form-label" htmlFor="address">Address</label>
                                            </div>

                                            <div className="form-outline form-white mb-4">
                                                <input type="text" id="nic" className="form-control form-control-lg" placeholder="Enter you NIC number" pattern="[0-9]{9}[V||v]|[0-9]{12}" required onChange={(e)=>{
                                                    setNic(e.target.value);
                                                }}/>
                                                <label className="form-label" htmlFor="nic">NIC</label>
                                            </div>

                                            <div className="form-outline form-white mb-4">
                                                <input type="email" id="email" className="form-control form-control-lg" placeholder="abc@gmail.com" required onChange={(e)=>{
                                                    setEmail(e.target.value);
                                                }}/>
                                                <label className="form-label" htmlFor="email">Email</label>
                                            </div>

                                            <div className="form-outline form-white mb-4">
                                                <input type="phone" id="phone" className="form-control form-control-lg" placeholder="Phone No" pattern="0[0-9]{9}" required onChange={(e)=>{
                                                    setPhone(e.target.value);
                                                }}/>
                                                <label className="form-label" htmlFor="phone">Phone</label>
                                            </div>

                                            <div className="form-outline form-white mb-4">
                                                <input type="password" id="newpassword" className="form-control form-control-lg" placeholder="Password" minLength="8" required onChange={(e)=>{
                                                    setPassword(e.target.value);
                                                }}/>
                                                <label className="form-label" htmlFor="password">New Password</label>
                                            </div>

                                            <div className="form-outline form-white mb-4">
                                                <input type="password" id="repassword" className="form-control form-control-lg" placeholder="Password" required onChange={(e)=>{
                                                    setRePassword(e.target.value);
                                                }}/>
                                                <label className="form-label" htmlFor="repassword">Re-enter Password</label>
                                            </div>

                                            <button className="btn btn-outline-light btn-lg px-5" type="submit">Create</button>

                                        </div>

                                        <div>
                                            <p className="mb-0">Do you have an account? <a href="/buyersignup" className="text-white-50 fw-bold">Sign Up</a>
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