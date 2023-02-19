import './App.css';
import { BrowserRouter as Router, Route, } from "react-router-dom";
// import Header from './components/Header';
import Welcome from './components/Welcome';
import LoginBuyer from './components/LoginBuyer';
import LoginSeller from './components/LoginSeller';
import LoginAdmin from './components/LoginAdmin';
import HomeAdmin from './components/HomeAdmin';
import HomeBuyer from './components/HomeBuyer';

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
    </Router>
  );
}

export default App;
