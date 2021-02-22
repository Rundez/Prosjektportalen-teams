import * as React from 'react';
import { Button, Flex, TeamsIcon, Divider, Text, Image} from '@fluentui/react-northstar';
import { Link } from 'react-router-dom';
import { Menu } from './Menu';


export default function Navigation() {

    return (
        <>
        <div style={style}>
            <Flex space="between" >
                <Menu path="/" image="https://puzzlepart.com/wp-content/uploads/2019/12/Pzl-web-logo-dark-single.png"/>
                <Menu path="/" name="Home"/>
                <Menu path="riskmatrix" name="Risikomatrise"/>
                <Menu path="/projectstatus" name="Prosjekt status"/>
                <Menu path="/" name="Page 3" />
                <Menu path="/" name="Page 4" />
                <Menu path="/" name="Page 5" />
            </Flex>
            <Divider />
            </div>
        </>
    );
}
const style = {
    marginTop: 0,
    textDecoration: 'none'
}