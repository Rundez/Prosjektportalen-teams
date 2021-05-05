import { FieldTypes } from "./types";
import React, { useState, FunctionComponent } from "react";
import { Input, Flex, TextArea, Dropdown } from "@fluentui/react-northstar";
import { Toggle } from "office-ui-fabric-react";
import {
  TaxonomyPicker,
  IPickerTerms,
} from "@pnp/spfx-controls-react/lib/TaxonomyPicker";
import {
  PeoplePicker,
  PrincipalType,
} from "@pnp/spfx-controls-react/lib/PeoplePicker";
import {
  DateTimePicker,
  DateConvention,
} from "@pnp/spfx-controls-react/lib/DateTimePicker";

/**
 * Returns a corresponding component based on the fieldtype.
 * TODO: Add a field interface
 */
export const InputField: FunctionComponent<any> = ({
  field,
  onChange,
  context,
  listName,
}) => {
  switch (field.FieldTypeKind) {
    case FieldTypes.Text: {
      return (
        <>
          <Flex>
            <Input
              label={field.Title}
              fluid
              onChange={(e: any) =>
                onChange(e.target.value, field.EntityPropertyName)
              }
            />
          </Flex>
        </>
      );
    }
    case FieldTypes.Boolean: {
      let checked = false;
      return (
        <Toggle
          label={field.Title}
          onChange={(e: any) => {
            checked = !checked;
            onChange(checked, field.EntityPropertyName);
          }}
        />
      );
    }
    case FieldTypes.Choice: {
      return (
        <>
          <Flex gap="gap.medium">{field.Title}</Flex>
          <Flex>
            <Dropdown
              placeholder={field.Title}
              items={field.Choices}
              fluid
              getA11ySelectionMessage={{
                onAdd: (item) => onChange(item, field.EntityPropertyName),
              }}
            />
          </Flex>
        </>
      );
    }
    case FieldTypes.Calculated: {
      console.log(field.Title);

      return <p>Calculated field</p>;
    }
    case FieldTypes.Integer: {
      console.log(field.Title);

      return <p>Integer field</p>;
    }
    case FieldTypes.DateTime: {
      const handleChange = (date: Date) => {
        console.log(date);
        onChange(date.toISOString(), field.EntityPropertyName);
      };

      return (
        <DateTimePicker
          label={field.Title}
          dateConvention={DateConvention.Date}
          showLabels={false}
          onChange={(date) => handleChange(date)}
        />
      );
    }
    case FieldTypes.MultiChoice: {
      console.log(field.Title);

      return <p>Multichoice</p>;
    }
    case FieldTypes.Note: {
      return (
        <>
          <Flex>{field.Title}</Flex>
          <Flex>
            <TextArea
              placeholder={field.TypeShortDescription}
              fluid
              name={field.EntityPropertyName}
              onChange={(e: any) =>
                onChange(e.target.value, field.EntityPropertyName)
              }
            />
          </Flex>
        </>
      );
    }

    // ID is appended to the name since it is a lookup field..
    case FieldTypes.User: {
      const _getPeoplePickerItems = (items: any[]) => {
        console.log("Items:", items);
        const id: string = items[0].id;
        const propertyName: string = field.EntityPropertyName + "Id";
        onChange(id, propertyName);
      };

      return (
        <PeoplePicker
          context={context}
          titleText={field.Title}
          personSelectionLimit={1}
          onChange={_getPeoplePickerItems}
          principalTypes={[PrincipalType.User]}
          ensureUser
          resolveDelay={1000}
          groupName=""
        />
      );
    }
    // This should really be a taxonomy field
    case FieldTypes.Invalid: {
      const onTaxPickerChange = (terms: IPickerTerms) => {
        console.log("Terms", terms);

        // call the onchange function and pass the whole term element.
        // Should be refactored to also work with multiple terms
        onChange(terms[0], field.EntityPropertyName);
      };
      return (
        <>
          <TaxonomyPicker
            termsetNameOrID={field.TermSetId}
            panelTitle="Velg fase"
            label={field.Title}
            context={context}
            isTermSetSelectable={false}
            onChange={onTaxPickerChange}
          />
        </>
      );
    }
    case FieldTypes.Number: {
      return (
        <Flex>
          <Input
            label={field.Title}
            placeholder={field.Description}
            fluid
            onChange={(e: any) =>
              onChange(e.target.value, field.EntityPropertyName)
            }
          />
        </Flex>
      );
    }
    // This can be a content type
    case FieldTypes.Computed: {
      return <p></p>;
    }
    case FieldTypes.Attachments: {
      return <p></p>;
    }
    case FieldTypes.Lookup: {
      console.log(field.Title);
      return <p>Lookup field</p>;
    }
    default: {
      return <p>No matching field found</p>;
    }
  }
};
