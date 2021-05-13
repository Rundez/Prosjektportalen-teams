import React, { FunctionComponent, useState, useEffect } from "react";
import { IEconomyCard } from "./types";
import styles from "../../InfoCards.module.scss";
import { Flex, FlexItem } from "@fluentui/react-northstar";
import { Divider } from "semantic-ui-react";
import { GiMoneyStack } from "react-icons/gi";
import { Icon } from "office-ui-fabric-react";

export const EconomyCard: FunctionComponent<IEconomyCard> = (props) => {
  let totalbudget = 5040000;
  let costs = 3500000;
  let width = 0;
  const budget = "Over budsjett";
  const beskrivelse =
    "Vi er allerede langt over planlagt budsjett. Vi skal gjennomføre en revidering av budsjettet så forhåpentligvis kommer alle fasiliteter på plass i November.";
  const style = {
    height: "8px",
    width: "100%",
    backgroundColor: "purple",
    justifyContent: "center",
  };
  const spanStyle = {
    display: "block",
    height: "100%",
    width: "0%",
    backgroundColor: "cyan",
  };

  if (totalbudget > costs) {
    width = (costs / totalbudget) * 100;
    spanStyle.width = width.toString() + "%";
  } else {
    width = 100;
  }

  return (
    <div className={styles.projectInfoContainer}>
      <Flex gap="gap.small">
        <Icon
          iconName="Money"
          style={{
            color: "#28b52f",
            marginTop: "18.760px",
            fontSize: "30px",
          }}
        />
        <h1>{props.header}</h1>
      </Flex>

      <p className={styles.projectStatus}>{budget}</p>
      <Flex column>
        <div style={style}>
          <span style={spanStyle}></span>
        </div>
        <p>Nåværende kostnader: {costs},-</p>
        <p>Totalbudsjett: {totalbudget},- </p>
        <Divider></Divider>
        <p>{beskrivelse}</p>
      </Flex>
    </div>
  );
};
