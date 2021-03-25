import React, { FunctionComponent, useState, useEffect } from "react";
import { Avatar, FlexItem } from "@fluentui/react-northstar";
import { IHomeProps } from "./types";
//import { IUser } from '../TeamMembers/types';
import HubSiteService from "sp-hubsite-service";
import { Flex} from "@fluentui/react-northstar";
import { sp, SPRest } from "@pnp/sp";
import { TeamMembers, DropdownSorting, Minimizer } from "./TeamMembers/index";
import { Spinner } from "office-ui-fabric-react";
import { ProjectPhases } from "pp365-projectwebparts/lib/components/ProjectPhases";
import { Chart } from "react-google-charts";
import { TimeLine } from "../@Shared/Timeline";
import { StatusBox, Status, TestStatus, TestStatus2 } from "./MiniStatus/index";
import { Info, TestInfo } from "./ProjectInfo/index";


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

      <Flex gap="gap.small" padding="padding.medium" space="between">
        <Flex.Item size="size.half" >
        <Info items={TestInfo} />
        </Flex.Item>
      <div>
        <Flex.Item size="size.half" align="end">
        { isLoading ? <Spinner /> : <TeamMembers items={teamUsers} />}
        </Flex.Item>
      </div>
      </Flex>
      <div>
      <Flex gap="gap.small" padding="padding.medium" space="between">
      <Flex.Item size="size.half" align="start">
      <Status items={TestStatus} /> 
      </Flex.Item>
      <Flex>
      
      </Flex>
      </Flex>

    </div>
    </div>
    

  );
};

