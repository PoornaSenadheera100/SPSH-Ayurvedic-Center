import { useParams } from "react-router-dom"

export default function SingleOrder(){

    const {orderRef} = useParams();

    return(
        <div className="container">
            <a href="/buyerhome/myorders"><button className="btn btn-dark">Back</button></a>
            <center><h1>Your Order</h1></center>
            {orderRef}
        </div>
    )
}