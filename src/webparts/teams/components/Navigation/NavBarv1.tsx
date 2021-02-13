import React, { Component } from 'react'
import { Menu} from 'semantic-ui-react'
import {
  Link
} from "react-router-dom";



export default class NavBarv1 extends Component {
  state = { activeItem: 'Home' }

  handleItemClick = (e : any, { name }: any) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <div>
        <Menu pointing secondary color={'purple'}>
          <Menu.Item as={Link} to={'/'}
            name='Home'
            active={activeItem === 'Home'}
            onClick={this.handleItemClick}
          > <img src='https://puzzlepart.com/wp-content/uploads/2019/12/Pzl-web-logo-dark-single.png' alt=" "/>
        </Menu.Item>
          <Menu.Item as={Link} to={'/projectstatus'}
            name='Prosjektstatus'
            active={activeItem === 'Prosjektstatus'}
            onClick={this.handleItemClick}

            ></Menu.Item>
          <Menu.Item as={Link} to={'/riskmatrix'}
            name='Risikomatrise'
            active={activeItem === 'Risikomatrise'}
            onClick={this.handleItemClick}
          />
            <Menu.Item as={Link} to={'/oppgaver'} 
            name='Oppgaver'
            active={activeItem === 'Oppgaver'}
            onClick={this.handleItemClick}
          />
            <Menu.Item as={Link} to={'/planner'}
            name='Planner'
            active={activeItem === 'Planner'}
            onClick={this.handleItemClick}
          />
            <Menu.Item
            name='Something'
            active={activeItem === 'Something'}
            onClick={this.handleItemClick}
          />
          <Menu.Menu position='right'>
            <Menu.Item
              name='logout'
              active={activeItem === 'logout'}
              onClick={this.handleItemClick}
            ></Menu.Item>
          </Menu.Menu>
        </Menu>

       
      </div>
    )
  }
}