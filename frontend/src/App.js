import './App.css';
import { BrowserRouter as Router, Route, } from "react-router-dom";
// import Header from './components/Header';
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

function App() {
  return (
    <Router>
      {/* <Header/> */}
      <Route path = '/' exact component = {Welcome}/>
      <Route path = '/buyerlogin' exact component = {LoginBuyer}/>
      <Route path = '/sellerlogin' exact component = {LoginSeller}/>
      <Route path = '/adminlogin' exact component = {LoginAdmin}/>

      <Route path = '/adminhome' exact component={HomeAdmin}/>
      <Route path = '/buyerhome' exact component={HomeBuyer}/>
      <Route path = '/sellerhome' exact component={HomeSeller}/>

      <Route path='/buyersignup' exact component={SignupBuyer}/>

      <Route path = '/adminhome/managebuyers' exact component={ManageBuyers}/>
      <Route path = '/adminhome/managesellers' exact component={ManageSellers}/>
      <Route path = '/adminhome/managesellers/add' exact component={AddSeller}/>
    </Router>
  );
}

export default App;
