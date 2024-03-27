import Container from "react-bootstrap/esm/Container";
import BannerWelcome from "../../components/BannerWelcome/BannerWelcome";
import styles from "./Home.module.css"
import Footer from "../../components/Footer/Footer";
import NewsAPP from "../../components/News/NewsAPP";
import ChatIA from "../../components/ChatIA/ChatIA";

const Home = () => {
  return (
    <Container fluid className="p-0">
      <ChatIA/>
      <BannerWelcome />
      <Container>
        <NewsAPP/>
      </Container>    
    </Container>
  );
};

export default Home;
