import React, { useState } from "react";
import { IListHeaderProps } from "./types";

import {
  CommandBar,
  ICommandBarItemProps,
} from "office-ui-fabric-react/lib/CommandBar";

export const ListHeader: React.FunctionComponent<any> = (props) => {
  const _items: ICommandBarItemProps[] = [
    {
      key: "newItem",
      text: "Legg til",
      iconProps: { iconName: "Add" },
      split: true,
      onClick: () => props.onAddItemClick(),
    },
    {
      key: "edit",
      text: "Rediger",
      iconProps: { iconName: "Upload" },
      split: true,
      disabled: props.isButtonsDisabled,
      onClick: (ev, it) => props.onEditClick(ev, it),
    },
    {
      key: "delete",
      text: "Slett",
      iconProps: { iconName: "Delete" },
      disabled: props.isButtonsDisabled,
      onClick: (ev, it) => props.onClick(ev, it),
    },
  ];

  return (
    <div className="Outer div">
      <CommandBar items={_items} />
    </div>
  );
};
