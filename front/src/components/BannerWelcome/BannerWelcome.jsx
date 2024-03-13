import styles from "./BannerWelcome.module.css"
import imgBanner1 from "../../assets/imgBanner1.jpg"
import imgBanner2 from "../../assets/imgBanner2.jpg"
import texts from "../../helpers/texts"

const BannerWelcome = () => {
    return (
        <div className={styles.sliderContainer}>
            <div className={styles.slider}>
                <div className={styles.slides}>
                    <div id="slides-1" className={styles.slide}>
                        <span className={styles.slideText}><img src={imgBanner1} alt="" />{texts.productos}</span>
                    </div>
                    <div id="slides-2" className={styles.slide}>
                        <span className={styles.slideText}><img src={imgBanner2} alt="" /></span>
                    </div>
                    <div id="slides-3" className={styles.slide}>
                        <span className={styles.slideText}><img src={imgBanner1} alt="" /></span>
                    </div>
                    <div id="slides-4" className={styles.slide}>
                        <span className={styles.slideText}><img src={imgBanner2} alt="" /></span>
                    </div>
                </div>
                <div className={styles.sliderNav}>
                    <a className={styles.sliderNavLink} href="#slides-1"></a>
                    <a className={styles.sliderNavLink} href="#slides-2"></a>
                    <a className={styles.sliderNavLink} href="#slides-3"></a>
                    <a className={styles.sliderNavLink} href="#slides-4"></a>
                </div>
            </div>
        </div>
    );
};
export default BannerWelcome