import * as React from 'react';
import {Text, Button, Flex} from '@fluentui/react-northstar';

export default function Home() {

    return (
        <div>
            <Flex>
                <Text content="This is the homepage" />
            </Flex>
            <Flex>
                <Button content="Hei alle sammen." />
            </Flex>
        </div>
    )
}