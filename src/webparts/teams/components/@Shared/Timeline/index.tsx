import React, { FunctionComponent, useEffect, useState } from "react";
import { ITimelineProps } from "./types";
import Timeline, {
  TimelineMarkers,
  TodayMarker,
  ReactCalendarItemRendererProps,
} from "react-calendar-timeline";
import "react-calendar-timeline/lib/Timeline.css";
import moment from "moment";
import "./Timeline.overrides.css";
import styles from "./Timeline.module.scss";
import { sp } from "@pnp/sp";
import { ITimelineGroup, ITimelineItem } from "./types";
import { DetailsCallout } from "./DetailsCallout/index";
import { IDetailsCalloutProps } from "./DetailsCallout";

export const TimeLine: FunctionComponent<ITimelineProps> = ({ listName }) => {
  const [listItems, setItems] = useState<any>();
  const [listGroups, setListGroups] = useState<ITimelineGroup[]>();
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [showDetails, setShowDetails] = useState<Boolean>(false);
  const [selectedItem, setSelectedItem] = useState<
    IDetailsCalloutProps["item"]
  >();

  useEffect(() => {
    moment.locale("nb");

    const fetch = async (listName) => {
      const items = await fetchItems(listName);
      const groups = transformGroups(items);
      setListGroups(groups);
      setItems(items);
      setIsLoading(false);
    };
    fetch(listName);
  }, []);

  const _onItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    item: ITimelineItem
  ) => {
    const currentItem = { element: event.currentTarget, data: item };
    setSelectedItem(currentItem);
    setShowDetails(true);
  };

  const itemRenderer = (props: ReactCalendarItemRendererProps) => {
    const htmlProps = props.getItemProps(props.item.itemProps);
    return (
      <div
        {...htmlProps}
        className={`${styles.timelineItem} rc-item`}
        onClick={(event) => _onItemClick(event, props.item)}
      >
        <div
          className={`${styles.itemContent} rc-item-content`}
          style={{ maxHeight: `${props.itemContext.dimensions.height}` }}
        >
          {props.item.title}
        </div>
      </div>
    );
  };

  console.log(selectedItem);
  return (
    <div className={styles.timeline}>
      {!isLoading ? (
        <Timeline
          groups={listGroups}
          items={listItems}
          defaultTimeStart={moment().add(-2, "months")}
          defaultTimeEnd={moment().add(8, "months")}
          canChangeGroup={false}
          sidebarWidth={175}
          itemRenderer={itemRenderer}
        >
          <TimelineMarkers>
            <TodayMarker date={moment().toDate()} />
          </TimelineMarkers>
        </Timeline>
      ) : (
        "No Items in list..."
      )}
      {showDetails ? (
        <DetailsCallout
          item={selectedItem}
          onDismiss={() => setShowDetails(false)}
        />
      ) : (
        "Or this"
      )}
    </div>
  );
};

const fetchItems = async (listName: string) => {
  const items = await sp.web.lists
    .getByTitle(listName)
    .items.select(
      "Title",
      "GtDeliveryQualityResponsible/Title",
      "GtDeliveryEndTime",
      "GtDeliveryStartTime",
      "GtDeliveryStatus",
      "GtDeliveryQualityExpectations"
    )
    .expand("GtDeliveryQualityResponsible")
    .get();

  console.log(items);
  const transformedItems = items.map((item, index) => {
    return {
      id: index,
      group: index,
      title: item.Title,
      start_time: moment(new Date(item.GtDeliveryStartTime)),
      end_time: moment(new Date(item.GtDeliveryEndTime)),
    };
  });

  return transformedItems as ITimelineItem[];
};

const transformGroups = (items: any) => {
  const groups = items.map((item, index) => {
    return {
      id: index,
      title: item.title,
      height: 50,
    };
  });

  return groups as ITimelineGroup[];
};
