import React from 'react';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';

import styles from '../css-modules/splash.module.css';

const Splash = () => {
    return (
        <div className={styles.splash_container}>
            <div id={styles.splash_center}>
                <div id={styles.splash_content}>
                    <img src="https://i.ibb.co/DCS5pqY/Midnight-Oil-Logo.png" alt="Midnight-Oil-Logo" border="0" id={styles.logo}></img>
                    <div id={styles.splash_p__div}>
                    <p className={styles.splash_p} >➼ Set yourself up for success with custom notebooks and flash card decks!</p>
                    <p className={styles.splash_p} >➼ Be there for your classmates with the option to share the knowlege!</p>
                    </div>
                </div>
                <div id={styles.auth_btns}>
                    <LoginFormModal />
                    <SignupFormModal />
                    </div>
            </div>
        </div>
    )
}

export default Splash;
