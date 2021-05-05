import React, { FunctionComponent } from "react";
import { IResourceAllocation } from "./types";
import { GenericListInput } from "../../@Shared/GenericListInput/index";
import { DisplayTable } from "../../@Shared/ListDisplayTable/index";
import { TimeLine } from "../../@Shared/Timeline/index";
import { Divider } from "@fluentui/react-northstar";
import { AddElementDialog } from "../../@Shared/DialogPopup/index";
export const Resourceallocation: FunctionComponent<IResourceAllocation> = ({
  listName = "ressursallokering",
  context,
}) => {
  console.log(context);
  return (
    <>
      <AddElementDialog context={context} listName={listName} />
      <DisplayTable listName={listName} context={context} />
    </>
  );
};
