import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import AddItem from './components/AddItem';

function App() {
  return (
    <Router>
    <div className="App">
      <Route path="/item/add/" exact component={AddItem}></Route>
     
    </div>
    </Router>
  );
}

export default App;
