import { Title } from "./Title";

import Logo from "../../assets/icons/logo.svg";

import styles from "./Header.module.css";
import { MenuBar } from "./menu/MenuBar";
import { menu } from "./menu/Menu";

type HeaderProps = {
  title?: string;
};

export function Header({ title }: HeaderProps) {
  return (
    <div className={styles.header}>
      <img src={Logo} className={styles.appLogo} alt="" />
      <div className={styles.presentationInfo}>
        <Title title={title} />
        <MenuBar menu={menu} />
      </div>
    </div>
  );
}
