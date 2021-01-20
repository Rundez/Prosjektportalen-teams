import * as React from 'react';

import styles from './Teams.module.scss';
import { ITeamsWebPartProps } from '../TeamsWebPart';
import { escape } from '@microsoft/sp-lodash-subset';
import { Provider, teamsTheme, Button, Text, Header, Flex } from "@fluentui/react-northstar";

import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

export default function Teams(props: ITeamsWebPartProps) {
  const [items, setItems] = React.useState([{}]);

  React.useEffect(() => {
    fetchList();
  }, [])

  async function fetchList() {
    const data: any[] = await sp.web.lists.getByTitle("usikkerhet").items.get();

    setItems(data);
    console.log(data[0].Title);
    console.log(items);
    console.log(data);

  }

  return (
    <Provider theme={teamsTheme}>
      <div style={{paddingTop: 5, paddingBottom: 5, backgroundColor: "grey"}}>
        <Header content="Welcome to prosjektportalen for Teams"  />
      </div>
      <Flex>
        <Text content={`Property pane value: ${props.projectUrl}`} />
      </Flex>
      GOOD SHIT
      <Flex>
      </Flex>
    </Provider>
  );

}
