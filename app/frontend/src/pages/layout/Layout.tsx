import { Outlet, Link } from "react-router-dom";
import styles from "./Layout.module.css";

import { useLogin } from "../../authConfig";

import { LoginButton } from "../../components/LoginButton";
import nycLogo from "../../assets/nyc-health-logo.png";

const Layout = () => {
    return (
        <div className={styles.layout}>
            <header className={styles.header} role={"banner"}>
                <div className={styles.headerContainer}>
                    <Link to="/" className={styles.headerTitleContainer}>
                        <img src={nycLogo} alt="NYC Health" className={styles.headerLogo} />
                        <h3 className={styles.headerTitle}>Benefits Navigator</h3>
                    </Link>
                    <div className={styles.loginMenuContainer}>{useLogin && <LoginButton />}</div>
                </div>
            </header>

            <main className={styles.main} id="main-content">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
