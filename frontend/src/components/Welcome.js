export default function Welcome(){
    return(
        <div className="container">
            <center>
                <h1>Welcome to SPSH Ayurvedic Center</h1>
                <br></br>
                <a href="/buyerlogin"><button className="btn btn-primary btn-lg">Buyer Login</button></a>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <a href="/sellerlogin"><button className="btn btn-warning btn-lg">Seller Login</button></a>
                <br></br>
                <br></br>
                <br></br>
                <p className="mb-0">Are you an administrator? <a href="/adminlogin" className="text-black-50 fw-bold">Log in here.</a></p>
            </center>
        </div>
    )
}