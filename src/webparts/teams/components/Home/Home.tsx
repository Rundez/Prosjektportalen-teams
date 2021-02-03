import React, { FunctionComponent, useState, useEffect } from 'react';
import { Text, Button, Flex, List, Header, Avatar } from '@fluentui/react-northstar';
import { IHomeProps } from './types'
//import { IUser } from '../TeamMembers/types';

import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/site-users";
import { graph } from "@pnp/graph";
import "@pnp/graph/teams";
import "@pnp/graph/users";
import { ISiteUserInfo } from '@pnp/sp/site-users/types';
import { TeamMembers } from './TeamMembers/index';



export const Home: FunctionComponent<IHomeProps> = (props) => {
    const [teamUsers, setTeamUsers] = useState([]);


    useEffect(() => {
        sp.web.siteUsers().
            then((users) => users
                .filter((user) => user.Email.length > 0)
                .map((user) => {
                    const obj =
                    {
                        key: user.Id,
                        header: user.Title,
                        content: user.Email,
                        media: <Avatar name={user.Title} />
                    }
                    setTeamUsers(curr => [...curr, obj])
                }));
    }, []);
    console.log(teamUsers);

    return (
        <div>
            <TeamMembers items={teamUsers}/>
            
        </div>
    )
}

const fetchTeam = async (teamID) => {
    const team = await graph.teams.getById(teamID);
    console.log(team);
}

const fetchAllUsers = async () => {
}

