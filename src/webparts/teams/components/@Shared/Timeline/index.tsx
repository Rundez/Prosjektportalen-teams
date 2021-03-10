import React, { FunctionComponent } from "react";
import { ITimelineProps } from "./types";
import Timeline from "react-calendar-timeline";
// make sure you include the timeline stylesheet or the timeline will not be styled
import "react-calendar-timeline/lib/Timeline.css";
import moment from "moment";

export const TimeLine: FunctionComponent<ITimelineProps> = ({
  context,
  listName,
}) => {
  moment.locale("nb");
  return (
    <div>
      <Timeline
        groups={groups}
        items={items}
        defaultTimeStart={moment().add(-1, "months")}
        defaultTimeEnd={moment().add(1, "years")}
        canChangeGroup={false}
        sidebarWidth={250}
      />
    </div>
  );
};

const groups = [
  { id: 1, title: "Produktleveranse 1" },
  { id: 2, title: "Produktleveranse 2" },
];
const items = [
  {
    id: 1,
    group: 1,
    title: "Info om leveransen",
    start_time: moment().add(-1, "month"),
    end_time: moment().add(1, "month"),
  },
  {
    id: 2,
    group: 2,
    title: "Info om leveransen",
    start_time: moment().add(-0.5, "month"),
    end_time: moment().add(1.5, "month"),
  },
];
