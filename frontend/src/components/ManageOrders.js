export default function ManageOrders(){

    if(sessionStorage.getItem("sAyurCenNimda") === null){
        window.location.replace("/adminlogin");
    }

    return(
        <div className = "container">
            <h1>Manage Orders</h1>
        </div>
    )
}