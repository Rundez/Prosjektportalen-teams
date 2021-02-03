import * as React from 'react';
import { Button, Flex, TeamsIcon, Divider, Text, Image, useCSS} from '@fluentui/react-northstar';
import {Menu} from 'semantic-ui-react'
import { NavLink } from 'react-router-dom';

export default function Navigation() {
    type MenuName ={
        name: string
    }

    /*handleItemClick = (e, { name }) => this.setState({ activeItem: name })*/

    const MenuName: React.FunctionComponent<MenuName> = ({name}) => this.setState({activeItem: name})
   
    const {activeItem} = this.state;
    return (
        <>
        <div style={style}>
        <Menu pointing secondary>
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='messages'
            active={activeItem === 'messages'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='friends'
            active={activeItem === 'friends'}
            onClick={this.handleItemClick}
          />
          <Menu.Menu position='right'>
            <Menu.Item
              name='logout'
              active={activeItem === 'logout'}
              onClick={this.handleItemClick}
            />
          </Menu.Menu>
        </Menu>
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
