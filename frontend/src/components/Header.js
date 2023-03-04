import React from 'react';

export default function Header(){
    return(
<div>
        <nav className="navbar navbar-expand-lg" style={{backgroundColor:"#4F4845"}}>
          <div className="container-fluid">
            
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{margin:"center"}}>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/" style={{color:"white"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Employee Details &nbsp;&nbsp;&nbsp;&nbsp;</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/transport" style={{color:"white"}}>Transport Services &nbsp;&nbsp;&nbsp;&nbsp;</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/payroll" style={{color:"white"}}>Payroll &nbsp;&nbsp;&nbsp;&nbsp;</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/attendence" style={{color:"white"}}>Attendence &nbsp;&nbsp;&nbsp;&nbsp;</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/inventory" style={{color:"white"}}>Inventory Management &nbsp;&nbsp;&nbsp;&nbsp;</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/leave" style={{color:"white"}}>Leave Management &nbsp;&nbsp;&nbsp;&nbsp;</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/health" style={{color:"white"}}>Health and Benefit &nbsp;&nbsp;&nbsp;&nbsp;</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/skillmetric" style={{color:"white"}}>Skill Metric System &nbsp;&nbsp;&nbsp;&nbsp;</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        
        </div>

        
    )
}

