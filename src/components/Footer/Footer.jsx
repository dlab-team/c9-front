import styles from "./Footer.module.css";
import logoFooter from "../../assets/images/logoFooter.png";

function Footer() {
  return (
    <footer
      className={`${styles.footer} bg-neutral-200 text-center text-white dark:bg-neutral-600`}
    >
      <div className="container pt-9">
        <div className="mb-9 flex flex-col items-center justify-center">
          <div className="mb-4 flex items-center justify-center">
            <img className={styles.footerImage} src={logoFooter} alt="Logo" />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
