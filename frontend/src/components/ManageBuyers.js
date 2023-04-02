import axios from "axios";
import { useEffect, useState } from "react";

export default function ManageBuyers(){

    if(sessionStorage.getItem("sAyurCenNimda") === null){
        window.location.replace("/adminlogin");
    }

    const [buyers, setBuyers] = useState([]);
    
    useEffect(()=>{
        function getBuyers(){
            axios.get("http://localhost:8070/buyer/").then((res)=>{
                setBuyers(res.data);
            }).catch((err)=>{
                alert(err.message);
            })
        }
        getBuyers();
    }, []);

    return(
        <div>
            <a href="/adminhome"><button>Back</button></a>

            <h1>Manage Buyers here</h1>

            {/* <a href="/adminhome/managebuyers/add"><button>Add</button></a> */}

            {buyers.length === 0 && <h1>No Records</h1>}

            {buyers.length !== 0 &&
                <table className="table table-borderless" >
                    <thead>
                        <tr>
                            <th><center>Name</center></th>
                            <th><center>Email</center></th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            buyers.map((buyer)=>(
                                <tr>
                                    <td><center>{buyer.name}</center></td>
                                    <td><center>{buyer.email}</center></td>
                                    <td>
                                        <button className="btn btn-success btn-sm" onClick={()=>{
                                            window.location.replace(`http://localhost:3000/adminhome/managebuyers/view/${buyer.email}`);
                                        }}>View <i class="fa fa-pencil"></i></button>
                                    </td>
                                    <td>
                                        <button className="btn btn-success btn-sm" onClick={()=>{
                                            window.location.replace(`http://localhost:3000/adminhome/managebuyers/update/${buyer.email}`);
                                        }}>Update <i class="fa fa-pencil"></i></button>
                                    </td>
                                    <td>
                                        <button className="btn btn-danger btn-sm" onClick={()=>{
                                            var response = window.confirm("Are you sure you want to delete this user?");
                                            if (response){
                                                axios.delete(`http://localhost:8070/buyer/delete/email/${buyer.email}`).then(()=>{
                                                    alert("Buyer Deleted");
                                                    window.location.replace("http://localhost:3000/adminhome/managebuyers");
                                                }).catch((err)=>{
                                                    alert(err);
                                                })
                                            }
                                        }}>Delete <i class="fa fa-trash-o fa-lg"></i></button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            }
        </div>
    )
}