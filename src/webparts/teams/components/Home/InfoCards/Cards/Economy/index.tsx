import React, { FunctionComponent, useState, useEffect } from "react";
import {IEconomyCard} from "./types"
import styles from "../../InfoCards.module.scss"
import { Flex, FlexItem } from "@fluentui/react-northstar";
import { Divider } from "semantic-ui-react";

export const EconomyCard: FunctionComponent<IEconomyCard> = (props) => {
    let totalbudget = 1000;
    let costs = 900;
    let width = 0;
    const beskrivelse = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia ad nostrum itaque cum. Nemo temporibus iusto impedit magnam, nisi ab fuga harum vel provident itaque eos, facere, cupiditate earum. Hic."
    const style={
        height: "8px",
        width: "100%",
        backgroundColor: "purple",
        justifyContent: "center"
    }
    const spanStyle={
        display: "block",
        height: "100%",
        width: "0%",
        backgroundColor: "cyan", 
   }

    if(totalbudget > costs){
      width = costs/totalbudget * 100
      spanStyle.width = width.toString() + "%"
    } else{
        width = 100
    }

    return(
        <div className={styles.projectInfoContainer}>
          <h1>{props.header}</h1> 
          <Flex column >
          <div style={style}>
          <span style={spanStyle}></span>
          </div>
          <p>{costs}kr Kostnader på beløp totalt</p>
          <Divider></Divider>
          <p>{totalbudget}kr totalbudsjett </p>
          <Divider></Divider>
          <p>{beskrivelse}</p> 
          </Flex>
        </div>
        
    );
}