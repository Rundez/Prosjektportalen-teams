import React from 'react';
import { Header } from '@fluentui/react-northstar';
import { Sub } from './Subcomponent';

export const ProjectStatus = () => {

    return (
        <Sub name1="Martin" name2="Mari" children={Child} />
    )
}

const Child = () => {

    return (
        <>
        <Header content="This is the child" />
        </>
    )
}