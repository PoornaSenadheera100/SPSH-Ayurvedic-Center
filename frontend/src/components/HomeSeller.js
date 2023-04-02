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
            
            <h1>This is Seller Home</h1>

            <a href="/sellerhome/item"><button>Manage Items</button></a>
            
        </div>
    )
}