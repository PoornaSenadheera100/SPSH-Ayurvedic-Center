export default function Welcome(){

    return(
        <div className="container">
            <center>
                <div align="center" style={{border: '1px solid black', borderRadius: '5px', padding: '20px', maxWidth: '500px', margin: '0 auto', background: '#f8f9fa'}}>
                    <h1 style={{fontSize: '36px', fontWeight: 'bold', color: '#000080'}}>Welcome</h1>
                    <br></br>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <a href="/buyerlogin" style={{textDecoration: 'none'}}>
                            <div style={{backgroundColor: '#000080', borderRadius: '5px', padding: '20px', height: '200px', width: '200px', margin: '0 10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                <h3 style={{margin: '0', color: '#fff', fontSize: '24px'}}>Buyer Login</h3>
                            </div>
                        </a>
                        <a href="/sellerlogin" style={{textDecoration: 'none'}}>
                            <div style={{backgroundColor: '#085548', borderRadius: '5px', padding: '20px', height: '200px', width: '200px', margin: '0 10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                <h3 style={{margin: '0', color: '#fff', fontSize: '24px'}}>Seller Login</h3>
                            </div>
                        </a>
                    </div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <p className="mb-0" style={{color: '#000080', fontSize: '16px'}}>Are you an administrator? <a href="/adminlogin" className="text-black-50 fw-bold" style={{color: '#ffc107'}}>Log in here.</a></p>
                </div>
            </center>
        </div>
    )
}
