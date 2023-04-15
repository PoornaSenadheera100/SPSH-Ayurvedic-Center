export default function HomeSeller(){

    if(sessionStorage.getItem("sAyurCenRelles") === null){
        window.location.replace("/sellerlogin");
    }

    return(
        <div className="container">
            <a href="/" style={{float: "right"}} onClick={()=>{
                sessionStorage.removeItem("sAyurCenRelles");
                sessionStorage.removeItem("sellerEmail");
            }}><button className="btn btn-outline-danger">Signout</button></a>
            
            <center><h1>Seller Home</h1></center>
            {/* <h1>Hello {sessionStorage.getItem("sellerEmail")}</h1> */}

            <center>
                <a href="/sellerhome/item"><button className="btn btn-primary btn-lg">Manage Items</button></a>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <a href="/sellerhome/delivery"><button className="btn btn-primary btn-lg">Delivery Requests</button></a>
            </center>
        </div>
    )
}