export default function ManageOrders(){

    if(sessionStorage.getItem("sAyurCenNimda") === null){
        window.location.replace("/adminlogin");
    }

    return(
        <div className = "container">
            <a href="/adminhome"><button className="btn btn-primary">Back</button></a>
            <h1>Manage Orders here</h1>
        </div>
    )
}