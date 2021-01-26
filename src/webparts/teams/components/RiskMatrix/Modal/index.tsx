import React, { useState } from 'react';
import { Portal, Button, Header, Divider, Input, Flex } from '@fluentui/react-northstar'
import { Modal } from 'office-ui-fabric-react';

export const Popup = (() => {
    const [isOpen, setIsOpen] = useState(false);

    console.log(isOpen);

    return (
        <>
            <Button onClick={() => setIsOpen(!isOpen)} />


            <Modal
                isOpen={isOpen}
                isBlocking={false}
                containerClassName="containerBody"
            >
                <div className="containerBody" style={{width: 400, height:400}}>
                    <h1>Hello</h1> <br/>
                    <Button content="Put me down" onClick={() => setIsOpen(false)}/>
                </div>
            </Modal>

        </>
    )
}) 