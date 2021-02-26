import * as React from "react";
import { Flex, Divider } from "@fluentui/react-northstar";
import { IMenuProps } from "./Menu/types";
import { Menu } from "./Menu/Menu";

export default function Navigation() {
  const [active, setActive] = React.useState("Home");

  const handleClick = (name) => {
    setActive(name);
  };

  const menu = [
    {
      path: "/",
      name: "Home",
      image:
        "https://puzzlepart.com/wp-content/uploads/2019/12/Pzl-web-logo-dark-single.png",
    },
    { path: "/", name: "Home" },
    { path: "/riskmatrix", name: "Usikkerhet" },
    { path: "/projectstatus", name: "Prosjektstatus" },
    { path: "/", name: "Page 3" },
    { path: "/", name: "Page 4" },
    { path: "/", name: "Page 5" },
  ];

  function setMenu(menu) {
    return menu.map((menu) => (
      <Menu
        active={() => handleClick(menu.name)}
        activeState={active}
        path={menu.path}
        image={menu.image}
        name={menu.name}
      ></Menu>
    ));
  }

  return (
    <>
      <div style={style}>
        <Flex space="between">{setMenu(menu)}</Flex>
        <Divider />
      </div>
    </>
  );
}

const style = {
  marginTop: 0,
  textDecoration: "none",
};
