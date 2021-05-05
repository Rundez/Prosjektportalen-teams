import React, { FunctionComponent } from "react";
import { IProjectdeliveries } from "./types";
import { GenericListInput } from "../../@Shared/GenericListInput/index";
import { DisplayTable } from "../../@Shared/ListDisplayTable/index";
import { TimeLine } from "../../@Shared/Timeline/index";
import { Divider } from "@fluentui/react-northstar";
import { AddElementDialog } from "../../@Shared/DialogPopup/index";
export const ProjectDeliveries: FunctionComponent<IProjectdeliveries> = ({
  listName = "prosjektleveranser",
  context,
}) => {
  console.log(context);
  return (
    <>
      <div style={{ marginBottom: "2em" }}>
        <TimeLine context={context} listName={listName} />
      </div>

      <Divider />
      <AddElementDialog context={context} listName={listName} />
      <DisplayTable listName={listName} context={context} />
    </>
  );
};
