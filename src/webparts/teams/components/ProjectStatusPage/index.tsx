import React, { useEffect, useState, FunctionComponent } from "react";
import { IProjectStatusPageProps } from "./types";
import { sp } from "@pnp/sp";
import HubSiteService from "sp-hubsite-service";
import { Spinner } from "office-ui-fabric-react";
import { ProjectStatus } from "pp365-projectwebparts/lib/components/ProjectStatus";
import { ProjectPhases } from "pp365-projectwebparts/lib/components/ProjectPhases";
export const ProjectStatusPage: FunctionComponent<IProjectStatusPageProps> = ({
  context,
}) => {
  const [hubSite, setHubSite] = useState<any>();
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  /**
   * Gets hubsite information
   */
  useEffect(() => {
    const getHubSite = async () => {
      const pc = context.pageContext;
      HubSiteService.GetHubSite(sp, pc).then((hubsite) => {
        setHubSite(hubsite);
        console.log(hubsite);
        setIsLoading(false);
      });
    };
    getHubSite();
  }, []);

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
            confirmPhaseChange={false}
            currentPhaseViewName={false}
            phaseField="GtProjectPhase"
            hubSite={hubSite}
            siteId="00fc868f-7bb8-4a29-bc94-cb73527a5e92"
          />
          <ProjectStatus
            riskMatrixCalloutTemplate={callout}
            hubSite={hubSite}
            siteId="00fc868f-7bb8-4a29-bc94-cb73527a5e92"
            isSiteAdmin
          />
        </div>
      )}
    </div>
  );
};
