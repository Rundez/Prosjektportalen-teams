import React from 'react';

import { ITeamsWebPartProps } from '../TeamsWebPart';
import { escape } from '@microsoft/sp-lodash-subset';
import { Provider, teamsTheme, Button, Text, Header, Flex } from "@fluentui/react-northstar";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Navigation/Navbar';
import { RiskMatrix } from './RiskMatrix/index'
import { Home } from './Home/Home';
import { ProjectStatus } from './ProjectStatus/index'


import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

export default function Teams(props: ITeamsWebPartProps) {
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    fetchList();
  }, []);

  async function fetchList() {
    const data: [] = await sp.web.lists.getByTitle("usikkerhet").items.get();
 
    setItems(data);
  }



  return (
    <Router>
      <Provider theme={teamsTheme}>
        <div style={{backgroundColor: style.backgroundColor}}>
        <Navbar />
        <Switch>
          <Route path="/" render={() => <Home teamsContext={props.teamsContext} />} exact />
          <Route path="/riskmatrix" render={ () => <RiskMatrix height={props.riskMatrixHeight} width={props.riskMatrixWidth} listName={props.riskMatrixListName}/>} />
          <Route path="/projectstatus" component={ProjectStatus}/>
        </Switch>
        </div>
      </Provider>
    </Router>
  );
}

const style = {
  backgroundColor: "rgb(243, 242, 241)"
}