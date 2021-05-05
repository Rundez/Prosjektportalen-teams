import React, { useState, FunctionComponent, useEffect } from "react";
import { IDisplayTableProps } from "./types";
import { ListView, IViewField } from "@pnp/spfx-controls-react/lib/ListView";
//import { sp, IFieldInfo } from "@pnp/sp/presets/all";
import { sp } from "@pnp/sp";
import { IFieldInfo } from "./types";
import { FieldTextRenderer } from "@pnp/spfx-controls-react/lib/FieldTextRenderer";
import { FieldUserRenderer } from "@pnp/spfx-controls-react/lib/FieldUserRenderer";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IPrincipal } from "@pnp/spfx-controls-react/lib/common/SPEntities";
import { IContext } from "@pnp/spfx-controls-react/lib/common/Interfaces";
import { FieldTaxonomyRenderer } from "@pnp/spfx-controls-react/lib/FieldTaxonomyRenderer";
import { Spinner } from "office-ui-fabric-react";

export const TestTable: FunctionComponent<IDisplayTableProps> = ({
  listName,
  context,
}) => {
  const [listColumns, setListColumns] = useState<IViewField[]>([]);
  const [listElements, setListElements] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  useEffect(() => {
    const fetchItems = async () => {
      const rows = await fetchItemsCaml(listName);
      setListElements(rows);
      setIsLoading(false);

      const names = await fetchInternalAndExternalColumns(listName);
      const updatedNames = await convertListColumns(names);

      setListColumns(updatedNames);
      console.log(names);
      console.log(updatedNames);
    };
    fetchItems();
  }, [isLoading]);

  /**
   * Convert the columns to the accepted format
   * @param listName
   */
  const convertListColumns = async (
    columns: IFieldInfo[]
  ): Promise<IViewField[]> => {
    const list = columns.map((field: any) => {
      if (field["odata.type"] === "SP.FieldUser") {
        return {
          name: field.InternalName,
          displayName: field.Title,
          sorting: true,
          isResizable: true,
          minWidth: 50,
          maxWidth: 100,
          render: _renderUserColumn,
        };
      }
      if (field["odata.type"] === "SP.Taxonomy.TaxonomyField") {
        console.log(field);
        return {
          name: field.InternalName,
          displayName: field.Title,
          sorting: true,
          isResizable: true,
          minWidth: 50,
          maxWidth: 100,
          render: _renderTaxonomyColumn,
        };
      }
      return {
        name: field.InternalName,
        displayName: field.Title,
        sorting: true,
        isResizable: true,
        minWidth: 50,
        maxWidth: 100,
      };
    });

    return list;
  };

  const _renderTaxonomyColumn = (row: any, index: number) => {
    if (listElements[index] != undefined) {
      console.log(row);
      if (listElements[index].hasOwnProperty("GtResourceRole")) {
        return listElements[index].GtResourceRole.Label;
      }
    }
  };

  const _renderUserColumn = (user: any) => {
    console.error(user);
    return (
      <FieldUserRenderer
        context={context as IContext}
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

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <ListView items={listElements} viewFields={listColumns} showFilter />
      )}
    </div>
  );
};

/**
 * Fetch the fields for the selected view
 * @param listName
 */
const fetchItemsCaml = async (listName: string) => {
  const viewData: any = await sp.web.lists
    .getByTitle(listName)
    .views.getByTitle("Alle elementer")
    .fields.get();

  console.log(viewData);
  const rows = await sp.web.lists
    .getByTitle(listName)
    .renderListData(
      `<View> <ViewFields>${viewData.SchemaXml}</ViewFields></View>`
    );
  //Linktitle is the default "Title", but needs to be with the "Title" key på be properly mapped to the column
  rows.Row.map((r) => {
    r.LinkTitle = r.Title;
    return r;
  });

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

  return items;
};

/**
 * Fetches internal and display name for the selected list (and view when this will be implemented)
 * @param listName
 */
const fetchInternalAndExternalColumns = async (listName: string) => {
  const fields = await sp.web.lists
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
