export default function HomeSeller(){

    if(sessionStorage.getItem("sAyurCenRelles") === null){
        window.location.replace("/sellerlogin");
    }

    return(
        <div>
            <a href="/" onClick={()=>{
                sessionStorage.removeItem("sAyurCenRelles");
                sessionStorage.removeItem("sellerEmail");
            }}><button>Signout</button></a>
            
            <h1>This is Seller Home</h1>

            <a href="/sellerhome/item"><button>Manage Items</button></a>
            
        </div>
    )
}