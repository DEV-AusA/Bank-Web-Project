import NavBarLogoBanca from "./NavBarLogoBanca";
import NavBarMenu from "./NavBarMenu";
import styles from "./NavBar.module.css"
import NavBarItems from "./NavBarItems";

const NavBar = () => {
  return (
    <div className={styles.navbar}>
      <NavBarLogoBanca />
      <NavBarItems />
      <NavBarMenu />
    </div>
  );
};
export default NavBar;
