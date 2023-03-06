import React from 'react';
import logo from '../images/spsh_logo.png'

export default function Header(){
    return(
        <div>
            <nav className='navbar fixed-top bg-dark' style={{color:"white"}}>
                <div className='row'>
                    <div className='col-3'>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <img src={logo} width="40%" alt='Logo'></img>
                    </div>
                    <div className='col' style={{fontSize:"80px"}}>
                        <b>SPSH Ayurvedic Center</b>
                    </div>
                </div>
            </nav>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        </div>
    )
}
