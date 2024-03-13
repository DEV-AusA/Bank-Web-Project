import styles from "./RegisterOkPopUp.module.css"

const RegisterOkPopUp = ({handleOnClose, message})  =>{

    return (
        <div className={styles.modalDetails}>
            <p>{message}</p>
                <button className={styles.buttonDetail} onClick={handleOnClose}>Volver al Home</button>
        </div>
    )
}

export default RegisterOkPopUp