import './App.css';
import { BrowserRouter as Router, Route, } from "react-router-dom";
import Header from './components/Header';
import Welcome from './components/Welcome';
import LoginBuyer from './components/LoginBuyer';
import LoginSeller from './components/LoginSeller';
import LoginAdmin from './components/LoginAdmin';
import HomeAdmin from './components/HomeAdmin';
import HomeBuyer from './components/HomeBuyer';
import HomeSeller from './components/HomeSeller';
import SignupBuyer from './components/SignupBuyer';
import ManageBuyers from './components/ManageBuyers';
import ManageSellers from './components/ManageSellers';
import AddSeller from './components/AddSeller';
import ViewBuyer from './components/ViewBuyer';
import UpdateBuyer from './components/UpdateBuyer';
import ViewSeller from './components/ViewSeller';
import UpdateSeller from './components/UpdateSeller';
import BuyerCart from './components/BuyerCart';

import AddItem from './components/AddItem';
import DeleteItem from './components/DeleteItem';
import AllItems from './components/AllItems';
import UpdateItem from './components/UpdateItem';
import BuyerViewItem from './components/BuyerViewItem';
import SingleItem from './components/SingleItem';
import ManageOrders from './components/ManageOrders';
import Checkout from './components/Checkout';
import MyOrders from './components/MyOrders';

function App() {
  return (
    <Router>
      <Header/>
      <Route path = '/' exact component = {Welcome}/>
      <Route path = '/buyerlogin' exact component = {LoginBuyer}/>
      <Route path = '/sellerlogin' exact component = {LoginSeller}/>
      <Route path = '/adminlogin' exact component = {LoginAdmin}/>

      <Route path = '/adminhome' exact component={HomeAdmin}/>
      <Route path = '/buyerhome' exact component={HomeBuyer}/>
      <Route path = '/sellerhome' exact component={HomeSeller}/>
      <Route path = '/buyer/view/item/:id' exact component={BuyerViewItem}/>
      <Route path = '/buyer/view/cart' exact component={BuyerCart}/>
      <Route path = '/buyer/view/cart/checkout' exact component={Checkout}/>

      <Route path= '/buyerhome/myorders' exact component={MyOrders}/>

      <Route path='/buyersignup' exact component={SignupBuyer}/>

      <Route path = '/adminhome/managebuyers' exact component={ManageBuyers}/>
      <Route path = '/adminhome/managesellers' exact component={ManageSellers}/>
      <Route path = '/adminhome/manageorders' exact component={ManageOrders}/>

      <Route path = '/adminhome/managesellers/add' exact component={AddSeller}/>

      <Route path = '/adminhome/managebuyers/view/:email' exact component={ViewBuyer}/>
      <Route path = '/adminhome/managebuyers/update/:paramemail' exact component={UpdateBuyer}/>

      <Route path = '/adminhome/managesellers/view/:email' exact component={ViewSeller}/>
      <Route path = '/adminhome/managesellers/update/:paramemail' exact component={UpdateSeller}/>
      
    
      <Route path="/sellerhome/item/add/" exact component={AddItem}></Route>
      <Route path="/sellerhome/item" exact component={AllItems}></Route>
      <Route path="/sellerhome/item/delete/:id" exact componenet={DeleteItem}></Route>
      <Route path="/sellerhome/item/update/:id" exact component={UpdateItem}></Route>
      <Route path="/sellerhome/item/get/:id" exact component={SingleItem}></Route>
    </Router>
  );
}

export default App;
