import React, { useState } from "react";

import {
  CommandBar,
  ICommandBarItemProps,
} from "office-ui-fabric-react/lib/CommandBar";
import { IButtonProps } from "office-ui-fabric-react/lib/Button";

export const ListHeader: React.FunctionComponent<any> = (props) => {
  const _items: ICommandBarItemProps[] = [
    {
      key: "newItem",
      text: "Legg til",
      iconProps: { iconName: "Add" },
      split: true,
    },
    {
      key: "edit",
      text: "Rediger",
      iconProps: { iconName: "Upload" },
      split: true,
      disabled: true,
      href: "https://developer.microsoft.com/en-us/fluentui",
    },
    {
      key: "delete",
      text: "Slett",
      iconProps: { iconName: "Delete" },
      disabled: false,
      onClick: (ev, it) => props.onDeleteClick(ev, it),
    },
  ];

  return (
    <div className="Outer div">
      <CommandBar items={_items} />
    </div>
  );
};
