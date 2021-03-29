import React, { FunctionComponent, useState, useEffect } from "react";
import { Avatar } from "@fluentui/react-northstar";
import { IHomeProps } from "./types";
//import { IUser } from '../TeamMembers/types';
import HubSiteService from "sp-hubsite-service";

import { sp, SPRest } from "@pnp/sp";
import { TeamMembers, DropdownSorting } from "./TeamMembers/index";
import { Spinner } from "office-ui-fabric-react";
import { ProjectPhases } from "pp365-projectwebparts/lib/components/ProjectPhases";
import { Chart } from "react-google-charts";
import { TimeLine } from "../@Shared/Timeline";
import { ProjectStatus } from "pp365-projectwebparts/lib/components/ProjectStatus";
export const Home: FunctionComponent<IHomeProps> = (props) => {
  const [teamUsers, setTeamUsers] = useState([]);
  const [hubSite, setHubSite] = useState<any>();
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  //Fetches the users of the project on site load.
  useEffect(() => {
    const getHubSite = async () => {
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
    };
    getHubSite();
  }, []);

  /**
   * Gets hubsite information
   */
  if (!hubSite) {
    let pc = props.context.pageContext;
    HubSiteService.GetHubSite(sp, pc).then((hub) => {
      setHubSite(hub);
      setIsLoading(false);
    });
  }

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          <ProjectPhases
            phaseField="GtProjectPhase"
            currentPhaseViewName="Planlegge"
            siteId="00fc868f-7bb8-4a29-bc94-cb73527a5e92"
            webUrl="https://martdev.sharepoint.com/sites/pp365/"
            showSubText
            subTextTruncateLength={1}
            syncPropertiesAfterPhaseChange
            webPartContext={props.context}
            isSiteAdmin
            hubSite={hubSite}
          />

          <ProjectStatus
            riskMatrixCalloutTemplate={callout}
            siteId="00fc868f-7bb8-4a29-bc94-cb73527a5e92"
            hubSite={hubSite}
            isSiteAdmin
            webUrl="https://martdev.sharepoint.com/sites/test"
            webPartContext={props.context}
          />
        </div>
      )}
    </div>
  );
};

const callout = `<h3>{Title}</h3>
<p><strong>Usikkerhetstrategi: </strong>{GtRiskStrategy}</p>
<p><strong>Nærhet: </strong>{GtRiskProximity}</p>
<p><strong>Status usikkerhet: </strong>{GtRiskStatus}</p>`;
