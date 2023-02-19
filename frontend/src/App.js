import './App.css';
import { BrowserRouter as Router, Route, } from "react-router-dom";
// import Header from './components/Header';
import Welcome from './components/Welcome';

function App() {
  return (
    <Router>
      {/* <Header/> */}
      <Route path = '/' exact component = {Welcome}/>
    </Router>
  );
}

export default App;
