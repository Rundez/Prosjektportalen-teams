import * as React from 'react';
import { Button, Flex, TeamsIcon } from '@fluentui/react-northstar';
import { Link } from 'react-router-dom';

export default function Navigation() {

    return (
        <Flex space="between" style={{backgroundColor: "grey", paddingTop: 10, paddingBottom: 10}}>
            <Link to="/"><Button content="Home" icon={<TeamsIcon />} style={{marginLeft: 10}} /> </Link>
            <Flex gap="gap.small">
                <Link to="riskmatrix"><Button content="Risikomatrise" /></Link>
                <Button content="Page 2" />
                <Button content="Page 3" style={{marginRight: 10}}/>
            </Flex>
        </Flex>
    );
}