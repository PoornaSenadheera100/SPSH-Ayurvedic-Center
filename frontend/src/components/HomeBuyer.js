export default function HomeBuyer(){

    if(sessionStorage.getItem("sAyurCenReyub") === null){
        window.location.replace("/buyerlogin");
    }

    return(
        <div>
            <a href="/" onClick={()=>{
                sessionStorage.removeItem("sAyurCenReyub");
            }}><button>Signout</button></a>
            
            <h1>Welcome to Buyer Home</h1>
        </div>
    )
}