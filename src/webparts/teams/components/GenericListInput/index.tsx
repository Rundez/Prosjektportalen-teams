import React, { FunctionComponent, useState, useEffect } from 'react';
import { IGenericListInputProps } from './types';
import { Button } from '@fluentui/react-northstar';
import { InputField } from './InputField/index';
//import { IFieldType } from './types';

import { sp, List, IList, ContentTypes, IContentTypes, Fields, IFields, IFieldInfo } from "@pnp/sp/presets/all";
import { InputTypes } from './InputField/types';

export const GenericListInput: FunctionComponent<IGenericListInputProps> = ({ listName, context }) => {

    const [fields, setFields] = useState([]);
    const [contentTypeID, setContentTypeID] = useState([]);
    const [listFields, setListFields] = useState<IFieldInfo[]>([]);



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

    console.log(listFields);
    return (
        <>
        <form>

            {listFields.map((field, index) => (
                <InputField field={field} key={index}/>
            )
            )}
        </form>

        </>
    )
}


