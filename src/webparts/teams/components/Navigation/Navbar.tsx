import * as React from 'react';
import { Button, Flex, TeamsIcon, Divider, Text, Image} from '@fluentui/react-northstar';
import { Link } from 'react-router-dom';

export default function Navigation() {

    return (
        <>
        <div style={style}>
            <Flex space="between" >
                <Link to="/" ><Image src="https://puzzlepart.com/wp-content/uploads/2019/12/Pzl-web-logo-dark-single.png" style={{height:40, width:40, marginLeft:20}} /> </Link>
                <Link to="/" style={{ textDecoration: 'none' }}><Button content="Home" text /></Link>
                <Link to="riskmatrix" style={{ textDecoration: 'none' }}><Button content="Risikomatrise" text /></Link>
                <Link to="/projectstatus" style={{ textDecoration: 'none' }}><Button content="Project status" text /> </Link>
                <Button content="Page 3" style={{ marginRight: 10 }} text />
                <Button content="Page 4" style={{ marginRight: 10 }} text />
                <Button content="Page 5" style={{ marginRight: 10 }} text />
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