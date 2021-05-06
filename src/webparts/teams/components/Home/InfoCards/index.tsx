import React, { FunctionComponent, useState, useEffect } from "react";
import { Flex, Box, Button, List, Popup } from "@fluentui/react-northstar";
import {
  GiMoneyStack,
  GiPodiumWinner,
  GiProgression,
  GiStairsGoal,
} from "react-icons/gi";
import { GrStatusWarning, GrStatusGood } from "react-icons/gr";
import { FaBeer, FaBox } from "react-icons/fa";
import { ICards } from "./types";
import { AiOutlineNumber } from "react-icons/ai";
import { BiCalendar } from "react-icons/bi";
import { BsPersonFill } from "react-icons/bs";
import { FieldUserRenderer } from "@pnp/spfx-controls-react";
import { sp } from "@pnp/sp";

import styles from "./InfoCards.module.scss";
import { ImStatsBars } from "react-icons/im";
import { InfoRiskMatrix } from "../ProjectInfo/Riskmatrix";
import { ProjectInfoCard } from "./Cards/ProjectInfo/index";
import { EconomyCard } from "./Cards/Economy/index";
import { QualityCard } from "./Cards/Quality/index";
import { ProfitCard } from "./Cards/Profitachievement/index";
import { ProgressCard } from "./Cards/Progress/index";

export const Cards: FunctionComponent<ICards> = (props) => {
 
  switch (props.header) {
    case "Prosjektinfo":
    return(
      <ProjectInfoCard header={props.header} context={props.context}/>
    );
     
    case "Risiko":
      return (
        <div className={styles.projectInfoContainer}>
          <InfoRiskMatrix />
        </div>
      );
    case "Økonomi":
      return (
       <EconomyCard header={props.header}/>
      );
    case "Kvalitet":
      return (
       <QualityCard header={props.header} />
      );
    case "Gevinstoppnåelse":
      return (
        <ProfitCard header={props.header} />
      );
    case "Fremdrift":
      return (
       <ProgressCard header={props.header} />
      );
    default:
    return (
      <div className={styles.projectInfoContainer}>
        <h1>{props.header}</h1>
        <h1>{props.header} is not one of the  case names that work</h1>
      </div>
    );
      break;
  }
};
