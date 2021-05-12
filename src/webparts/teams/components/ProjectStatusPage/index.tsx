import React, { useEffect, useState, FunctionComponent } from "react";
import { IProjectStatusPageProps } from "./types";
import { sp } from "@pnp/sp";
import HubSiteService from "sp-hubsite-service";
import { Spinner } from "office-ui-fabric-react";
import { ProjectPhases } from "pp365-projectwebparts/lib/components/ProjectPhases";
import { ProjectStatus } from "pp365-projectwebparts/lib/components/ProjectStatus";

export const ProjectStatusPage: FunctionComponent<IProjectStatusPageProps> = ({
  context,
}) => {
  const [hubSite, setHubSite] = useState<any>();
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  let pc = context.pageContext;
  console.log(sp);
  if (!hubSite) {
    HubSiteService.GetHubSite(sp, pc).then((hub) => {
      setHubSite(hub);
      setIsLoading(false);
    });
  }

  const callout = `<h3>{Title}</h3>
  <p><strong>Usikkerhetstrategi: </strong>{GtRiskStrategy}</p>
  <p><strong>Nærhet: </strong>{GtRiskProximity}</p>
  <p><strong>Status usikkerhet: </strong>{GtRiskStatus}</p>`;
  return (
    /*<div>
      {isLoading ? (
        <Spinner />
      ) : (
        <ProjectStatus
          riskMatrixCalloutTemplate={callout}
          siteId="00fc868f-7bb8-4a29-bc94-cb73527a5e92"
          hubSite={hubSite}
          isSiteAdmin
          webUrl="https://martdev.sharepoint.com/sites/test"
          webPartContext={context}
        />
      )}
    </div>*/
    <div></div>
  );
};
