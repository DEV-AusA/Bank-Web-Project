import BannerWelcome from "../../components/BannerWelcome/BannerWelcome";
import Login from "../../components/Login/Login";
import styles from "./Home.module.css"

const Home = () => {
  return (
    <div className={styles.container}>
      <BannerWelcome />
      <Login />
    </div>
  );
};

export default Home;
