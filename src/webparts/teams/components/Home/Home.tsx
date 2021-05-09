import React, { FunctionComponent, useState, useEffect } from "react";
import { Avatar, FlexItem } from "@fluentui/react-northstar";
import { IHomeProps } from "./types";
//import { IUser } from '../TeamMembers/types';
import HubSiteService from "sp-hubsite-service";
import { Flex } from "@fluentui/react-northstar";
import { sp, SPRest } from "@pnp/sp";
import { TeamMembers, DropdownSorting, Minimizer } from "./TeamMembers/index";
import { Spinner } from "office-ui-fabric-react";
import { ProjectPhases } from "pp365-projectwebparts/lib/components/ProjectPhases";
import { Chart } from "react-google-charts";
import { TimeLine } from "../@Shared/Timeline";
import { StatusBox, Status, TestStatus, TestStatus2 } from "./MiniStatus/index";
import { Info } from "./ProjectInfo/index";
import { ProjectStatus } from "pp365-projectwebparts/lib/components/ProjectStatus";
import styles from "./Home.module.scss";

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
          <div className={styles.phaseContainer}>
            <ProjectPhases
              phaseField="GtProjectPhase"
              currentPhaseViewName="Gjeldende fase"
              siteId={props.context.pageContext.site.id.toString()}
              showSubText
              subTextTruncateLength={1}
              syncPropertiesAfterPhaseChange
              webPartContext={props.context}
              isSiteAdmin
              hubSite={hubSite}
            />
          </div>

          <div style={{ display: "none" }}>
            <ProjectStatus
              riskMatrixCalloutTemplate={callout}
              siteId={props.context.pageContext.site.id.toString()}
              hubSite={hubSite}
              isSiteAdmin
              webUrl={props.context.pageContext.web.absoluteUrl}
              webPartContext={props.context}
            />
          </div>
        </div>
      )}
      <Flex
        gap="gap.small"
        padding="padding.medium"
        space="around"
        style={{ display: "block" }} // Should get rid of this
      >
        <Info context={props.context} />
      </Flex>
      <Flex padding="padding.medium" space="around">
        <Status items={TestStatus} />
      </Flex>
    </div>
  );
};

const callout = `<h3>{Title}</h3>
<p><strong>Usikkerhetstrategi: </strong>{GtRiskStrategy}</p>
<p><strong>Nærhet: </strong>{GtRiskProximity}</p>
<p><strong>Status usikkerhet: </strong>{GtRiskStatus}</p>`;
