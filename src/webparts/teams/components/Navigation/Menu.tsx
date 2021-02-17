import React, { Component, FunctionComponent } from 'react'
import {Link} from "react-router-dom";
import { Button, Flex, TeamsIcon, Divider, Text, Image} from '@fluentui/react-northstar';
import{IMenuProps} from './types'
const style ={
  marginTop: 0,
  textDecoration: 'none'
} 
const styleImg={
  height:40,
  width: 40,
  marginLeft:20
}
export const Menu:FunctionComponent<IMenuProps> = ({path, name,image}) => {
  if(typeof image == 'undefined'){
    return <Link to={path} style={style}><Button content={name} text></Button></Link>
  } else{
    return <Link to={path} style={style}><Image src={image} style={styleImg}></Image></Link>
  }
  

}

