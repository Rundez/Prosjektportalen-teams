import React, { useState, FunctionComponent } from 'react';
import { Header, Button, Input } from '@fluentui/react-northstar';

interface ISubProps {
    name1?: string,
    name2?: string,
    name3?: string,
}

export const Sub: FunctionComponent<ISubProps> = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    return (
        <div>
            <Header content={props.name1} />
            <Header content={props.name2} />
            <Button content="Content"  />
            <Input label="Dette er en input" inverted />
        </div>
    )
}
