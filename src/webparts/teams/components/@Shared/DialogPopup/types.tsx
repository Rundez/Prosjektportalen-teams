import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ISideBarProps {
  listName: string;
  context: WebPartContext;
  shouldPanelOpen?: boolean;
  editData?: any;
  onClose?: () => void;
}
