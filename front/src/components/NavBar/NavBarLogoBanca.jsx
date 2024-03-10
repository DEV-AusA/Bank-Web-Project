import logoBank from "../../assets/logoBank.png"
import styles from "./NavBarLogoBanca.module.css"


const NavBarLogoBanca = () => {
    return (
        <div className={styles.navbarLogoBanca}>
            <div>
                <img src={logoBank} alt="" />
            </div>
        </div>
    );
};
export default NavBarLogoBanca