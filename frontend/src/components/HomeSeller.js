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
            <div align="center" style={{ border: '1px solid black', borderRadius: '5px', padding: '20px', maxWidth: '500px', margin: '0 auto', background: '#f8f9fa' }}>
    <center style={{ display: 'flex', justifyContent: 'space-between' }}>
        <a href="/sellerhome/item">
            <button className="btn btn-primary btn-lg" style={{ width: '200px', height: '200px' }}>
                Manage Items
            </button>
        </a>
        {'      '}
        <a href="/sellerhome/delivery">
            <button className="btn btn-primary btn-lg" style={{ width: '200px', height: '200px' }}>
                Delivery Requests
            </button>
        </a>
    </center>
</div>

        </div>  
    )
}