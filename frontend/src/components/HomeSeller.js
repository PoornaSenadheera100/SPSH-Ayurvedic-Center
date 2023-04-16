export default function HomeSeller(){

    if(sessionStorage.getItem("sAyurCenRelles") === null){
        window.location.replace("/sellerlogin");
    }

    return(
    <div>
        <a href="/" style={{float: "right"}} onClick={()=>{
                sessionStorage.removeItem("sAyurCenRelles");
                sessionStorage.removeItem("sellerEmail");
            }}>
            <button className="btn btn-outline-danger">Signout</button>
        </a>
        <h1 className="text-center">Seller Home</h1>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <div align="center" style={{ border: '1px solid black', borderRadius: '5px', padding: '20px', maxWidth: '500px', background: '#f8f9fa' }}>  
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <a href="/sellerhome/item">
                        <button className="btn btn-primary btn-lg" style={{ width: '200px', height: '200px', backgroundColor: 'blue', marginRight: '10px' }}>
                        Manage Items
                        </button>
                    </a>
                    <a href="/sellerhome/delivery">
                        <button className="btn btn-secondary btn-lg" style={{ width: '200px', height: '200px', backgroundColor: 'green' }}>
                        Delivery Requests
                        </button>
                    </a>
                </div>
            </div>
        </div>
    </div>



        
    )
}