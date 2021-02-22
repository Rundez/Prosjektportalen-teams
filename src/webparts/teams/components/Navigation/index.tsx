import * as React from "react";
import { Flex, Divider } from "@fluentui/react-northstar";
import { Menu } from "./Menu";

export default function Navigation() {
  const [active, setActive] = React.useState("Home");

  const handleClick = (name) => {
    setActive(name);
  };

  return (
    <>
      <div style={style}>
        <Flex space="between">
          <Menu
            active={() => handleClick("Home")}
            activeState={active}
            path="/"
            image="https://puzzlepart.com/wp-content/uploads/2019/12/Pzl-web-logo-dark-single.png"
          />
          <Menu
            active={() => handleClick("Home")}
            activeState={active}
            path="/"
            name="Home"
          />
          <Menu
            active={() => handleClick("Risikomatrise")}
            activeState={active}
            path="/riskmatrix"
            name="Risikomatrise"
          />
          <Menu
            active={() => handleClick("Prosjekt status")}
            activeState={active}
            path="/projectstatus"
            name="Prosjekt status"
          />
          <Menu
            active={() => handleClick("Page 3")}
            activeState={active}
            path="/"
            name="Page 3"
          />
          <Menu
            active={() => handleClick("Page 4")}
            activeState={active}
            path="/"
            name="Page 4"
          />
          <Menu
            active={() => handleClick("Page 5")}
            activeState={active}
            path="/"
            name="Page 5"
          />
        
        </Flex>
        <Divider />
      </div>
    </>
  );
}

const style = {
  marginTop: 0,
  textDecoration: "none",
};
