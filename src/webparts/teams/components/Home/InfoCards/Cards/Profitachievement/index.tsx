import React, { FunctionComponent, useState, useEffect } from "react";
import { IProfitCard } from "./types";
import styles from "../../InfoCards.module.scss";
import { Flex } from "@fluentui/react-northstar";
import { GiPodiumWinner } from "react-icons/gi";
import { Icon } from "office-ui-fabric-react";

export const ProfitCard: FunctionComponent<IProfitCard> = (props) => {
  const status = "Ikke påbegynt";
  const description =
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit" +
    "Temporibus ullam rerum facilis, " +
    "voluptas autem ducimus, necessitatibus odit " +
    " iste nesciunt sapiente harum dolorem consectetur consequatur, a omnis iure animi officiis cum!";

  return (
    <div className={styles.projectInfoContainer}>
      <Flex gap="gap.small">
        <Icon
          iconName="Trophy"
          style={{
            marginTop: "18px",
            fontSize: "30px",
          }}
        />
        <h1>{props.header}</h1>
      </Flex>
      <p className={styles.projectStatus}>{status}</p>
      <p>{description}</p>
    </div>
  );
};
