import axios from "axios"
import { useState } from "react";
import { useEffect } from "react"

export default function DeliveryRequests(){

    if(sessionStorage.getItem("sAyurCenRelles") === null){
        window.location.replace("/sellerlogin");
    }

    const agentEmail = sessionStorage.getItem("sellerEmail");

    const[delRequests, setDelRequests] = useState([]);

    useEffect(()=>{
        axios.get(`http://localhost:8070/order/getdeliveries/${agentEmail}`).then((res)=>{
            console.log(res.data);
            setDelRequests(res.data);
        })
    }, []);

    return(
        <div className="container">
            <a href="/sellerhome"><button className="btn btn-dark">Back</button></a>
            <center><h1>Delivery Requests</h1></center>
            {delRequests.length === 0 && <h1>No Orders</h1>}

            {delRequests.length !== 0 &&
                <table className="table table-borderless" >
                    <tr>
                        <th><center>Reference No.</center></th>
                        <th><center>Customer Name</center></th>
                        <th><center>Customer Address</center></th>
                        <th><center>Contact No.</center></th>
                        <th><center>Payment Method</center></th>
                        <th></th>
                        <th></th>
                    </tr>

                    <tbody>
                        {
                            delRequests.map((delRequest)=>(
                                <tr>
                                    <td><center>{delRequest.orderRef}</center></td>
                                    <td><center>{delRequest.buyername}</center></td>
                                    <td><center>{delRequest.buyeraddress}</center></td>
                                    <td><center>{delRequest.buyerphone}</center></td>
                                    <td><center>{delRequest.paymentmethod}</center></td>
                                    <td>
                                        <button className="btn btn-warning btn-sm" onClick={()=>{
                                            window.location.replace(`http://localhost:3000/sellerhome/delivery/${delRequest.orderRef}`);
                                        }}>View <i class="fa fa-pencil"></i></button>
                                    </td>
                                    <td>
                                        <button className="btn btn-success btn-sm" onClick={()=>{
                                            delRequest.status = "Paid. Delivered."
                                            var response = window.confirm("Are you sure you want to mark this order as Delivered?");
                                            if (response){
                                                axios.put(`http://localhost:8070/order/approvalprocess/${delRequest.orderRef}`, delRequest).then(()=>{
                                                    alert("Order marked as Delivered!");
                                                    window.location.replace("http://localhost:3000/sellerhome/delivery");
                                                }).catch((err)=>{
                                                    alert(err);
                                                })
                                            }
                                        }}>Mark as Delivered <i class="fa fa-pencil"></i></button>
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