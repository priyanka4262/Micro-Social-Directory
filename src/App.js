import './App.scss';
import {Route, Switch } from "react-router";
import GetData from "./MicroSocialDirectory/GetData";
import DisplayUserDetails from "./MicroSocialDirectory/DisplayUserDetails";

function App() {
  return (
    <>
    <header className="header  text-center">
      Micro Social Directory
    </header>
    <Switch>
      <Route exact path="/" component={GetData}></Route>
      <Route path="/userDetails/:id" component={DisplayUserDetails}></Route>
    </Switch>
    <footer className="footer mt-3 text-center">
      Copyright @2021
    </footer>
    </>
  );
}

export default App;
