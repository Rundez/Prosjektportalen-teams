import * as React from 'react';
import { Button, Flex, TeamsIcon, Divider, Text, Image, useCSS} from '@fluentui/react-northstar';
import { NavLink } from 'react-router-dom';

export default function Navigation() {

    return (
        <>
        <div style={style}>
            <Flex space="between" >
                <NavLink to="/" ><Image src="https://puzzlepart.com/wp-content/uploads/2019/12/Pzl-web-logo-dark-single.png" style={{height:40, width:40, marginLeft:20}} /> </NavLink>
                <NavLink to="/" style={styleButtons}><Button content="Home" text /></NavLink>
                <NavLink to="riskmatrix" style={styleButtons}><Button content="Risikomatrise" text /></NavLink>
                <NavLink to="/projectstatus" style={styleButtons}><Button content="Project status" text /> </NavLink>
                <Button content="Page 3" style={{ marginRight: 10 }} text />
                <Button content="Page 4" style={{ marginRight: 10 }} text />
                <Button content="Page 5" style={{ marginRight: 10 }} text />
                <div className='active'></div>
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
const styleButtons = {
    textDecoration:'none'
}
