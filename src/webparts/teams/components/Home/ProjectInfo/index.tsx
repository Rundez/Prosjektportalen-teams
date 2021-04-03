import React, { FunctionComponent, useState, useEffect } from "react";
import { Flex, Box, Button, List, Image } from "@fluentui/react-northstar";
import { IInfoProps } from "./types";
import { ErrorIcon, ClosedCaptionsIcon } from "@fluentui/react-icons-northstar";
import { FaBeer, FaBox } from "react-icons/fa";
import { FieldUserRenderer } from "@pnp/spfx-controls-react";
import { sp, SPRest } from "@pnp/sp";
import {
  GiMoneyStack,
  GiPodiumWinner,
  GiProgression,
  GiStairsGoal,
} from "react-icons/gi";
import { AiOutlineNumber } from "react-icons/ai";
import { BiCalendar } from "react-icons/bi";
import { BsPersonFill } from "react-icons/bs";
import { ImStatsBars } from "react-icons/im";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { Spinner } from "office-ui-fabric-react";
import styles from "./ProjectInfo.module.scss";

export const Info: FunctionComponent<IInfoProps> = (props) => {
  const [projectInformation, setProjectInformation] = useState<any>([{}]);
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  useEffect(() => {
    fetchData();
  }, []);

  /**
   * Fetch project information
   */
  const fetchData = () => {
    sp.web.lists
      .getByTitle("prosjektegenskaper")
      .renderListData("<View></View>")
      .then((data) => {
        setProjectInformation(transformItems(data.Row, props.context));
        console.log(data);
        setIsLoading(false);
      });
  };

  const teamName = props.context.sdks.microsoftTeams.context.teamName;

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <Flex hAlign="center">
          <div className={styles.projectInfoContainer}>
            <div className={styles.projectInfoTitle}>
              <p> {teamName}</p>
            </div>
            <div className={styles.infoElements}>
              <Flex gap="gap.small" space="between">
                <Flex.Item size="size.half">
                  <List items={projectInformation.slice(0, 4)} />
                </Flex.Item>
                <Flex.Item size="size.half" align="start">
                  <List items={projectInformation.slice(4, 6)} />
                </Flex.Item>
              </Flex>
            </div>
          </div>
        </Flex>
      )}
    </div>
  );
};
const getProjectInfo2 = [
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

const transformItems = (items: any, context) => {
  const projectInfoColumn1 = [
    {
      header: "Prosjektnummer",
      content: items[0].GtProjectNumber,
      media: <AiOutlineNumber size="30px" />,
    },
    {
      header: "Start- og sluttdato",
      content: `${items[0].GtStartDate} - ${items[0].GtEndDate}`,
      media: <BiCalendar size="30px" />,
    },
    {
      header: "Prosjektleder",
      content: (
        <FieldUserRenderer
          context={context}
          users={[
            {
              id: items[0].GtProjectManager[0].id,
              email: items[0].GtProjectManager[0].email,
              department: "UiA (placeholder)",
              jobTitle: "Software developer (placeholder)",
              picture: items[0].GtProjectManager[0].picture,
              sip: items[0].GtProjectManager[0].sip,
              title: items[0].GtProjectManager[0].title,
              value: "",
            },
          ]}
          key={1}
        />
      ),
      media: <BsPersonFill size="30px" />,
    },
    {
      header: "Prosjekteier",
      content: (
        <FieldUserRenderer
          context={context}
          users={[
            {
              id: items[0].GtProjectOwner[0].id,
              email: items[0].GtProjectOwner[0].email,
              department: "UiA (placeholder)",
              jobTitle: "Software developer (placeholder)",
              picture: items[0].GtProjectOwner[0].picture,
              sip: items[0].GtProjectOwner[0].sip,
              title: items[0].GtProjectOwner[0].title,
              value: "",
            },
          ]}
          key={1}
        />
      ),
      media: <BsPersonFill size="30px" />,
    },
    {
      header: "Målsetting",
      content: items[0].GtProjectGoals,
      media: <GiStairsGoal size="30px" />,
    },
    {
      header: "Overordnet status",
      content: "test",
      media: <ImStatsBars size="30px" />,
    },
  ];

  return projectInfoColumn1;
};
