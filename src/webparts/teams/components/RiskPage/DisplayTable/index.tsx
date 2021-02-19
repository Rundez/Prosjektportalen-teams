import React, { useState, FunctionComponent } from "react";
import { IDisplayTableProps } from "./types";
import {
  ListView,
  IViewField,
  SelectionMode,
  GroupOrder,
  IGrouping,
} from "@pnp/spfx-controls-react/lib/ListView";

export const DisplayTable: FunctionComponent = ({}) => {
  return (
    <div style={{ width: "75%" }}>
      <ListView items={items} viewFields={viewFields} showFilter />
    </div>
  );
};

const viewFields: IViewField[] = [
  {
    name: "Id",
    displayName: "Id",
    sorting: true,
    isResizable: true,
  },
  {
    name: "Name",
    displayName: "Name",
    sorting: true,
    isResizable: true,
  },
  {
    name: "Picture",
    displayName: "Picture",
    sorting: true,
    isResizable: true,
  },
  {
    name: "Age",
    displayName: "Age",
    sorting: true,
    isResizable: true,
  },
];

const header = {
  items: ["id", "Name", "Picture", "Age"],
};
const items = [
  {
    Id: "1",
    Name: "Roman van von der Longername",
    Picture: "None",
    Age: "30 years",
  },
  {
    Id: "2",
    Name: "Martin Ruud",
    Picture: "None",
    Age: "27 years",
  },
  {
    Id: "3",
    Name: "Millie me",
    Picture: "None",
    Age: "1 year",
  },
  {
    Id: "4",
    Name: "Maryloo",
    Picture: "None",
    Age: "22 years",
  },
];
