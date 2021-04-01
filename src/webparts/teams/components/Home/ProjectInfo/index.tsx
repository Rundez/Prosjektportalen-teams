import React, { FunctionComponent, useState, useEffect } from "react";
import { Flex, Box, Button, List, Image } from "@fluentui/react-northstar";
import { IInfoProps } from "./types";
import { ErrorIcon, ClosedCaptionsIcon } from "@fluentui/react-icons-northstar";
import { FaBeer, FaBox } from "react-icons/fa";
import { FieldUserRenderer } from "@pnp/spfx-controls-react";
import {
  GiMoneyStack,
  GiPodiumWinner,
  GiProgression,
  GiStairsGoal,
} from "react-icons/gi";
import { GrStatusWarning, GrStatusGood } from "react-icons/gr";
import { AiOutlineNumber } from "react-icons/ai";
import { BiCalendar } from "react-icons/bi";
import { BsPersonFill } from "react-icons/bs";
import { ImStatsBars } from "react-icons/im";

export const Info: FunctionComponent<IInfoProps> = (props) => {
  const usersArr: any[] = ["Martin Ruud"];
  const info = getProjectInfo(props.context, usersArr);

  return (
    <div>
      <Flex hAlign="center">
        <div
          style={{
            backgroundColor: "White",
            boxShadow: " 2px 2px 2px #888888",
            overflow: "auto",
            height: "300px",
            marginTop: "10px",
            color: "Black",
            textAlign: "justify",
          }}
        >
          <div
            style={{
              marginLeft: "30px",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            <p> Prosjektinformasjon</p>
          </div>
          <div
            style={{
              marginLeft: "20px",
            }}
          >
            <Flex gap="gap.small" space="between">
              <Flex.Item size="size.half">
                <List items={info} />
              </Flex.Item>
              <Flex.Item size="size.half" align="start">
                <List items={TestInfo2} />
              </Flex.Item>
            </Flex>
          </div>
        </div>
      </Flex>
    </div>
  );
};
const getProjectInfo = (context, users) => {
  return [
    {
      header: "Prosjektnummer:",
      content: "69",
      media: <AiOutlineNumber size="30px" />,
    },
    {
      header: "Start- og sluttdato:",
      content: "01.07.2021 - 07.08.2022",
      media: <BiCalendar size="30px" />,
    },
    {
      header: "Prosjektleder:",
      content: (
        <FieldUserRenderer
          context={context}
          users={[
            {
              id: "9",
              email: "maruud@martdev.onmicrosoft.com",
              department: "UiA",
              jobTitle: "Software developer",
              picture: "",
              sip: "This is the sip",
              title: "Martin Ruud",
              value: "1",
            },
          ]}
          key={1}
        />
      ),
      media: <BsPersonFill size="30px" />,
    },
    {
      header: "Prosjekteier:",
      content: "Kristian Sleikestad",
      media: <BsPersonFill size="30px" />,
    },
  ];
};
export const TestInfo2 = [
  {
    header: "Målsetting",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent maximus mollis nulla id dapibus.",
    media: <GiStairsGoal size="30px" />,
  },
  {
    header: "Overordnet status",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent maximus mollis nulla id dapibus. Nulla aliquam eget arcu ut dictum. Nullam in quam ut erat tincidunt tempor.",
    media: <ImStatsBars size="30px" />,
  },
];
