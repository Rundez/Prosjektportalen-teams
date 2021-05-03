import React, { FunctionComponent, useState, useEffect } from "react";
import { IGenericListInputProps } from "./types";
import { Button, createClassResolver, Flex } from "@fluentui/react-northstar";
import { InputField } from "./InputField/index";
import { sp } from "@pnp/sp";

export const GenericListInput: FunctionComponent<IGenericListInputProps> = ({
  listName,
  context,
  closeHandler,
}) => {
  const [fields, setFields] = useState([]); // Not in use
  const [contentTypeID, setContentTypeID] = useState([]); // Not in use. Could be needed?
  const [listFields, setListFields] = useState<any[]>([]);
  const [value, setValue] = useState([]);

  useEffect(() => {
    //fetchViewListData(listName);
    //fetchFieldData(listName);
    fetchListFields(listName);
  }, []);

  // Fetch the standard view fields. Currently not in use.
  const fetchViewListData = async (listName) => {
    const list = sp.web.lists
      .getByTitle(listName)
      .views.getByTitle("Alle elementer")
      .fields.get()
      .then((data) => setFields(data["Items"]));
    return list;
  };

  /**
   * Fetches fields for the selected list.
   */
  const fetchListFields = async (listName: string) => {
    const list = sp.web.lists
      .getByTitle(listName)
      .fields.filter("ReadOnlyField eq false and Hidden eq false")
      .get()
      .then((fields) =>
        fields.map((field) => {
          setListFields((current) => [...current, field]);
        })
      );
    return list;
  };

  // Fetches the content type ID for the list. Currently not in use.
  const fetchFieldData = async (listName: string) => {
    const list = sp.web.lists
      .getByTitle(listName)
      .contentTypes.get()
      .then((ct) =>
        ct.map((ct) => setContentTypeID((current) => [...current, ct.Id]))
      );
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

    // Convert the map to a object according
    let obj = [...newValues.entries()].reduce(
      (obj, [key, value]) => ((obj[key] = value), obj),
      {}
    );
    console.log(obj);
    //add an item to the list
    const result = await sp.web.lists.getByTitle(lName).items.add(obj);
    closeHandler();
    console.log(result);
  };
  return (
    <>
      <form>
        {listFields.map((field, index) => (
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
