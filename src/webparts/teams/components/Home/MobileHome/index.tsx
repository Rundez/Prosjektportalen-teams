import React, { FunctionComponent, useState, useEffect } from "react";
import { IHome } from "./types";
import { Flex, FlexItem } from "@fluentui/react-northstar";
import { Cards } from "../InfoCards";
import { Info } from "../ProjectInfo/index";
import { Icon } from "office-ui-fabric-react";

export const MobileHome: FunctionComponent<IHome> = (props) => {
  function getHome() {
    if (props.mobile != null) {
      console.log(props.mobile);
      return (
        <Flex
          gap="gap.small"
          padding="padding.medium"
          space="around"
          style={{ display: "block" }} // Should get rid of this
        >
          <Cards
            header="Prosjektinfo"
            height={23}
            width={23}
            context={props.context}
          ></Cards>
          <Cards header="Økonomi" height={23} width={23}></Cards>

          <Cards header="Kvalitet" height={23} width={23}></Cards>
          <Cards header="Gevinstoppnåelse" height={23} width={23}></Cards>

          <Cards header="Risiko" height={23} width={23}></Cards>
          <Cards header="Fremdrift" height={23} width={23}></Cards>
        </Flex>
      );
    } else {
      console.log(props.mobile);
      return (
        <>
          <div style={{ display: "none" }}>
            <Info context={props.context} />
          </div>
          <Flex
            gap="gap.small"
            padding="padding.medium"
            space="around"
            style={{ display: "block" }} // Should get rid of this
          >
            <Flex
              gap="gap.small"
              hAlign="center"
              vAlign="center"
              style={{ alignItems: "flex-start" }}
            >
              <Flex column>
                <Flex.Item size="size.half" align="start">
                  <Cards
                    header="Prosjektinfo"
                    height={23}
                    width={23}
                    context={props.context}
                  ></Cards>
                </Flex.Item>
                <Flex.Item size="size.half" align="start">
                  <Flex gap="gap.small">
                    <FlexItem>
                      <Cards header="Økonomi" height={23} width={23}></Cards>
                    </FlexItem>
                    <FlexItem>
                      <Flex column>
                        <Cards header="Kvalitet" height={23} width={23}></Cards>
                        <Cards
                          header="Gevinstoppnåelse"
                          height={23}
                          width={23}
                        ></Cards>
                      </Flex>
                    </FlexItem>
                  </Flex>
                </Flex.Item>
              </Flex>
              <Flex.Item size="size.1/4">
                <Flex column>
                  <Cards header="Risiko" height={23} width={23}></Cards>
                  <Cards header="Fremdrift" height={23} width={23}></Cards>
                </Flex>
              </Flex.Item>
            </Flex>
          </Flex>
        </>
      );
    }
  }

  return getHome();
};
