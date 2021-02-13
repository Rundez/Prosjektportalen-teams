import React, { FunctionComponent, useState, useEffect } from 'react';
import { IGenericListInputProps } from './types';
import { Button } from '@fluentui/react-northstar';
import { InputField } from './InputField/index';
//import { IFieldType } from './types';

import { sp, IFieldInfo } from "@pnp/sp/presets/all";
import { InputTypes } from './InputField/types';
import { useForm } from "react-hook-form";

export const GenericListInput: FunctionComponent<IGenericListInputProps> = ({ listName, context }) => {

    const [fields, setFields] = useState([]);
    const [contentTypeID, setContentTypeID] = useState([]);
    const [listFields, setListFields] = useState<IFieldInfo[]>([]);

    const[value, setValue] = useState([{}]);

    useEffect(() => {
        fetchViewListData(listName);
        fetchFieldData(listName);
        fetchListFields(listName);
    }, [])

    // Fetch the standard view fields. Currently not in use.
    const fetchViewListData = async (listName) => {
        const list = sp.web.lists.getByTitle(listName)
            .views.getByTitle("Alle elementer")
            .fields.get()
            .then((data) => setFields(data["Items"]));
        return list;
    }

    // This should fetch fields for THE SELECTED list. AND IT DOES.
    const fetchListFields = async (listName) => {
        const list = sp.web.lists.getByTitle(listName)
            .fields.filter("ReadOnlyField eq false and Hidden eq false").get()
            .then(fields => fields.map(field => {
                setListFields(current => [...current, field])
            }));
        return list;
    }

    // Fetches the content type ID for the list. Currently not in use.
    const fetchFieldData = async (listName) => {
        const list = sp.web.lists.getByTitle(listName)
            .contentTypes.get()
            .then(ct => ct.map(ct => setContentTypeID(current => [...current, ct.Id])))
    }

    // Handles the input from the child components
    const handleInput = (value: React.KeyboardEvent, name: string | boolean) => {
        setValue(curr => [...curr.filter((obj: any) => obj.fieldName !== name), {fieldName: name, fieldValue: value }]);
    }

    console.log(value);
    return (
        <>
        <form>
            {listFields.map((field, index) => (
                <InputField field={field} key={index} onChange={handleInput} context={context}/>
            )
            )}
            <Button primary type="submit" content="Add Item"/>
        </form>

        </>
    )
}


