import React, { useState } from "react";
import { Button, Dialog, Flex, Segment } from "@fluentui/react-northstar";
import { GrStatusWarning, GrStatusGood } from "react-icons/gr";
import { sp } from "@pnp/sp";
import { IRiskMatrixProps, RiskElementModel } from "../../../RiskPage/types";
import * as getValue from "get-value";
import { RiskMatrix } from "pp365-projectwebparts/lib/components/RiskMatrix";

export const ProjectStatusDialog = ({ trigger }) => {
  const [data, setData] = React.useState<RiskElementModel[]>([]);
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    _getItems();
  }, []);

  async function _getItems() {
    let data = await sp.web.lists.getByTitle("usikkerhet").items.get();

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

  return (
    <Dialog
      style={{ width: "75%" }}
      cancelButton="Tilbake"
      content={content(data)}
      trigger={
        <Button
          size="largest"
          icon={<GrStatusGood size="30px" />}
          circular
          styles={{ cursor: "pointer" }}
        />
      }
    />
  );
};

const content = (data) => {
  return (
    <Flex column>
      <Flex gap="gap.small">
        <GrStatusWarning size="40px" style={{ marginTop: "18.760px" }} />
        <h1>Usikkerhet</h1>
      </Flex>
      <h3>Høy</h3>
      <Segment style={{ marginBottom: "20px" }}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </Segment>
      <RiskMatrix
        calloutTemplate={callout}
        height={320}
        width={500}
        items={data}
      />
    </Flex>
  );
};

const callout = `<h3>{Title}</h3>
<p><strong>Usikkerhetstrategi: </strong>{GtRiskStrategy}</p>
<p><strong>Nærhet: </strong>{GtRiskProximity}</p>
<p><strong>Status usikkerhet: </strong>{GtRiskStatus}</p>`;
