import React, { useState } from "react";
import { Button, Dialog } from "@fluentui/react-northstar";
import { GrStatusGood } from "react-icons/gr";

export const ProjectStatusDialog = ({ data, trigger }) => {
  return (
    <Dialog
      style={{ width: "75%" }}
      cancelButton="Back"
      header="Status"
      content={`"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."`}
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
