import React, { FunctionComponent, useState, useEffect, useRef } from "react";
import { IGenericListInputProps } from "./types";
import {
  Button,
  compose,
  createClassResolver,
  Flex,
} from "@fluentui/react-northstar";
import { InputField } from "./InputField/index";
import { sp } from "@pnp/sp";
import { Spinner } from "office-ui-fabric-react";

export const GenericListInput: FunctionComponent<IGenericListInputProps> = ({
  listName,
  context,
  closeHandler,
  editData = null,
}) => {
  const [listFields, setListFields] = useState<any[]>([]);
  const [updatedListFields, setUpdatedListFields] = useState<any[]>();
  const [value, setValue] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const rowData = useRef<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      rowData.current = await fetchRowData();
      await fetchListFields();
    };
    if (editMode != null) {
      fetchData();
    }
  }, []);

  useEffect(() => {
    setUpdatedListFields(transformRowData());
  }, [listFields]);

  /**
   * Transforms the selected row to match the input fields structure
   */
  const transformRowData = () => {
    if (listFields.length > 0 && rowData.current[0] != null) {
      console.log(rowData.current[0]);
      console.log(listFields);

      const updatedFields = listFields.map((field) => {
        const updatedField = {
          value: rowData.current[0][field.StaticName],
          ...field,
        };
        return updatedField;
        //console.log(rowData.current[0][field.StaticName]);
      });
      console.log(updatedFields);
      return updatedFields;
    }
  };

  /**
   * Fetches values for the selected row if editMode is on
   */
  const fetchRowData = async () => {
    const rows = await sp.web.lists
      .getByTitle(listName)
      .renderListData("<View></View>");

    return rows.Row.filter((row) => row.ID == editData.row);
  };

  /**
   * Fetches fields for the selected list.
   */
  const fetchListFields = async () => {
    const list = await sp.web.lists
      .getByTitle(listName)
      .fields.filter("ReadOnlyField eq false and Hidden eq false")
      .get();

    //list.map((field) => {
    //  setListFields((current) => [...current, field]);
    //});
    setListFields(list);
  };

  /**
   * Handles the input from the child components and sets it to the state
   */
  const handleInput = (value: string | any, name: string | boolean) => {
    if (typeof value === "object") {
      setValue((curr) => [
        ...curr.filter((obj: any) => obj.fieldName !== name),
        {
          fieldName: name,
          fieldValue: {
            TermGuid: value.key,
            WssId: "-1",
          },
        },
      ]);
    } else {
      setValue((curr) => [
        ...curr.filter((obj: any) => obj.fieldName !== name),
        { fieldName: name, fieldValue: value },
      ]);
    }
  };

  /**
   * Adds the current items to the associated SP list
   */
  const addItemsToSpList = async (lName: string, inputValues: any) => {
    let newValues = new Map<string, any>();
    inputValues.map((obj) => newValues.set(obj.fieldName, obj.fieldValue));

    // Convert the map to a object
    let obj = [...newValues.entries()].reduce(
      (obj, [key, value]) => ((obj[key] = value), obj),
      {}
    );
    console.log(obj);
    //add an item to the list
    const result = await sp.web.lists.getByTitle(lName).items.add(obj);
    console.log(result);
    closeHandler();
  };

  return (
    <>
      <form>
        {updatedListFields &&
          updatedListFields.map((field, index) => (
            <InputField
              field={field}
              key={index}
              onChange={handleInput}
              context={context}
              listName={listName}
            />
          ))}
        <Flex gap="gap.medium" style={{ marginTop: 10 }}>
          <Button
            primary
            content="Legg til"
            onClick={() => addItemsToSpList(listName, value)}
          />
          <Button secondary content="Avbryt" onClick={closeHandler} />
        </Flex>
      </form>
    </>
  );
};
