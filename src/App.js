import logo from "./logo.svg";
import "./App.css";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Overview from "./screens/Overview";
import Explorer from "./screens/Explorer";
require ('dotenv').config()

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/overview/:name">
          <Overview />
        </Route>
        <Route path="/">
          <Explorer />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
