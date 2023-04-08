import axios from "axios";
import { useEffect, useState } from "react"

export default function ManageOrders(){

    if(sessionStorage.getItem("sAyurCenNimda") === null){
        window.location.replace("/adminlogin");
    }

    const [orders, setOrders] = useState([]);

    useEffect(()=>{
        axios.get("http://localhost:8070/order/getpendings").then((res)=>{
            setOrders(res.data);
            console.log(res.data);
        }).catch((err)=>{
            alert("Network Error...");
        })
    }, [])

    return(
        <div className = "container">
            <a href="/adminhome"><button className="btn btn-primary">Back</button></a>
            <center><h1>Manage Customer Orders</h1></center>

            {orders.length === 0 && <h1>No Orders</h1>}

            {orders.length !== 0 &&
                <table className="table table-borderless" >
                    <tr>
                        <th><center>Reference No.</center></th>
                        <th><center>Customer Name</center></th>
                        <th><center>Bill Amount</center></th>
                        <th><center>Approval Status</center></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>

                    <tbody>
                        {
                            orders.map((order)=>(
                                <tr>
                                    <td><center>{order.orderRef}</center></td>
                                    <td><center>{order.buyername}</center></td>
                                    <td><center>Rs.{parseFloat(order.totalamount).toFixed(2)}</center></td>
                                    <td><center>{order.appStatus}</center></td>
                                    <td>
                                        <button className="btn btn-warning btn-sm" onClick={()=>{
                                            window.location.replace(`http://localhost:3000/adminhome/manageorders/${order.orderRef}`);
                                        }}>View <i class="fa fa-pencil"></i></button>
                                    </td>
                                    <td>
                                        <button className="btn btn-success btn-sm" onClick={()=>{
                                            window.location.replace(`http://localhost:3000/buyerhome/myorders/${order.orderRef}`);
                                        }}>Approve <i class="fa fa-pencil"></i></button>
                                    </td>
                                    <td>
                                        <button className="btn btn-danger btn-sm" onClick={()=>{
                                            window.location.replace(`http://localhost:3000/buyerhome/myorders/${order.orderRef}`);
                                        }}>Reject <i class="fa fa-pencil"></i></button>
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