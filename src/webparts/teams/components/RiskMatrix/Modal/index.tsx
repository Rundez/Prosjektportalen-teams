import * as React from 'react';
import { Portal, Button, Header, Divider, Input, Flex } from '@fluentui/react-northstar'

export const Modal = (() => {

    return (
        <>
            <Portal
                content={
                    <div
                        style={{
                            position: 'fixed',
                            left: '40%',
                            top: '45%',
                            zIndex: 1000,
                            backgroundColor: '#fff',
                            padding: '15px',
                            boxShadow: 'rgb(187, 187, 187) 0px 2px 8px',
                            border: '1px solid rgba(34,36,38,.15)',
                            borderRadius: '5px',
                        }}
                    >
                        <Header>Add risk element</Header>
                        <Flex gap="gap.small">
                            <Input label="Test1" />
                        </Flex>
                        <Flex gap="gap.small">
                            <Input label="Test2" />
                        </Flex>

                    </div>
                }
                trigger={<Button content={'Add element'} />}
            />
        </>
    )
}) 