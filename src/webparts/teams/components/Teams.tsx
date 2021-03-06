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
import { ProjectDeliveries } from "./Pages/Projectdeliveries/Projectdeliveries";
import { Intressentregister } from "./Pages/Intressentregister/Intressentregister";
import { Resourceallocation } from "./Pages/Resourceallocation/Resoucreallocation";
import { Communicationplan } from "./Pages/Communicationplan/Communicationplan";

export const Teams: React.FunctionComponent<ITeamsWebPartProps> = (props) => {
  return (
    <Router>
      <Provider theme={teamsTheme}>
        <div style={{ backgroundColor: style.backgroundColor }}>
          <Navbar terms={props.terms} />
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
            <Route
              path="/prosjektleveranser"
              render={() => <ProjectDeliveries context={props.context} />}
            />
            <Route
              path="/intressentregister"
              render={() => <Intressentregister context={props.context} />}
            />
            <Route
              path="/kommunikasjonsplan"
              render={() => <Communicationplan context={props.context} />}
            />
            <Route
              path="/ressursallokering"
              render={() => <Resourceallocation context={props.context} />}
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
