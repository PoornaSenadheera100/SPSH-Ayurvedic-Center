import axios from "axios"
import { useEffect, useState } from "react"

export default function MyOrders(){

    if (sessionStorage.getItem("sAyurCenReyub") === null) {
        window.location.replace("/buyerlogin");
    }

    const buyerEmail = sessionStorage.getItem("buyerEmail");
    const [orders, setOrders] = useState([]);

    useEffect(()=>{
        axios.get(`http://localhost:8070/order/get/${buyerEmail}`).then((res)=>{
            setOrders(res.data);
            console.log(res.data);
        })
    }, [])


    return(
        <div>
<a href="/buyerhome"><button className="btn btn-dark"style={{ display: 'inline-block', textAlign: 'left',marginLeft: '10px' }}>Back</button></a>
       
        <div className="container">
            
            <center><h1>My Orders</h1></center>

            {orders.length === 0 && <h1>No Orders</h1>}

            {orders.length !== 0 &&
                <table className="table table-borderless" >
                    <tr>
                        <th><center>Reference No.</center></th>
                        <th><center>Payment Method</center></th>
                        <th><center>Payement Status</center></th>
                        <th><center>Approval Status</center></th>
                        <th></th>
                    </tr>

                    <tbody>
                        {
                            orders.map((order)=>(
                                <tr>
                                    <td><center>{order.orderRef}</center></td>
                                    <td><center>{order.paymentmethod}</center></td>
                                    <td><center>{order.status}</center></td>
                                    <td style={{ color: order.appStatus === 'Rejected' ? 'red' : order.appStatus === 'Approved' ? 'green' : 'orange' }}><center>{order.appStatus}</center></td>
                                    <td>
                                        <button className="btn btn-warning btn-sm" onClick={()=>{
                                            window.location.replace(`http://localhost:3000/buyerhome/myorders/${order.orderRef}`);
                                        }}>View <i class="fa fa-pencil"></i></button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            }
        </div>
        </div>
    )
}