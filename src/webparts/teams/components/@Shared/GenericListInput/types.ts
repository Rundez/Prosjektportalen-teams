import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IGenericListInputProps {
    listName: string;
    context?: WebPartContext;
    closeHandler: () => void; 
}


export interface IFieldType {
    Description: string;
    EntityPropertyName: string;
    Group: string;
    Id: string;
    InternalName: string;
    MaximumValue: number;
    MinimumValue: number;
    ReadOnlyField: boolean;
    Required: boolean;
    SchemaXml: string;
    Title: string;
    TypeDisplayName: string;
}