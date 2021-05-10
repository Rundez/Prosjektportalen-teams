import React, { FunctionComponent, useState, useEffect } from "react";
import { IProjectInfoCard } from "./types";
import { sp } from "@pnp/sp";
import { AiOutlineNumber } from "react-icons/ai";
import { BiCalendar } from "react-icons/bi";
import { BsPersonFill } from "react-icons/bs";
import { GiStairsGoal } from "react-icons/gi";
import { FieldUserRenderer } from "@pnp/spfx-controls-react";
import { ImStatsBars } from "react-icons/im";
import { Flex, Box, Button, List, Popup } from "@fluentui/react-northstar";
import styles from "../../InfoCards.module.scss";
import { Icon } from "office-ui-fabric-react";

export const ProjectInfoCard: FunctionComponent<IProjectInfoCard> = (props) => {
  const [projectInformation, setProjectInformation] = useState<any>([{}]);
  const fetchProjectInformation = () => {
    sp.web.lists
      .getByTitle("prosjektegenskaper")
      .renderListData("<View></View>")
      .then((data) => {
        setProjectInformation(
          transformProjectInformation(data.Row, props.context)
        );
      });
  };
  useEffect(() => {
    fetchProjectInformation();
  }, []);
  const transformProjectInformation = (items: any, context) => {
    const projectInfoColumn = [
      {
        header: "Prosjektnummer",
        content: items[0].GtProjectNumber,
        media: <AiOutlineNumber size="30px" />,
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
        header: "Start- og sluttdato",
        content: `${items[0].GtStartDate} - ${items[0].GtEndDate}`,
        media: <BiCalendar size="30px" />,
      },
      {
        header: "Målsetting",
        content: items[0].GtProjectGoals,
        media: <GiStairsGoal size="30px" />,
      },
      {
        header: "Overordnet status",
        content: items[0].GtProjectGoals,
        media: <ImStatsBars size="30px" />,
      },
    ];

    return projectInfoColumn;
  };
  return (
    <div className={styles.projectInfoContainer}>
      <Flex gap="gap.small">
        <Icon
          iconName="BarChart4"
          style={{
            marginTop: "15px",
            fontSize: "30px",
          }}
        />
        <h1>{props.header}</h1>
      </Flex>
      <Flex>
        <Flex.Item size="size.half">
          <List items={projectInformation.slice(0, 3)} />
        </Flex.Item>
        <Flex.Item size="size.half">
          <List items={projectInformation.slice(3, 6)} />
        </Flex.Item>
      </Flex>
    </div>
  );
};
