import * as React from "react";
import { useEffect } from "react";
import { Flex, Divider } from "@fluentui/react-northstar";
import { IMenuProps } from "./Menu/types";
import { Menu } from "./Menu/Menu";
import { sp } from "@pnp/sp";

export default function Navigation(terms) {
  const [active, setActive] = React.useState("Home");
  const [menu, setMenu] = React.useState([
    {
      path: "/",
      name: "Homes",
      image:
        "https://cdn.discordapp.com/attachments/663893433420611605/821060925926015036/logo.png",
    },
    { path: "/", name: "Home" },
    { path: "/riskmatrix", name: "Usikkerhet" },
    { path: "/projectstatus", name: "Prosjektstatus" },
    { path: "/prosjektleveranser", name: "Prosjektleveranser" },
    { path: "/", name: "Intressentregister" },
    { path: "/", name: "Kommunikasjonsplan" },
    { path: "/", name: "Ressursallokering" },
  ]);
  console.log(terms);
  useEffect(() => {
    const fetchTerms = () => {
      const infos: any[] = terms.terms;
      console.log(infos);
      let info = [];
      console.log(terms.terms);
      try {
        if (terms.terms.length !== 0) {
          for (let index = 0; index < infos.length; index++) {
            console.log(infos[index].labels[0]);
            if (infos[index].labels[0] === "Hjem") {
              info.unshift({
                path: infos[index].labels[1],
                name: infos[index].labels[0],
              });
              info.unshift({
                path: infos[index].labels[1],
                name: infos[index].labels[0],
                image: infos[index].labels[2],
              });
            }
            //Check if the 3 label from sharepoint contains the string notImage then creates add a menuItem object that contains only the name and path
            if (infos[index].labels[2] == "notImage") {
              info.push({
                path: infos[index].labels[1],
                name: infos[index].labels[0],
              });
              console.log(info[index]);
            }
          }
          console.log(info);
          setMenu(info);
          console.log("Now using menuState");
        }
      } catch (e) {
        console.error(
          e,
          "Error in Navigation/index.tsx, terms not set correct. Try to add terms to settings or check if navigation terms are correctly set in the term store"
        );
        setMenu([
          {
            path: "/",
            name: "Homes",
            image:
              "https://cdn.discordapp.com/attachments/663893433420611605/821060925926015036/logo.png",
          },
          { path: "/", name: "Home" },
          { path: "/riskmatrix", name: "Usikkerhet" },
          { path: "/projectstatus", name: "Prosjektstatus" },
          { path: "/prosjektleveranser", name: "Prosjektleveranser" },
          { path: "/", name: "Intressentregister" },
          { path: "/", name: "Kommunikasjonsplan" },
          { path: "/", name: "Ressursallokering" },
        ]);
      }
    };
    fetchTerms();
  }, []);

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
