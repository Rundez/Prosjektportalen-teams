import React from 'react';

import { ITeamsWebPartProps } from '../TeamsWebPart';
import { Provider, teamsTheme, Button, Text, Header, Flex } from "@fluentui/react-northstar";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { RiskMatrix } from './RiskMatrix/index'
import { Home } from './Home/Home';
import { ProjectStatus } from './ProjectStatus/index'
import  NavbarV1 from './Navigation/NavBarv1'

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
        <NavbarV1 />
        <Switch>
          <Route path="/" render={() => <Home teamsContext={props.teamsContext} />} exact />
          <Route path="/riskmatrix" render={ () => <RiskMatrix height={props.riskMatrixHeight} width={props.riskMatrixWidth}/>} />
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

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);