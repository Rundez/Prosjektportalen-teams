import React, { FunctionComponent, useState, useEffect } from "react";
import {IProfitCard} from "./types"
import styles from "../../InfoCards.module.scss"

export const ProfitCard: FunctionComponent<IProfitCard> = (props) => {
    return(
        <div className={styles.projectInfoContainer}>
          <h1>{props.header}</h1>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.
             Temporibus ullam rerum facilis, 
            voluptas autem ducimus, necessitatibus odit 
            iste nesciunt sapiente harum dolorem consectetur consequatur, a omnis iure animi officiis cum!</p>
        </div>
    );
}