import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import AddItem from './components/AddItem';
import DeleteItem from './components/DeleteItem';
import AllItems from './components/AllItems';

function App() {
  return (
    <Router>
    <div className="App">
      <Route path="/item/add/" exact component={AddItem}></Route>
     <Route path="/item" exact component={AllItems}></Route>
     <Route path="/item/delete/:id" exact componenet={DeleteItem}></Route>
    </div>
    </Router>
  );
}

export default App;
