import React from "react";

import { ITeamsWebPartProps } from "../TeamsWebPart";
import { escape } from "@microsoft/sp-lodash-subset";
import {
  Provider,
  teamsTheme,
  Button,
  Text,
  Header,
  Flex,
} from "@fluentui/react-northstar";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { RiskPage } from "./RiskPage/index";
import { Home } from "./Home/Home";
import Navbar from "./Navigation/index";
import { ProjectStatusPage } from "./ProjectStatusPage";

export const Teams: React.FunctionComponent<ITeamsWebPartProps> = (props) => {
  return (
    <Router>
      <Provider theme={teamsTheme}>
        <div style={{ backgroundColor: style.backgroundColor }}>
          <Navbar />
          <Switch>
            <Route
              path="/"
              render={() => (
                <Home
                  context={props.context}
                  listName={props.riskMatrixListName}
                />
              )}
              exact
            />
            <Route
              path="/riskmatrix"
              render={() => (
                <RiskPage
                  height={props.riskMatrixHeight}
                  width={props.riskMatrixWidth}
                  listName={props.riskMatrixListName}
                  context={props.context}
                />
              )}
            />
            <Route
              path="/projectstatus"
              render={() => <ProjectStatusPage context={props.context} />}
            />
            <Redirect to="/" />
          </Switch>
        </div>
      </Provider>
    </Router>
  );
};

const style = {
  backgroundColor: "rgb(243, 242, 241)",
};
