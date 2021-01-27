import * as React from 'react';
import {Text, Button, Flex} from '@fluentui/react-northstar';
import { TeamMembers } from '../TeamMembers/index'

export default function Home() {

    return (
        <div>
            <Flex>
                <Text content="This is the homepage" />
            </Flex>
            <Flex>
                <TeamMembers />
            </Flex>
        </div>
    )
}