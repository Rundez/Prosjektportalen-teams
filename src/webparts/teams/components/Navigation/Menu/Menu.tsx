import React, { Component, FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { Button, Image } from "@fluentui/react-northstar";
import { IMenuProps } from "./types";
import styles from "./Menu.module.scss"

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
        <Link to={path} className={styles.menuContainerActive} onClick={active}>
          <Button content={name} text className={styles.buttonMenuContainer} ></Button>
        </Link>
      );
    } else {
      return (
        <Link to={path} className={styles.menuContainer} onClick={active}>
          <Image src={image} className={styles.menuContainerImage}></Image>
        </Link>
      );
    }
  } else {
    if (typeof image == "undefined") {
      return (
        <Link to={path} className={styles.menuContainer} onClick={active}>
          <Button content={name} text onClick={() => active}></Button>
        </Link>
      );
    } else {
      return (
        <Link to={path} className={styles.menuContainer} onClick={active}>
          <Image src={image} className={styles.menuContainerImage}></Image>
        </Link>
      );
    }
  }
};
