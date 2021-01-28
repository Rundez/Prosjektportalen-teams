import React, { FunctionComponent, useState, useEffect } from 'react';
import { Text, Button, Flex } from '@fluentui/react-northstar';
import { TeamMembers } from '../TeamMembers/index'
import { IHomeProps } from './types'
//import { IUser } from '../TeamMembers/types';

import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/site-users";
import { graph } from "@pnp/graph";
import "@pnp/graph/teams"
import "@pnp/graph/users";
import { ISiteUserInfo } from '@pnp/sp/site-users/types';


export const Home: FunctionComponent<IHomeProps> = (props) => {
    const [teamUsers, setTeamUsers] = useState([]);


    useEffect(() => {
        sp.web.siteUsers().
            then((users) => users
                .filter((user) => user.Email.length > 0))
            .then((users) => setTeamUsers(users));
    }, []);



    console.log(teamUsers);

    return (
        <div>
            <Flex>
                <Text content="This is the homepage" />
            </Flex>
            <Flex>
                {
                    teamUsers.map( (user) => {
                        return(
                            
                        <p>{user.Email}</p>
                        )
                    }) 
                }
            </Flex>
            <Flex>
            </Flex>
        </div>
    )
}

const fetchTeam = async (teamID) => {
    const team = await graph.teams.getById(teamID);
    console.log(team);
}

const fetchAllUsers = async () => {
}


