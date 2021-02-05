import React, { FunctionComponent, useState, useEffect } from 'react';
import { IGenericListInputProps } from './types';
import { Button } from '@fluentui/react-northstar';

import { sp, List, IList, ContentTypes, IContentTypes, Fields, IFields } from "@pnp/sp/presets/all";

export const GenericListInput: FunctionComponent<IGenericListInputProps> = ({ listName }) => {

    const [fields, setFields] = useState([]);
    const [contentTypeID, setContentTypeID] = useState([]);


    useEffect(() => {
        fetchViewListData(listName);
        fetchFieldData(listName);
    }, [])

    // Fetch the standard view fields
    const fetchViewListData = async (listName) => {
        const list = sp.web.lists.getByTitle(listName)
            .views.getByTitle("Alle elementer")
            .fields.get()
            .then((data) => setFields(data["Items"]));
        return list;
    }

    // Fetches the content type ID for the list 
    const fetchFieldData = async (listName) => {
        const list = sp.web.lists.getByTitle(listName)
            .contentTypes.get()
            .then(ct => ct.map(ct => setContentTypeID(current => [...current, ct.Id])))
    }
    console.log(contentTypeID);
    console.log(fields);
    return (
        <>
        </>
    )
}

const _getSelection = (items: any[]) => {
    console.log('Selected items:', items);
}

