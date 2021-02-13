import React from 'react';

import { ITeamsWebPartProps } from '../TeamsWebPart';
import { escape } from '@microsoft/sp-lodash-subset';
import { Provider, teamsTheme, Button, Text, Header, Flex } from "@fluentui/react-northstar";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Navigation/Navbar';
import { RiskPage } from './RiskPage/index'
import { Home } from './Home/Home';
import { ProjectStatus } from './ProjectStatus/index'


import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

export default function Teams(props: ITeamsWebPartProps) {
  const [items, setItems] = React.useState([]);
  return (
    <Router>
      <Provider theme={teamsTheme}>
        <div style={{ backgroundColor: style.backgroundColor }}>
          <Navbar />
          <Switch>
            <Route path="/riskmatrix" render={() => <RiskPage height={props.riskMatrixHeight} width={props.riskMatrixWidth} listName={props.riskMatrixListName} context={props.context}/>} />
            <Route path="/projectstatus" component={ProjectStatus} />
            <Route path="*" render={() => <Home />} exact />

          </Switch>
        </div>
      </Provider>
    </Router>
  );
}

const style = {
  backgroundColor: "rgb(243, 242, 241)"
}