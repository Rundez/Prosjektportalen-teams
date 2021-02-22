import React from "react";


import { ITeamsWebPartProps } from '../TeamsWebPart';
import { escape } from '@microsoft/sp-lodash-subset';
import { Provider, teamsTheme, Button, Text, Header, Flex } from "@fluentui/react-northstar";
import { BrowserRouter as Router, Route, Switch , Redirect} from 'react-router-dom';
import { RiskPage } from './RiskPage/index'
import { Home } from './Home/Home';
import { ProjectStatus } from './ProjectStatus/index'
import Navbar from './Navigation/index'


import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

export const Teams: React.FunctionComponent<ITeamsWebPartProps> = (props) => {
  console.log(props.context);

  return (
    <Router>
      <Provider theme={teamsTheme}>
        <div style={{ backgroundColor: style.backgroundColor }}>
          <Navbar />
          <Switch>

            <Route path="/" render={() => <Home teamsContext={props.teamsContext} />} exact />
            <Route path="/riskmatrix" render={() => <RiskPage height={props.riskMatrixHeight} width={props.riskMatrixWidth} listName={props.riskMatrixListName} context={props.context} />} />
            <Route path="/projectstatus" component={ProjectStatus} />
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
