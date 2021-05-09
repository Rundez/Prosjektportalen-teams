import React, { FunctionComponent, useEffect, useState } from "react";
import { useBoolean } from "@uifabric/react-hooks";
import { Form } from "@fluentui/react-northstar";
import { Panel } from "office-ui-fabric-react/lib/Panel";
import { useForm } from "react-hook-form";
import { GenericListInput } from "../GenericListInput/";
import { ISideBarProps } from "./types";

/**
 * Renders a sidebar with input fields according to the list.
 */
export const AddElementDialog: FunctionComponent<ISideBarProps> = ({
  context,
  listName,
  shouldPanelOpen,
  onClose,
  editData,
}) => {
  const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(
    false
  );
  const { register, handleSubmit } = useForm();
  const printData = (data) => console.log(data);

  useEffect(() => {
    shouldPanelOpen ? openPanel() : "";
  }, []);
  /**
   * Closes the window when either "Add item" og "Dismiss is pressed"
   */
  const onClickHandler = () => {
    dismissPanel();
    onClose();
  };

  return (
    <>
      <Panel
        headerText="Legg til"
        isOpen={isOpen}
        onDismiss={dismissPanel}
        closeButtonAriaLabel="Avbryt"
      >
        <div>
          <Form onSubmit={handleSubmit(printData)}>
            <GenericListInput
              listName={listName}
              context={context}
              closeHandler={onClickHandler}
              editData={editData}
            />
          </Form>
        </div>
      </Panel>
    </>
  );
};
