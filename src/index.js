import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Match from "./pages/Match";
import Emissions from "./pages/Emissions";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
   <Switch>
    <Route exact path="/" component={Match} />
    <Route path="/emissions" component={Emissions} />
  </Switch>
  </BrowserRouter>,
  rootElement
);
