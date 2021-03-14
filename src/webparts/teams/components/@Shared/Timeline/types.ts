import { WebPartContext } from "@microsoft/sp-webpart-base";
import * as moment from 'moment'

export interface ITimelineProps {
    context?: WebPartContext;
    listName: string;
}

export interface ITimelineItem {
    id: number;
    group: number;
    title: string;
    start_time: moment.Moment;
    end_time: moment.Moment;
}

export interface ITimelineGroup {
    id: number;
    title: string, 
    height: number;
}