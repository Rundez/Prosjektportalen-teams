import React, { FunctionComponent, useState, useEffect } from 'react';
import { Text, Button, Flex, List } from '@fluentui/react-northstar';
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
                .filter((user) => user.Email.length > 0)
                .map((user) => {
                    const obj =
                    {
                        key: user.Id,
                        header: user.Title,
                        content: user.Email
                    }
                    setTeamUsers(curr => [...curr, obj])
                }));
    }, []);
    console.log(teamUsers);

    return (
        <div>
            <Flex hAlign="end">
                <Flex.Item >
                    <List items={teamUsers} />
                </Flex.Item>
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

