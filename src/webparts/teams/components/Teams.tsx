import * as React from 'react';

import styles from './Teams.module.scss';
import { ITeamsWebPartProps } from '../TeamsWebPart';
import { escape } from '@microsoft/sp-lodash-subset';
import { Provider, teamsTheme, Button, Text, Header, Flex } from "@fluentui/react-northstar";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Navigation/Navbar';
import { RiskMatrix } from './RiskMatrix/index'
import Home from './Home/Home';


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

  console.log(items);

  return (
    <Router>
      <Provider theme={teamsTheme}>
        <Navbar />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/riskmatrix" component={RiskMatrix}/>
        </Switch>
      </Provider>
    </Router>


  );

}
