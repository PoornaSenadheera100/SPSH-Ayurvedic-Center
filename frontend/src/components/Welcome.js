export default function Welcome(){
    return(
        <div className="container">
            <center>
            <div align="center" style={{border: '1px solid black', borderRadius: '5px', padding: '10px', maxWidth: '500px', margin: '0 auto'}}>
                <h1>Welcome</h1>
                <br></br>
                <a href="/buyerlogin"><button className="btn btn-primary btn-lg">Buyer Login</button></a>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <a href="/sellerlogin"><button className="btn btn-warning btn-lg">Seller Login</button></a>
                <br></br>
                <br></br>
                <br></br>
                <p className="mb-0">Are you an administrator? <a href="/adminlogin" className="text-black-50 fw-bold">Log in here.</a></p>
            </div>
            </center>
        </div>
    
    )
}