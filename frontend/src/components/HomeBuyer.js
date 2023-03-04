import React ,{useState,useEffect} from "react";
import axios from "axios";
import { useHistory} from "react-router-dom";

export default function HomeBuyer(){
    //session validation
    if(sessionStorage.getItem("sAyurCenReyub") === null){
        window.location.replace("/buyerlogin");
    }

    //Creating variables 
    const [items,setitems]=useState([]);
    let history = useHistory();


    useEffect(()=>{
        function getItems(){
            axios.get("http://localhost:8070/item/").then((res)=>{
                console.log(res.data);
                setitems(res.data);
            }).catch((err)=>{
                alert(err.message);
            })
        }
        getItems();

    },[])
    function checkStock() {
        // e.preventdefault();
        if (InvQuantity >= ReqQuantity) {
            setInvQuantity(InvQuantity - ReqQuantity);
            //if its is onChange --> use "let" variables.
            //if it is onClick --> can use both(const and let)
            alert("Stocks request granted");

        }
        else {
            alert("Request Denied");
        }
    }


    return(
        <div>
            <a href="/" onClick={()=>{
                sessionStorage.removeItem("sAyurCenReyub");
            }}><button>Signout</button></a>
            
            <h1>Welcome to Buyer Home</h1>

            <div>
            <center><h1>All featured items</h1></center>
            <table className="table table-borderless">
            <tr> 
                    <th>product ID</th>
                    <th>Item Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Action</th>
            </tr>
            <tbody>
                    {
                        items.map((item)=>(
                            <tr>
                                <td>{item.productId}</td>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>{item.price}</td>
                                <td>{item.quantity}</td>
                                <td><button>Add cart</button></td>
                                {/* <td>{item.total_Days}</td>  */}
                                
                                {/* <td><button className="btn btn-success" onClick={()=>{
                                    history.push(`/update/${leave._id}`);
                                    window.location.replace(`http://localhost:3000/leave/update/${leave._id}`);
                                }}>Update <i class="fa fa-pencil"></i></button></td>
                                <td><button className="btn btn-danger"onClick={()=>{
                                    history.push(`/delete/${leave._id}`);
                                    window.location.replace(`http://localhost:3000/leave/delete/${leave._id}`);
                                }}>Delete <i class="fa fa-trash-o"></i></button></td> */}

                             
            
                                
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            </div>











        </div>

        
    )
}