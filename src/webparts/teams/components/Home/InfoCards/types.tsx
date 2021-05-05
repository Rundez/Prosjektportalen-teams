import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ICards {
  header: string;
  height: number;
  width: number;
  context?: WebPartContext;
}
