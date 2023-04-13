export default function HomeAdmin(){

    if(sessionStorage.getItem("sAyurCenNimda") === null){
        window.location.replace("/adminlogin");
    }

    return(
        <div className="container">
            <a href="/" style={{float: "right"}} onClick={()=>{
                sessionStorage.removeItem("sAyurCenNimda");
            }}>
                <button style={{margin: '10px', padding: '10px', backgroundColor: 'transparent', color: 'red', borderColor: 'red', borderWidth: '1px', borderStyle: 'solid'}}>Signout</button> </a>
                
    
                <h1 align="center" style={{fontSize: '36px'}}>Welcome to Admin Home</h1>
  
  <br></br><br></br>
    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center',  height: '100vh'}}>
    
    <a href="/adminhome/managebuyers">
      <button style={{margin: '10px', padding: '20px 40px', backgroundColor: '#007bff', color: 'white', borderColor: '#007bff', borderWidth: '1px', borderStyle: 'solid', borderRadius: '5px', fontSize: '28px', height: '350px'}}>
        Manage Buyers
      </button>
    </a>
    <a href="/adminhome/managesellers">
      <button style={{margin: '10px', padding: '20px 40px', backgroundColor: '#28a745', color: 'white', borderColor: '#28a745', borderWidth: '1px', borderStyle: 'solid', borderRadius: '5px', fontSize: '28px', height: '350px'}}>
        Manage Sellers
      </button>
    </a>
    <a href="/adminhome/manageorders">
      <button style={{margin: '10px', padding: '20px 40px', backgroundColor: '#fd7e14', color: 'white', borderColor: '#fd7e14', borderWidth: '1px', borderStyle: 'solid', borderRadius: '5px', fontSize: '28px', height: '350px'}}>
        Manage Orders
      </button>
    </a>
</div>




                {/* <button className="btn btn-outline-danger">Signout</button></a>

             <h1 align="Center">Welcome to Admin Home</h1> 
           

            <a href="/adminhome/managebuyers"><button>Manage Buyers</button></a> 
            <a href="/adminhome/managesellers"><button>Manage Sellers</button></a>
            <a href="/adminhome/manageorders"><button>Manage Orders</button></a>   */}
            
        </div>
      
    )
}