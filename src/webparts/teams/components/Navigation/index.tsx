import * as React from "react";
import { useEffect } from "react";
import { Flex, Divider } from "@fluentui/react-northstar";
import { IMenuProps } from "./Menu/types";
import { Menu } from "./Menu/Menu";
import { sp } from "@pnp/sp";

export default function Navigation() {
  const [active, setActive] = React.useState("Home");
  const [menu, setMenu] = React.useState([
    {
      path: "/",
      name: "Homes",
      image:
        "https://puzzlepart.com/wp-content/uploads/2019/12/Pzl-web-logo-dark-single.png",
    },
    { path: "/", name: "Home" },
    { path: "/riskmatrix", name: "Usikkerhet" },
    { path: "/projectstatus", name: "Prosjektstatus" },
    { path: "/", name: "Page 3" },
    { path: "/", name: "Page 4" },
    { path: "/", name: "Page 5" },
  ]);

  /**
    useEffect(() => {
    const fetchTerms = async () => {
      const infos: any[] = await sp.termStore.groups
        .getById("c56bb677-f782-4cf6-a6d6-17685ee9f19d")
        .sets.getById("1a58ab36-36bb-4234-abad-ad2410b0b74f")
        .terms();
      let info = [];
      for (let index = 0; index < infos.length; index++) {
        //Check if the 3 label from sharepoint contains the string notImage then creates add a menuItem object that contains only the name and path
        if (infos[index].labels[2].name == "notImage") {
          info.push({
            path: infos[index].labels[1].name,
            name: infos[index].labels[0].name,
          });
        } else {
          // Add both the picture and add another iteam in to the menu array with a name to the path, meant for home
          //Image
          info.push({
            path: infos[index].labels[1].name,
            name: infos[index].labels[0].name,
            image: infos[index].labels[2].name,
          });
          //Name
          info.push({
            path: infos[index].labels[1].name,
            name: infos[index].labels[0].name,
          });
        }
      }

      setMenu(info);
      console.log("Now using menuState");
    };
    fetchTerms();
  }, []);
  */

  const handleClick = (name) => {
    setActive(name);
  };

  function getMenu(menu) {
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
        <Flex space="between">{getMenu(menu)}</Flex>
        <Divider />
      </div>
    </>
  );
}

const style = {
  marginTop: 0,
  textDecoration: "none",
};
