import React, { useState, FunctionComponent } from 'react';
import { Header, Button, Input } from '@fluentui/react-northstar';
import { ISubProps } from './types';



export const Sub: FunctionComponent<ISubProps> = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    return (
        <div>
            <Header content={props.name1} />
            <Header content={props.name2} />
            <Header content={props.name3} />
        </div>
    )
}
