import React from 'react';

import styles from '../../css-modules/notfound.module.css'

const NotFoundPage = () => {
    return (
        <div className={styles.not_found__wrapper}>
            <div className={styles.logo_wrapper}>
                <img src={'https://i.ibb.co/BrBCh1Q/Midnight-Oil-Logo.png'} alt="logo" className={styles.logo} />
                <p className={styles.text}>Sorry, this page doesn't exist!</p>
            </div>
        </div>
    )
}

export default NotFoundPage;