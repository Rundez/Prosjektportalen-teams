import React, { useEffect, useState, FunctionComponent } from "react";
import { IProjectStatusPageProps } from "./types";
import { sp } from "@pnp/sp";
import HubSiteService from "sp-hubsite-service";
import { Spinner } from "office-ui-fabric-react";
import { ProjectPhases } from "pp365-projectwebparts/lib/components/ProjectPhases";
export const ProjectStatusPage: FunctionComponent<IProjectStatusPageProps> = ({
  context,
}) => {
  const [hubSite, setHubSite] = useState<any>();
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  let pc = context.pageContext;
  if (!hubSite) {
    HubSiteService.GetHubSite(sp, pc).then((hubsite) => {
      setHubSite(hubsite);
      setIsLoading(false);
    });
  }

  if (hubSite) {
    let newHub = hubSite;
    console.log(newHub);
  }

  const callout = `<h3>{Title}</h3>
  <p><strong>Usikkerhetstrategi: </strong>{GtRiskStrategy}</p>
  <p><strong>Nærhet: </strong>{GtRiskProximity}</p>
  <p><strong>Status usikkerhet: </strong>{GtRiskStatus}</p>`;

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          <ProjectPhases
            confirmPhaseChange
            currentPhaseViewName
            phaseField="GtProjectPhase"
            hubSite={hubSite}
          />
        </div>
      )}
    </div>
  );
};
