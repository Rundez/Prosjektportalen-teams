import * as React from "react";
import { IRiskMatrixProps, RiskElementModel } from "./types";
import * as getValue from "get-value";
import { Loader, Divider } from "@fluentui/react-northstar";
import { AddElementDialog } from "../@Shared/DialogPopup";
import { DisplayTable } from "../@Shared/ListDisplayTable/index";
import { RiskMatrix } from "pp365-projectwebparts/lib/components/RiskMatrix";
import { sp } from "@pnp/sp";

import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

export const RiskPage: React.FunctionComponent<IRiskMatrixProps> = ({
  //items = [],
  width = 400,
  height = 300,
  listName,
  context,
}: IRiskMatrixProps) => {
  const [data, setData] = React.useState<RiskElementModel[]>([]);
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    _getItems();
  }, []);

  async function _getItems() {
    let data = await sp.web.lists.getByTitle(listName).items.get();

    data = data.map(
      (i) =>
        new RiskElementModel(
          i,
          getValue(i, "GtRiskProbability", { default: "" }),
          getValue(i, "GtRiskConsequence", { default: "" }),
          getValue(i, "GtRiskProbabilityPostAction", { default: "" }),
          getValue(i, "GtRiskConsequencePostAction", { default: "" })
        )
    );
    setData(data);
    setLoading(false);
  }

  const callout = `<h3>{Title}</h3>
  <p><strong>Usikkerhetstrategi: </strong>{GtRiskStrategy}</p>
  <p><strong>Nærhet: </strong>{GtRiskProximity}</p>
  <p><strong>Status usikkerhet: </strong>{GtRiskStatus}</p>`;

  return (
    <>
      {isLoading ? (
        <Loader label="Content loading" />
      ) : (
        <div>
          <RiskMatrix
            calloutTemplate={callout}
            height={height}
            width={width}
            items={data}
          />
          <Divider />
          <AddElementDialog context={context} listName={listName} />
          <DisplayTable listName={listName} />
        </div>
      )}
    </>
  );
};

export * from "./types";
