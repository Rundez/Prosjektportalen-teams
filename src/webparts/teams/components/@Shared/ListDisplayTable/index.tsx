import React, { useState, FunctionComponent, useEffect } from "react";
import { IDisplayTableProps } from "./types";
import { ListView, IViewField } from "@pnp/spfx-controls-react/lib/ListView";
import { sp } from "@pnp/sp";
import { IFieldInfo } from "./types";
import { FieldTextRenderer } from "@pnp/spfx-controls-react/lib/FieldTextRenderer";
import { FieldUserRenderer } from "@pnp/spfx-controls-react/lib/FieldUserRenderer";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IPrincipal } from "@pnp/spfx-controls-react/lib/common/SPEntities";
import { IContext } from "@pnp/spfx-controls-react/lib/common/Interfaces";

export const DisplayTable: FunctionComponent<IDisplayTableProps> = ({
  listName,
  context,
}) => {
  const [listColumns, setListColumns] = useState<IViewField[]>([]);
  const [listElements, setListElements] = useState<any[]>([]);
  useEffect(() => {
    const fetchItems = async () => {
      const columnNames = await fetchInternalAndExternalColumns(listName); // Fetch internal and external column names based on view
      const columnFormatted = await convertListColumns(columnNames); // Convert the column names to table format
      setListColumns(columnFormatted); // set the list columns to state
      //const rows = await fetchListItems(listName, columnNames); // Fetch the items based on the view query
      //setListElements(rows);
      //fetchListItems(listName, columnNames);
      const rows = await fetchItemsCaml(listName);
      setListElements(rows);
    };
    fetchItems();
  }, []);

  /**
   * Convert the columns to the accepted format
   * @param listName
   */
  const convertListColumns = async (
    columns: IFieldInfo[]
  ): Promise<IViewField[]> => {
    const list = columns.map((field: any) => {
      if (field["odata.type"] === "SP.FieldUser") {
        console.log("Dette er et brukerfelt:");
        console.log(field);
        return {
          name: field.InternalName,
          displayName: field.Title,
          sorting: true,
          isResizable: true,
          minWidth: 50,
          maxWidth: 100,
          //render: _renderUserColumn,
        };
      }
      return {
        name: field.InternalName,
        displayName: field.Title,
        sorting: true,
        isResizable: true,
        minWidth: 50,
        maxWidth: 100,
        //render: _renderColumn,
      };
    });

    const sortedList = list.reverse();
    return sortedList;
  };

  const _renderColumn = (text) => {
    return <FieldTextRenderer text={text["GtRiskStrategy"]} />;
  };

  const _renderUserColumn = (user: any) => {
    let spContext: IContext = {
      pageContext: context.pageContext,
      spHttpClient: context.spHttpClient,
    };
    return (
      <FieldUserRenderer
        context={spContext}
        users={[
          {
            id: user["GtResourceUser.0.id"],
            email: user["GtResourceUser.0.email"],
            department: user["GtResourceUser.0.department"],
            jobTitle: user["GtResourceUser.0.jobtitle"],
            picture: "GtResourceUser.0.picture",
            sip: "GtResourceUser.0.sip",
            title: user["GtResourceUser.0.title"],
            value: user["GtResourceUser.0.key"],
          },
        ]}
        key={user["Editor.0.key"]}
      />
    );
  };

  console.log(listElements);
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
const fetchItemsCaml = async (listName: string) => {
  const list: any = await sp.web.lists
    .getByTitle(listName)
    .views.getByTitle("Alle elementer")
    .fields.get();

  const rows = await sp.web.lists
    .getByTitle(listName)
    .renderListData(`<View> <ViewFields>${list.SchemaXml}</ViewFields></View>`);

  // Some ghetto way to render lookup fields... (Temporary)
  rows.Row.map((row) => {
    if (row["GtResourceUser"]) {
      row["GtResourceUser"] = row.GtResourceUser[0].title;
    }
    if (row["Editor"]) {
      row["Editor"] = row.Editor[0].title;
    }
    if (row["GtProjectPhase"]) {
      row["GtProjectPhase"] = row.GtProjectPhase.Label;
    }
    if (row["GtActionResponsible"]) {
      row["GtActionResponsible"] = row.GtActionResponsible[0].title;
    }
  });

  //Linktitle is the default "Title", but needs to be with the "Title" key på be properly mapped to the column
  rows.Row.map((r) => {
    r.LinkTitle = r.Title;
    return r;
  });

  console.log(rows.Row);
  return rows.Row;
};

/**
 * Fetch data from the selected list
 * @param listName
 * @param viewFields
 */
const fetchListItems = async (listName: string, viewFields: IFieldInfo[]) => {
  const internalNames = viewFields.map((field) => field.InternalName);
  const items = await sp.web.lists
    .getByTitle(listName)
    .items.select(...internalNames)
    .expand("")
    .get();

  console.log(items);
  return items;
};

/**
 * Fetches internal and display name for the selected list (and view when this will be implemented)
 * @param listName
 */
const fetchInternalAndExternalColumns = async (listName: string) => {
  const fields: any = await sp.web.lists
    .getByTitle(listName)
    .views.getByTitle("Alle elementer")
    .fields.get();

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
