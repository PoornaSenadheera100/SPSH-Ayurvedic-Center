import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";

export default function ViewBuyer() {
  if (sessionStorage.getItem("sAyurCenNimda") === null) {
    window.location.replace("/adminlogin");
  }

  const { email } = useParams();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [nic, setNic] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8070/buyer/get/email/${email}`)
      .then((res) => {
        setName(res.data[0].name);
        setAddress(res.data[0].address);
        setNic(res.data[0].nic);
        setPhone(res.data[0].phone);
      })
      .catch((err) => {
        alert("Network Issue...");
      });
  });

  return (
    <div>
      <a href="/adminhome/managebuyers">
        <Button variant="dark" style={{ marginLeft: "10px" }}>
          Back
        </Button>
      </a>
      <div
        className="container"
        style={{ margin: "auto", maxWidth: "500px", padding: "20px" }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
          View Buyer
        </h1>

        <div
          style={{
            border: "1px solid black",
            padding: "10px",
            textAlign: "justify",
            backgroundColor: "#f8f8f8",
            borderRadius: "50px",
            height: "200px",
          }}
        >
          <center>
            <br></br>
            <table>
              <tr>
                <td style={{ width: "200px" }}> Name</td>

                <td style={{ width: "200px" }}>:</td>

                <td style={{ width: "200px" }}>{name}</td>
              </tr>

              <tr></tr>

              <tr>
                <td> Address</td>
                <td>:</td>
                <td>{address}</td>
              </tr>

              <tr></tr>
              <tr>
                <td> Email</td>
                <td>:</td>
                <td>{email}</td>
              </tr>
              <tr></tr>
              <tr>
                <td> Phone</td>
                <td>:</td>
                <td>{phone}</td>
              </tr>
            </table>
          </center>
        </div>
      </div>
    </div>
  );
}
