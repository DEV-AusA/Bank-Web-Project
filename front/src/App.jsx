import Home from "./views/Home/Home";
import styles from "./App.module.css";
import RegisterUser from "./views/RegisterUser/RegisterUser";
import MisTurnos from "./views/MisTurnos/MisTurnos"
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <div className= {styles.body}>
      <h1>Este es mi titulo PRINCIPAL</h1>
      <NavBar />
      {/* <RegisterUser /> */}
      <Home />
      {/* <MisTurnos /> */}
    </div>
  )
}

export default App
