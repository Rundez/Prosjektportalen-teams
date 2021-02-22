import React, { FunctionComponent } from 'react';
import { Flex, List, Avatar } from '@fluentui/react-northstar';
import { ITeamMembersProps } from './types';
import { noWrap } from 'office-ui-fabric-react';

 

export const TeamMembers: FunctionComponent<ITeamMembersProps> = (props) => {

    const newList = [...props.items, ...testMembers]
    return (
        <div>
            <Flex hAlign="end">
                <div style={{ backgroundColor: "White", 
                            boxShadow: " 2px 2px 2px #888888", 
                            overflow: "auto", 
                            height: "400px", 
                            marginTop: "10px"}}>
                    <Flex.Item >
                        <List items={newList} />
                    </Flex.Item>
                </div>
            </Flex>
            <Flex>
            </Flex>
        </div>
    )
}
const testMembers = [
    {
        key: 10,
        header: "Gunnar Leif",
        content: "Gunnar@leif.livet",
        media: <Avatar name= "Gunnar Leif" />
    },
    {
        key: 11,
        header: "Liljan Sofie",
        content: "Liljan@test.livet",
        media: <Avatar name= "Liljan Sofie" />
    },
    {
        key: 12,
        header: "Cecilie Tuva",
        content: "Cecilie@test.livet",
        media: <Avatar name= "Cecilie Tuva" />
    },
    {
        key: 13,
        header: "Geir Ove",
        content: "Geir@test.livet",
        media: <Avatar name= "Geir Ove" />
    },
    {
    key: 14,
        header: "Per Svein",
        content: "Per@test.livet",
        media: <Avatar name= "Per Svein" />
    },
    {
        key: 15,
        header: "Millie The Cat",
        content: "Millie@test.livet",
        media: <Avatar name= "Millie the Cat" />
    },
    {
        key: 16,
        header: "Ludvig The Dog",
        content: "Ludvig@test.livet",
        media: <Avatar name= "Ludvig the Dog" />
    },

]
