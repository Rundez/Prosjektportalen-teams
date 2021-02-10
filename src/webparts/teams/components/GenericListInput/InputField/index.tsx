import { IFieldInfo, FieldTypes } from '@pnp/sp/fields';
import React, { useState, FunctionComponent } from 'react';
import { Input, Flex, Dropdown, TextArea } from '@fluentui/react-northstar';
import { Toggle } from 'office-ui-fabric-react';

export const InputField: FunctionComponent<any> = ({ field, register }) => {


    // Check the fieldtype and return a corresponding input element..
    switch (field.FieldTypeKind) {
        case FieldTypes.Text: {
            return (
                <>
                <Flex>
                    <Input label={field.Title} fluid ref={register} />
                </Flex>

                 <Flex>
                 <input placeholder="dette er et test felt" ref={register} name="TESTLOL"/>
                </Flex>
             </>
            )
        }
        case FieldTypes.Boolean: {
            return (
                <Toggle label={field.Title}/>
            )
        }
        case FieldTypes.Choice: {
            return (
                <>
                    <Flex gap="gap.medium">
                        {field.Title}
                    </Flex>
                    <Flex>
                        <Dropdown
                         placeholder={field.Title} 
                         items={field.Choices} 
                         fluid
                         />
                    </Flex>
                </>
            )
        }
        case FieldTypes.Calculated: {
            return (
                <p>Calculated field</p>
            )
        }
        case FieldTypes.Integer: {
            return (
                <p>Integer field</p>
            )
        }
        case FieldTypes.DateTime: {
            return (
                <p>Datetime field</p>
            )
        }
        case FieldTypes.MultiChoice: {
            return (
                <p>Multichoice</p>
            )
        }
        case FieldTypes.Note: {
            return (
                <>
                <Flex>
                    {field.Title}
                </Flex>
                <Flex>
                    <TextArea placeholder={field.TypeShortDescription} fluid ref={register}/>
                </Flex>
                </>
            )
        }
        case FieldTypes.User: {
            return (
                <p>User/person field {field.Title}</p>
            )
        }
        // This should really be a taxonomy field
        case FieldTypes.Invalid: {
            return (
                <>
                    <Flex>
                        {field.Title}
                    </Flex>
                    <Flex>
                        <Input fluid />
                    </Flex>
                </>
            )
        }
        case FieldTypes.Number: {
            return (
                <Flex>
                    <Input label={field.Title} placeholder={field.Description} fluid />
                </Flex>
            )
        }
        // This can be a content type
        case FieldTypes.Computed: {
            return (
                <p>{field.Title}</p>
            )
        }
        case FieldTypes.Attachments: {
            return (
                <p>Attachment field</p>
            )
        }
        case FieldTypes.Lookup: {
            return (
                <p>Lookup field</p>
            )
        }
        default: {
            return (
                <p>No matching field found</p>
            )
        }
    }

}