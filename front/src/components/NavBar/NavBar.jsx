import styles from "./NavBar.module.css"
import NavBarItems from "./NavBarItems";

const NavBar = () => {
  return (
    <div className={styles.navbar}>
      <NavBarItems />
    </div>
  );
};
export default NavBar;
