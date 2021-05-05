import { ITimelineItem } from "../types";
import { Callout } from "office-ui-fabric-react/lib/Callout";
import React from "react";
import styles from "./DetailsCallout.module.scss";

export interface IDetailsCalloutProps {
  item: { data: ITimelineItem; element: HTMLElement };
  onDismiss: () => void;
}
// tslint:disable-next-line: naming-convention
export const DetailsCallout = ({ item, onDismiss }: IDetailsCalloutProps) => {
  return (
    <Callout
      className={styles.detailsCallout}
      gapSpace={10}
      target={item.element}
      onDismiss={onDismiss}
      setInitialFocus={true}
    >
      <p>
        <b>Prosjektleveranse:</b> <span>{item.data.title}</span>
      </p>
      <p>
        <b>Startdato:</b>{" "}
        <span>{item.data.start_time.format("Do MMMM YYYY")}</span>
      </p>
      <p>
        <b>Sluttdato:</b>{" "}
        <span>{item.data.end_time.format("Do MMMM YYYY")}</span>
      </p>
    </Callout>
  );
};
