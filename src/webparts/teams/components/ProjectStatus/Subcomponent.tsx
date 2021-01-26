import React, { useState, FunctionComponent } from 'react';
import { Header } from '@fluentui/react-northstar';

interface ISubProps {
    name1?: string,
    name2?: string,
    name3?: string,
    children: React.ReactNode,
}

export const Sub: FunctionComponent<ISubProps> = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    return (
        <div>
            <Header content={props.name1} />
            <Header content={props.name2} />
            <div>
                {props.children}
            </div>

        </div>
    )
}
