import React, { FunctionComponent, useEffect, useState } from 'react';
import { useBoolean } from '@uifabric/react-hooks';
import { Button, Flex, FlexItem, Input, Dropdown, Text, TextArea, Form } from '@fluentui/react-northstar';
import { Panel } from 'office-ui-fabric-react/lib/Panel';
import { sp } from "@pnp/sp/presets/all";
import { useForm } from 'react-hook-form';


export const AddElementDialog: FunctionComponent = () => {
  const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false);
  const { register, handleSubmit } = useForm();

  const printData = data => console.log(data);


  return (
    <>
      <Button primary content="Add item" onClick={openPanel} style={{ marginBottom: 10 }} />
      <Panel
        headerText="Add risk/opportunity"
        isOpen={isOpen}
        onDismiss={dismissPanel}
        closeButtonAriaLabel="Close"
      >
        <div>
          <Form onSubmit={handleSubmit(printData)}>
            <Input ref={register} name="title" label="Tittel" fluid/>
            <Dropdown items={phase} fluid/>
            <Input ref={register} name="probability" label="Sannsynlighet (S)" fluid/>
            <Input ref={register} name="conseqence" label="Konsekvens (K)" fluid/>
            <Input ref={register} name="propbAfter" label="S etter tiltak" fluid/>
            <Input ref={register} name="consAfter" label="K etter tiltak" fluid/>
            <Flex gap="gap.medium" style={{ marginTop: 10 }}>
              <FlexItem>
                <Button primary content="Add item" type="submit" />
              </FlexItem>
              <FlexItem>
                <Button secondary content="Cancel" onClick={dismissPanel} />
              </FlexItem>
            </Flex>
          </Form>
        </div>
      </Panel>
    </>
  )
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