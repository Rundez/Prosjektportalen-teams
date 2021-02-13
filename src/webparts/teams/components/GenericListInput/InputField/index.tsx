import { IFieldInfo, FieldTypes } from '@pnp/sp/fields';
import React, { useState, FunctionComponent } from 'react';
import { Input, Flex, TextArea, Dropdown } from '@fluentui/react-northstar';
import { Toggle } from 'office-ui-fabric-react';
import { TaxonomyPicker, IPickerTerms } from "@pnp/spfx-controls-react/lib/TaxonomyPicker";
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";


export const InputField: FunctionComponent<any> = ({ field, onChange, context }) => {
    const [setValue, getValue] = useState("");


    // Check the fieldtype and return a corresponding input element..
    switch (field.FieldTypeKind) {
        case FieldTypes.Text: {
            return (
                <>
                <Flex>
                    <Input 
                    label={field.Title} 
                    fluid 
                    onChange={(e: any) => onChange(e.target.value, field.EntityPropertyName)}
                    />
                </Flex>
             </>
            )
        }
        case FieldTypes.Boolean: {
            let checked = false
            return (
                <Toggle label={field.Title}
                onChange={(e: any) => {
                    checked = !checked;
                    onChange(checked, field.EntityPropertyName)}
                } />
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
                         getA11ySelectionMessage={{
                             onAdd: item => onChange(item, field.EntityPropertyName)
                         }}
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
                    <TextArea 
                    placeholder={field.TypeShortDescription} 
                    fluid 
                    name={field.EntityPropertyName}
                    onChange={(e: any) => onChange(e.target.value, field.EntityPropertyName)}
                    />
                </Flex>
                </>
            )
        }
        case FieldTypes.User: {
            const _getPeoplePickerItems = (items: any[]) => {
                console.log('Items:', items);
                onChange(items, field.EntityPropertyName)
            }

            return (
                <PeoplePicker
                    context={context}
                    titleText={field.Title}
                    personSelectionLimit={3}
                    onChange={_getPeoplePickerItems}
                    principalTypes={[PrincipalType.User]}
                    />            
                    )
        }
        // This should really be a taxonomy field
        case FieldTypes.Invalid: {

            const onTaxPickerChange = (terms : IPickerTerms) => {
                console.log("Terms", terms);
                onChange(terms, field.EntityPropertyName)
              }
            return (
                <>
                <TaxonomyPicker
                termsetNameOrID="Fase"
                panelTitle="Velg fase"
                label={field.Title}
                context={context}
                isTermSetSelectable={false} 
                onChange={onTaxPickerChange}
                />
                </>
            )
        }
        case FieldTypes.Number: {
            return (
                <Flex>
                    <Input label={field.Title} 
                    placeholder={field.Description} 
                    fluid
                    onChange={(e: any) => onChange(e.target.value, field.EntityPropertyName)} />
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