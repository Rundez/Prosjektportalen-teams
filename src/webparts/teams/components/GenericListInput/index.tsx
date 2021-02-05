import React, { FunctionComponent, useState, useEffect } from 'react';
import { IGenericListInputProps } from './types';

import { sp, List, IList, ContentTypes, IContentTypes, Fields, IFields} from "@pnp/sp/presets/all";

export const GenericListInput: FunctionComponent<IGenericListInputProps> = ({ listName }) => {

    const [data, setData] = useState();

    useEffect(() => {
       fetchListData(listName);
    }, [])

    const items = [
    ]

    return (
        <>
        </>
    )
}

const _getSelection = (items: any[]) => {
    console.log('Selected items:', items);
  }

  // Fetch the standard view fields
const fetchListData = async (listName) => {
    const list = sp.web.lists.getByTitle(listName)
    .views.getByTitle("Alle elementer")
    .fields.get()
    .then((data) => console.log(data["Items"]))
}