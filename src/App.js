import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./component/Home";
import DogForms from "./component/DogForms";
import CardDetails from "./component/CardDetails";
import Error from './component/Error';




function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path ="/" component={Home}/>
        <Route exact path="/dog" component={DogForms}/>
        <Route exact path="/dogs/:id" component={CardDetails} />
        <Route path="/" component={Error}/>


        </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
