import React from 'react';

import { ITeamsWebPartProps } from '../TeamsWebPart';
import { escape } from '@microsoft/sp-lodash-subset';
import { Provider, teamsTheme, Button, Text, Header, Flex } from "@fluentui/react-northstar";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { RiskPage } from './RiskPage/index'
import { Home } from './Home/Home';
import { ProjectStatus } from './ProjectStatus/index'
import  NavbarV1 from './Navigation/NavBarv1'

import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

export const Teams: React.FunctionComponent<ITeamsWebPartProps> = (props) => {
  
  console.log(props.context)

  return (
    <Router>
      <Provider theme={teamsTheme}>
        <div style={{ backgroundColor: style.backgroundColor }}>
          <NavbarV1 />
          <Switch>
            <Route path="/riskmatrix" render={() => <RiskPage height={props.riskMatrixHeight} width={props.riskMatrixWidth} listName={props.riskMatrixListName} context={props.context} />} />
            <Route path="/projectstatus" component={Status} />
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

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);