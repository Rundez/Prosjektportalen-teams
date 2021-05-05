import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IHomeProps {
  context: WebPartContext;
  listName?: string;
}
