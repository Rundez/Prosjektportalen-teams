import React, { FunctionComponent, useState, useEffect } from "react";
import { Flex } from "@fluentui/react-northstar";
import { IQualityCard } from "./types";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { FaBox } from "react-icons/fa";
import "react-circular-progressbar/dist/styles.css";
import styles from "../../InfoCards.module.scss";

export const QualityCard: FunctionComponent<IQualityCard> = (props) => {
  const status = "Ihht. spesifikasjon";
  let totalbudget = 1000;
  let costs = 500;
  let width = 0;
  let text = "";

  const description =
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit" +
    "Temporibus ullam rerum facilis, " +
    "voluptas autem ducimus, necessitatibus odit " +
    " iste nesciunt sapiente harum dolorem consectetur consequatur, a omnis iure animi officiis cum!";

  if (totalbudget > costs) {
    width = (costs / totalbudget) * 100;
    text = width.toString() + "%";
  } else {
  }
  return (
    <div className={styles.projectInfoContainer}>
      <Flex gap="gap.small">
        <FaBox size="30px" style={{ marginTop: "18.760px" }} />
        <h1>{props.header}</h1>
      </Flex>
      <Flex column>
        <p className={styles.projectStatus}>{status}</p>
        <div style={{ width: "30%", height: "30%" }}>
          <CircularProgressbar
            value={width}
            text={text}
            styles={buildStyles({
              textColor: "#000000",
              trailColor: "#d6d6d6",
              pathColor: "#28b52f",
            })}
          />
        </div>
        <p>{description}</p>
      </Flex>
    </div>
  );
};
