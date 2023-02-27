import axios from "axios";
import { useEffect, useState } from "react";

export default function ManageSellers(){

    const [sellers, setSellers] = useState([]);
    
    useEffect(()=>{
        function getSellers(){
            axios.get("http://localhost:8070/seller/").then((res)=>{
                setSellers(res.data);
            }).catch((err)=>{
                alert(err.message);
            })
        }
        getSellers();
    }, [])

    return(
        <div>
            <a href="/adminhome"><button>Back</button></a>
            <h1>Manage Sellers here</h1>

            <a href="/adminhome/managesellers/add"><button>Add</button></a>

            {sellers.length === 0 && <h1>No Records</h1>}

            {sellers.length !== 0 &&
                <table className="table table-borderless" >
                    <tr>
                        <th><center>Name</center></th>
                        <th><center>Email</center></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>

                    <tbody>
                        {
                            sellers.map((seller)=>(
                                <tr>
                                    <td><center>{seller.name}</center></td>
                                    <td><center>{seller.email}</center></td>
                                    <td>
                                        <button className="btn btn-success btn-sm" onClick={()=>{
                                            window.location.replace(`http://localhost:3000/adminhome/managesellers/view/${seller.email}`);
                                        }}>View <i class="fa fa-pencil"></i></button>
                                    </td>
                                    <td>
                                        <button className="btn btn-success btn-sm" onClick={()=>{
                                            window.location.replace(`http://localhost:3000/adminhome/managesellers/update/${seller.email}`);
                                        }}>Update <i class="fa fa-pencil"></i></button>
                                    </td>
                                    <td>
                                        <button className="btn btn-danger btn-sm" onClick={()=>{
                                            window.location.replace(`http://localhost:3000/adminhome/managesellers/delete/${seller.email}`);
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