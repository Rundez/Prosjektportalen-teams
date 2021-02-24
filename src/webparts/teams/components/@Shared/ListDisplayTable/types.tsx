import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IDisplayTableProps {
  /**
   * The list to fetch data
   */
  listName?: string;
  context: WebPartContext;
}

export interface IFieldRendererProps {
  context?: WebPartContext;
}
