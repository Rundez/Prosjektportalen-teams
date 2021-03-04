import React, { FunctionComponent, useState, useEffect } from "react";
import {
  Text,
  Button,
  Flex,
  List,
  Header,
  Avatar,
  SplitButton,
  Dropdown,
} from "@fluentui/react-northstar";
import { IHomeProps } from "./types";
//import { IUser } from '../TeamMembers/types';
import HubSiteService from "sp-hubsite-service";

import { sp, SPRest } from "@pnp/sp";
import { Accordion, Label, Layout } from "@fluentui/react-northstar";
import { ErrorIcon, AudienceIcon } from "@fluentui/react-icons-northstar";
import { Minimizer, Boxes } from "./TeamMembers/index";
import { TeamMembers, DropdownSorting } from "./TeamMembers/index";
import { Checkbox } from "semantic-ui-react";
import { TestTable } from "../@Shared/ListDisplayTable/TestTable";
import { ProjectStatus } from "pp365-projectwebparts/lib/components/ProjectStatus";
import { Spinner } from "office-ui-fabric-react";
import { ProjectStatusPage } from "../ProjectStatusPage/index";
import { Team } from "@pnp/graph";
import { ProjectPhases } from "pp365-projectwebparts/lib/components/ProjectPhases";

export const Home: FunctionComponent<IHomeProps> = (props) => {
  const [teamUsers, setTeamUsers] = useState([]);
  const [hubSite, setHubSite] = useState<any>();
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  /**
   * Gets hubsite information
   */
  useEffect(() => {
    const getHubSite = async () => {
      const pc = props.context.pageContext;
      HubSiteService.GetHubSite(sp, pc).then((hubsite) => {
        setHubSite(hubsite);
        setIsLoading(false);
      });
    };
    //Fetches the users of the project on site load.
    sp.web.siteUsers.get().then((users) =>
      users
        .filter((user) => user.Email.length > 0)
        .map((user) => {
          const obj = {
            key: user.Id,
            header: user.Title,
            content: user.Email,
            media: <Avatar name={user.Title} />,
          };
          setTeamUsers((curr) => [...curr, obj]);
        })
    );

    getHubSite();
  }, []);

  return (
    <div>
      <div>{isLoading ? <Spinner /> : <TeamMembers items={teamUsers} />}</div>
    </div>
  );
};
