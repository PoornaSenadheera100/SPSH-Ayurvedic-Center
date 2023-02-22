export default function SignupBuyer(){

    

    return(
        <div>
            <h1>Create Your Account</h1>

            <form onSubmit={sendData}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" placeholder="Enter your name" required onChange={(e)=>{
                    setName(e.target.value);
                }}/>

                <br></br>

                <label htmlFor="address">Address</label>
                <input type="text" id="address" placeholder="Enter your address" required onChange={(e)=>{
                    setAddress(e.target.value);
                }}/>

                <br></br>

                <label htmlFor="nic">NIC</label>
                <input type="text" id="nic" placeholder="Enter you NIC number" required onChange={(e)=>{
                    setNic(e.target.value);
                }}/>

                <br></br>

                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="abc@gmail.com" required onChange={(e)=>{
                    setEmail(e.target.value);
                }}/>

                <br></br>

                <label htmlFor="phone">Phone</label>
                <input type="phone" id="phone" placeholder="Phone No" required onChange={(e)=>{
                    setPhone(e.target.value);
                }}/>

                <label htmlFor="newpassword">New Password</label>
                <input type="password" id="newpassword" placeholder="Password" required onChange={(e)=>{
                    setNewPassword(e.target.value);
                }}/>

                <br></br>

                <label htmlFor="repassword">Re-enter Password</label>
                <input type="password" id="repassword" placeholder="Password" required onChange={(e)=>{
                    setRePassword(e.target.value);
                }}/>

                <br></br>

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}