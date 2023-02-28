export default function HomeAdmin(){
    return(
        <div>
            <a href="/"><button>Signout</button></a>

            <h1>Welcome to Admin Home</h1>

            <a href="/adminhome/managebuyers"><button>Manage Buyers</button></a>
            <a href="/adminhome/managesellers"><button>Manage Sellers</button></a>
        </div>
    )
}