import React, { FunctionComponent, useState, useEffect } from "react";
import { Flex, Box, Button, List, Image } from "@fluentui/react-northstar";
import {IStatusProps} from "./types";
import { ErrorIcon, ClosedCaptionsIcon } from '@fluentui/react-icons-northstar';
import { FaBeer, FaBox } from 'react-icons/fa'; 
import { GiMoneyStack, GiPodiumWinner, GiProgression } from 'react-icons/gi';
import { GrStatusWarning, GrStatusGood } from 'react-icons/gr';

export const StatusBox = () => (
    <Box
        content="Prosjekt Status"
        styles={{
        backgroundColor: "White",
        boxShadow: " 2px 2px 2px #888888",
        overflow: "auto",
        marginTop: "10px",
        marginBottom: "300px",
        color: 'Black',
        textAlign: 'justify',
        width: '600px',
        height: '300px',
        }}
    />
    );
    
    export const Status: FunctionComponent<IStatusProps> = (props) => {
        const newList = [...props.items];
        return (
            <div>
      <Flex hAlign="center">
        <div>
        <div
          style={{
            backgroundColor: "White",
            boxShadow: " 2px 2px 2px #888888",
            overflow: "auto",
            height: "300px",
            marginTop: "10px",
            color: 'Black',
            textAlign: 'justify',
            width: '600px',
          }}
        >
        <div>
        <p> Prosjektinformasjon</p>
          <Flex.Item>
            <List items={newList} />
          </Flex.Item>
        </div>
        </div>
      </div>
      </Flex>
    </div>
        );
        };

    export const TestStatus = [
        {
            header: "Status",
            media: <GrStatusGood size="30px"/>,
        },
        {
            header: "Økonomi",
            media: <GiMoneyStack size="30px"/>,
        },
        {
            header: "Risiko",
            media: <GrStatusWarning size="30px"/>,
        },
        {
            header: "Kvalitet",
            media: <FaBox size="30px"/>,
        },
        {
            header: "Fremdrift",
            media: <GiProgression size="30px"/>,
        },
        {
            header: "Gevinst oppnåelse",
            media: <GiPodiumWinner size="30px"/>,
        }

    ];


            
            
            