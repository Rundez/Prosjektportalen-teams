import React, { FunctionComponent, useState, useEffect } from "react";
import { Flex, Box, Button, List, Image } from "@fluentui/react-northstar";
import { IInfoProps } from "./types";
import { ErrorIcon, ClosedCaptionsIcon } from "@fluentui/react-icons-northstar";
import { FaBeer, FaBox } from "react-icons/fa";
import { FieldUserRenderer } from "@pnp/spfx-controls-react";
import { sp, SPRest } from "@pnp/sp";
import {
  GiMoneyStack,
  GiPodiumWinner,
  GiProgression,
  GiStairsGoal,
} from "react-icons/gi";
import { AiOutlineNumber } from "react-icons/ai";
import { BiCalendar } from "react-icons/bi";
import { BsPersonFill } from "react-icons/bs";
import { ImStatsBars } from "react-icons/im";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { Spinner } from "office-ui-fabric-react";
import styles from "./ProjectInfo.module.scss";
import { GrStatusWarning } from "react-icons/gr";

export const Info: FunctionComponent<IInfoProps> = (props) => {
  const [projectInformation, setProjectInformation] = useState<any>([{}]);
  const [projectStatus, setProjectStatus] = useState<any>();

  const [isLoading, setIsLoading] = useState<Boolean>(true);

  useEffect(() => {
    fetchProjectInformation();
    fetchProjectStatus();
  }, []);

  /**
   * Fetch project information
   */
  const fetchProjectInformation = () => {
    sp.web.lists
      .getByTitle("prosjektegenskaper")
      .renderListData("<View></View>")
      .then((data) => {
        setProjectInformation(
          transformProjectInformation(data.Row, props.context)
        );
        setIsLoading(false);
      });
  };

  // This is way too ghetto.. but it works
  const fetchProjectStatus = () => {
    setTimeout(() => {
      sp.setup({
        sp: {
          baseUrl: "https://martdev.sharepoint.com/sites/pp365",
        },
      });

      sp.web.lists
        .getByTitle("Prosjektstatus")
        .items.get()
        .then((data) => {
          console.log(data);
          data.reverse();
          const statusInformation = data.find(
            (obj) => obj.GtSiteId === props.context.pageContext.site.id["_guid"]
          );
          setProjectStatus(transformProjectStatus(statusInformation));

          sp.setup({
            sp: {
              baseUrl: props.context.pageContext.web.absoluteUrl,
            },
          });
        });
    }, 3);
  };

  const teamName = props.context.sdks.microsoftTeams.context.teamName;

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <Flex hAlign="center">
          <div className={styles.projectInfoContainer}>
            <div className={styles.projectInfoTitle}>
              <p> {teamName}</p>
            </div>
            <div className={styles.infoElements}>
              <Flex gap="gap.small" space="between">
                <Flex.Item size="size.half">
                  <List items={projectInformation.slice(0, 5)} />
                </Flex.Item>
                <Flex.Item size="size.half" align="start">
                  <List items={projectStatus} />
                </Flex.Item>
              </Flex>
            </div>
          </div>
        </Flex>
      )}
    </div>
  );
};

const transformProjectInformation = (items: any, context) => {
  const projectInfoColumn = [
    {
      header: "Prosjektnummer",
      content: items[0].GtProjectNumber,
      media: <AiOutlineNumber size="30px" />,
    },
    {
      header: "Målsetting",
      content: items[0].GtProjectGoals,
      media: <GiStairsGoal size="30px" style={{ color: "red" }} />,
    },
    {
      header: "Start- og sluttdato",
      content: `${items[0].GtStartDate} - ${items[0].GtEndDate}`,
      media: <BiCalendar size="30px" />,
    },
    {
      header: "Prosjektleder",
      content: (
        <FieldUserRenderer
          context={context}
          users={[
            {
              id: items[0].GtProjectManager[0].id,
              email: items[0].GtProjectManager[0].email,
              department: "UiA (placeholder)",
              jobTitle: "Software developer (placeholder)",
              picture: items[0].GtProjectManager[0].picture,
              sip: items[0].GtProjectManager[0].sip,
              title: items[0].GtProjectManager[0].title,
              value: "",
            },
          ]}
          key={1}
        />
      ),
      media: <BsPersonFill size="30px" style={{ color: "blue" }} />,
    },
    {
      header: "Prosjekteier",
      content: (
        <FieldUserRenderer
          context={context}
          users={[
            {
              id: items[0].GtProjectOwner[0].id,
              email: items[0].GtProjectOwner[0].email,
              department: "UiA (placeholder)",
              jobTitle: "Software developer (placeholder)",
              picture: items[0].GtProjectOwner[0].picture,
              sip: items[0].GtProjectOwner[0].sip,
              title: items[0].GtProjectOwner[0].title,
              value: "",
            },
          ]}
          key={1}
        />
      ),
      media: <BsPersonFill size="30px" />,
    },
  ];

  return projectInfoColumn;
};

const transformProjectStatus = (item: any) => {
  const projectStatusInfo = [
    {
      header: "Overordnet status",
      content: item.GtOverallStatus,
      media: <ImStatsBars size="30px" />,
    },
    {
      header: "Økonomi",
      content: item.GtStatusBudget,
      media: <GiMoneyStack size="30px" />,
    },
    {
      header: "Risiko",
      content: item.GtStatusRisk,
      media: <GrStatusWarning size="30px" />,
    },
  ];

  return projectStatusInfo;
};
