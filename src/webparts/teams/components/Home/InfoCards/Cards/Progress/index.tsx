import React, { FunctionComponent, useState, useEffect } from "react";
import { IProgressCard } from "./types";
import styles from "../../InfoCards.module.scss";
import { GiProgression } from "react-icons/gi";
import { Divider, List, Flex } from "@fluentui/react-northstar";
import { Icon } from "office-ui-fabric-react";

export const ProgressCard: FunctionComponent<IProgressCard> = (props) => {
  const status = "På plan";
  const description =
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit" +
    "Temporibus ullam rerum facilis, " +
    "voluptas autem ducimus, necessitatibus odit " +
    " iste nesciunt sapiente harum dolorem consectetur consequatur, a omnis iure animi officiis cum!";

  const assignments = [
    {
      header: "Task1",
      content: "Something",
    },
    {
      header: "Task2",
      content: "Something",
    },
    {
      header: "Task3",
      content: "Something",
    },
  ];
  const numberOftasks = assignments.length + " Antall oppgaver";

  return (
    <div className={styles.projectInfoContainer}>
      <Flex gap="gap.small">
        <Icon
          iconName="DateTime"
          style={{
            color:"#28b52f",
            marginTop: "18px",
            fontSize: "30px",
          }}
        />
        <h1>{props.header}</h1>
      </Flex>
      <p className={styles.projectStatus}>{status}</p>
      <p>{numberOftasks}</p>
      <p>{description}</p>
      <Divider />
      <List items={assignments}></List>
    </div>
  );
};
