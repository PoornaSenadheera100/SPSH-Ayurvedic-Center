export default function HomeSeller(){

    if(sessionStorage.getItem("sAyurCenRelles") === null){
        window.location.replace("/sellerlogin");
    }

    return(
        <div>
            <a href="/" onClick={()=>{
                sessionStorage.removeItem("sAyurCenRelles");
            }}><button>Signout</button></a>
            
            <h1>This is Seller Home</h1>
        </div>
    )
}