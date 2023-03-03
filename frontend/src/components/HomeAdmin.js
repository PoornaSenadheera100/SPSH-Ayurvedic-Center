export default function HomeAdmin(){

    if(sessionStorage.getItem("sAyurCenNimda") === null){
        window.location.replace("/adminlogin");
    }

    return(
        <div>
            <a href="/" onClick={()=>{
                sessionStorage.removeItem("sAyurCenNimda");
            }}><button>Signout</button></a>

            <h1>Welcome to Admin Home</h1>

            <a href="/adminhome/managebuyers"><button>Manage Buyers</button></a>
            <a href="/adminhome/managesellers"><button>Manage Sellers</button></a>
        </div>
    )
}