import React, { FunctionComponent, useEffect, useState } from 'react';
import { useBoolean } from '@uifabric/react-hooks';
import { Button, Flex, FlexItem, Input, Dropdown, Text, TextArea, Form } from '@fluentui/react-northstar';
import { Panel } from 'office-ui-fabric-react/lib/Panel';
import { sp } from "@pnp/sp/presets/all";
import { useForm } from 'react-hook-form';


export const AddElementDialog: FunctionComponent = () => {
    const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false);
    const [formData, setFormData] = useState([{}]);
    const { register, handleSubmit } = useForm();

    const fields = [
        {
          label: 'Tittel',
          name: 'title',
          id: 'title',
          key: 'title',
          required: true,
          ref: register,
          control: {
            as: Input,
            showSuccessIndicator: false,
            fluid: true
          },
        },
        {
          label: 'Fase',
          name: 'fase',
          id: 'fase-shorthand',
          key: 'fase',
          required: false,
          ref: register,
          control: {
            as: Dropdown,
            items: phase,
            search: true,
            fluid: true
          },
        },
        {
            label: 'Sannsynlighet (S)',
            name: 'propability',
            id: 'probability',
            key: 'probability',
            required: true,
            ref: register,
            control: {
              as: Input,
              showSuccessIndicator: false,
              fluid: true
            },
          },
          {
            label: 'Konsekvens',
            name: 'consequence',
            id: 'consequence',
            key: 'consequence',
            required: true,
            ref: register,
            control: {
              as: Input,
              showSuccessIndicator: false,
              fluid: true
            },
          },
          {
            label: 'S etter tiltak',
            name: 'probAfter',
            id: 'probAfter',
            key: 'probAfter',
            required: true,
            ref: register,
            control: {
              as: Input,
              showSuccessIndicator: false,
              fluid: true
            },
          },
          {
            label: 'K etter tiltak',
            name: 'consAfter',
            id: 'consAfter',
            key: 'consAfter',
            required: true,
            ref: register,
            control: {
              as: Input,
              showSuccessIndicator: false,
              fluid: true
            },
          },
          {
          control: {
            as: Button,
            content: 'Submit',
          },
          key: 'submit',
        },
      ]

      const onSubmit = (data) => {
        console.log(data);
      }


    return (
        <>
            <Button primary content="Add item" onClick={openPanel} style={{marginBottom: 10}}/>
            <Panel
                headerText="Add risk/opportunity"
                isOpen={isOpen}
                onDismiss={dismissPanel}
                closeButtonAriaLabel="Close"
            >
                <div>
                    <Form 
                    fields={fields}
                    onSubmit={handleSubmit(onSubmit)}
                    />
                    <Flex gap="gap.medium" style={{marginTop: 10}}>
                        <FlexItem>
                            <Button primary content="Add item" onClick={() => {dismissPanel(), addToList()}} />
                        </FlexItem>
                        <FlexItem>
                            <Button secondary content="Cancel" onClick={dismissPanel} />
                        </FlexItem>
                    </Flex>
                </div>
            </Panel>
        </>
    )
}

const addToList = () => {
    console.log("Nice");
}

const phase = [
    'Ingen fase',
    'Flere faser',
    'Konsept',
    'Planlegge',
    'Gjennomføre',
    'Avslutte',
    'Realisere'
];

