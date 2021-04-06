import React, { FunctionComponent, useState, useEffect } from "react";
import { Flex, Box, Button, List } from "@fluentui/react-northstar";
import { IStatusProps } from "./types";
import { ErrorIcon, ClosedCaptionsIcon } from "@fluentui/react-icons-northstar";
import { FaBeer, FaBox } from "react-icons/fa";
import { GiMoneyStack, GiPodiumWinner, GiProgression } from "react-icons/gi";
import { GrStatusWarning, GrStatusGood } from "react-icons/gr";
import { Popup } from "@fluentui/react-northstar";
import { ProjectStatusDialog } from "./ProjectStatusDialog/index";

export const StatusBox = () => (
  <Box
    content="Prosjekt Status"
    styles={{
      backgroundColor: "White",
      boxShadow: " 2px 2px 2px #888888",
      overflow: "auto",
      marginTop: "10px",
      marginBottom: "300px",
      color: "Black",
      textAlign: "justify",
      height: "1000px",
    }}
  />
);

export const Status: FunctionComponent<IStatusProps> = (props) => {
  const newList = [...props.items];
  return (
    <div
      style={{
        backgroundColor: "White",
        boxShadow: " 2px 2px 2px #888888",
        height: "250px",
        marginTop: "10px",
        color: "Black",
        textAlign: "justify",
        flexGrow: 1,
      }}
    >
      <div
        style={{
          marginLeft: "30px",
          fontWeight: "bold",
          fontSize: "20px",
        }}
      >
        <p> Status </p>
      </div>
      <Flex hAlign="center">
        <div
          style={{
            marginBottom: "30px",
            marginLeft: "-20px",
          }}
        >
          <Flex.Item>
            <List items={TestStatus} horizontal />
          </Flex.Item>
        </div>
      </Flex>
      <Flex hAlign="center">
        <Flex.Item>
          <List items={TestStatus2} horizontal />
        </Flex.Item>
      </Flex>
    </div>
  );
};

export const TestStatus = [
  {
    header: "Status",
    content: "Aktiv",
    media: <ProjectStatusDialog trigger={"testTrigger"} />,
  },
  {
    header: "Økonomi",
    content: "På budsjett",
    media: (
      <Popup
        trigger={
          <Button
            size="medium"
            icon={<GiMoneyStack size="30px" />}
            circular
            styles={{ cursor: "pointer" }}
          />
        }
        content="Høyesterettsjustitiarius"
      />
    ),
  },
  {
    header: "Kvalitet",
    content: "Ihht. spesifikasjon",
    media: (
      <Popup
        trigger={
          <Button
            size="medium"
            icon={<FaBox size="30px" />}
            circular
            styles={{ cursor: "pointer" }}
          />
        }
        content="Lille kattepus hvor har du vært"
      />
    ),
  },
];

export const TestStatus2 = [
  {
    header: "Risiko",
    content: "Medium",
    media: (
      <Popup
        trigger={
          <Button
            size="medium"
            icon={<GrStatusWarning size="30px" />}
            circular
            styles={{ cursor: "pointer" }}
          />
        }
        content="Havregrøt er best til frokost!"
      />
    ),
  },
  {
    header: "Fremdrift",
    content: "På plan",
    media: (
      <Popup
        trigger={
          <Button
            size="medium"
            icon={<GiProgression size="30px" />}
            circular
            styles={{ cursor: "pointer" }}
          />
        }
        content="FRIES BEFORE GUYS!"
      />
    ),
  },
  {
    header: "Gevinst oppnåelse",
    content: "Foran plan",
    media: (
      <Popup
        trigger={
          <Button
            size="medium"
            icon={<GiPodiumWinner size="30px" />}
            circular
            styles={{ cursor: "pointer" }}
          />
        }
        content="GIRL POWER"
      />
    ),
  },
];
