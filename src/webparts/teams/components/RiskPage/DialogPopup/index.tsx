import React, { FunctionComponent, useEffect, useState } from 'react';
import { useBoolean } from '@uifabric/react-hooks';
import { Button, Flex, FlexItem, Input, Dropdown, Text, TextArea, Form } from '@fluentui/react-northstar';
import { Panel } from 'office-ui-fabric-react/lib/Panel';
import { sp } from "@pnp/sp/presets/all";
import { useForm } from 'react-hook-form';
import { GenericListInput } from '../../GenericListInput/index';
import { ISideBarProps } from './types'

/**
 * Renders a sidebar with input fields according to the list.
 */
export const AddElementDialog: FunctionComponent<ISideBarProps> = ({context, listName}) => {
  const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false);
  const { register, handleSubmit } = useForm();

  const printData = data => console.log(data);

  /**
   * Closes the window when either "Add item" og "Dismiss is pressed"
   */
  const onClickHandler = () => {
    dismissPanel();
  }

  return (
    <>
      <Button primary content="Add item" onClick={openPanel} style={{ marginBottom: 10 }} />
      <Panel
        headerText="Add item"
        isOpen={isOpen}
        onDismiss={dismissPanel}
        closeButtonAriaLabel="Close"
      >
        <div>
          <Form onSubmit={handleSubmit(printData)}>
          <GenericListInput listName={listName} context={context} closeHandler={onClickHandler}/>
          </Form>
        </div>
      </Panel>
    </>
  )
}