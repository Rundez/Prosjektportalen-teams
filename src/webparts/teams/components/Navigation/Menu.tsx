import React, { Component, FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { Button, Image } from "@fluentui/react-northstar";
import { IMenuProps } from "./types";

const mainColor = "#6264A7";

const style = {
  marginTop: 0,
  textColor: "black",
  textDecoration: "none",
};
const styleImg = {
  height: 40,
  width: 40,
  marginLeft: 20,
};
const styleActive = {
  marginTop: 0,
  textDecoration: "none",
  borderBottom: "4px solid " + mainColor,
};

export const Menu: FunctionComponent<IMenuProps> = ({
  path,
  name,
  image,
  active,
  activeState,
}) => {
  if (activeState == name) {
    if (typeof image == "undefined") {
      return (
        <Link to={path} style={styleActive} onClick={active}>
          <Button content={name} text style={{ color: mainColor }}></Button>
        </Link>
      );
    } else {
      return (
        <Link to={path} style={style} onClick={active}>
          <Image src={image} style={styleImg}></Image>
        </Link>
      );
    }
  } else {
    if (typeof image == "undefined") {
      return (
        <Link to={path} style={style} onClick={active}>
          <Button content={name} text onClick={() => active}></Button>
        </Link>
      );
    } else {
      return (
        <Link to={path} style={style} onClick={active}>
          <Image src={image} style={styleImg}></Image>
        </Link>
      );
    }
  }
};
