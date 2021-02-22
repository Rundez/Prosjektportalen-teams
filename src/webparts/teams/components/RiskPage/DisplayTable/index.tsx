import React, { useState, FunctionComponent, useEffect } from "react";
import { IDisplayTableProps } from "./types";
import {
  ListView,
  IViewField,
  SelectionMode,
  GroupOrder,
  IGrouping,
} from "@pnp/spfx-controls-react/lib/ListView";
import { sp, IFieldInfo, Item, IView } from "@pnp/sp/presets/all";
import { isBeforeMinDate } from "@fluentui/react-northstar";

export const DisplayTable: FunctionComponent<IDisplayTableProps> = ({
  listName,
}) => {
  const [listColumns, setListColumns] = useState<IViewField[]>([]);
  const [listElements, setListElements] = useState<any[]>([]);
  useEffect(() => {
    const fetchItems = async () => {
      const columnNames = await fetchInternalAndExternalColumns(listName); // Fetch internal and external column names based on view
      const columnFormatted = await convertListColumns(columnNames); // Convert the column names to table format
      setListColumns(columnFormatted); // set the list columns to state

      console.log(columnNames);
      const rows = await fetchListItems(listName, columnNames);
      setListElements(rows);
      console.log(rows);
    };
    fetchItems();
  }, []);

  return (
    <div>
      <ListView items={listElements} viewFields={listColumns} showFilter />
    </div>
  );
};

/**
 * Fetch the fields for the selected view
 * @param listName
 */
const fetchViewFields = async (listName: string) => {
  const list = await sp.web.lists
    .getByTitle(listName)
    .views.getByTitle("Alle elementer")
    .fields.get();

  return list;
};

/**
 * Fetch data from the selected list
 * @param listName
 */
const fetchListItems = async (listName: string, viewFields: IFieldInfo[]) => {
  const internalNames = viewFields.map((field) => field.InternalName);
  const items = await sp.web.lists
    .getByTitle(listName)
    .items.select(...internalNames)
    .expand("")
    .get();

  return items;
};

/**
 * Fetch ALL the view fields (hidden not included)
 * @param listName
 */
const convertListColumns = async (
  columns: IFieldInfo[]
): Promise<IViewField[]> => {
  const list = columns.map((field) => {
    return {
      name: field.InternalName,
      displayName: field.Title,
      sorting: true,
      isResizable: true,
    };
  });

  return list;
};

/**
 * Fetches internal and display name for the selected list (and view when this will be implemented)
 * @param listName
 */
const fetchInternalAndExternalColumns = async (listName: string) => {
  const View = await sp.web.lists
    .getByTitle(listName)
    .views.getByTitle("Alle elementer")();

  const fields = await sp.web.lists
    .getByTitle(listName)
    .views.getByTitle("Alle elementer")
    .fields();

  let internames: string[] = (fields as any).Items;
  let filterstring: string = internames
    .map((x) => `(InternalName eq '${x}')`)
    .join(` or `);

  const displayanmes = await sp.web.lists
    .getByTitle(listName)
    .fields.filter(filterstring)
    .select("InternalName", "Title")
    .get();

  return displayanmes;
};
