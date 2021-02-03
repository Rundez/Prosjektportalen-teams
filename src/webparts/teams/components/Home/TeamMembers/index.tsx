import React, { FunctionComponent } from 'react';
import { Flex, List } from '@fluentui/react-northstar';
import { ITeamMembersProps } from './types';

export const TeamMembers: FunctionComponent<ITeamMembersProps> = (props) => {


    return (
        <div>
            <Flex hAlign="end">
                <div style={{ backgroundColor: "SpringGreen", }}>
                    <Flex.Item >
                        <List items={props.items} />
                    </Flex.Item>
                </div>
            </Flex>
            <Flex>
            </Flex>
        </div>
    )
}
