export default function Welcome(){

    return(
        <div className="container">
            <center>
                <div align="center" style={{border: '1px solid black', borderRadius: '5px', padding: '10px', maxWidth: '500px', margin: '0 auto'}}>
                    <h1>Welcome</h1>
                    <br></br>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <a href="/buyerlogin" style={{textDecoration: 'none'}}>
                        {/* Add css to the cart */}
                            <div style={{backgroundColor: '#000080', borderRadius: '5px', padding: '10px', height: '200px', width: '200px', margin: '0 10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                         {/* Add css to the letters inside the card */}
                                <h3 style={{margin: '0', color: '#fff'}}>Buyer Login</h3>
                            </div>
                        </a>
                        <a href="/sellerlogin" style={{textDecoration: 'none'}}>
                            <div style={{backgroundColor: '#085548', borderRadius: '5px', padding: '10px', height: '200px', width: '200px', margin: '0 10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                <h3 style={{margin: '0', color: '#fff'}}>Seller Login</h3>
                            </div>
                        </a>
                    </div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <p className="mb-0">Are you an administrator? <a href="/adminlogin" className="text-black-50 fw-bold">Log in here.</a></p>
                </div>
            </center>
        </div>
    )
}
