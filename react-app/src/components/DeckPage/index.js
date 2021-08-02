import React from 'react';
import AwesomeSlider from 'react-awesome-slider'
// import AwsSliderStyles from 'react-awesome-slider/src/styles.scss'

import styles from '../../css-modules/deckpage.module.css'

const DeckPage = () => {

    const slider = (
        <AwesomeSlider cssModule={styles}>
            <div className={styles.card_container}><p>Hello</p></div>
            <div className={styles.card_container}><p>Hello</p></div>
            <div className={styles.card_container}><p>Hello</p></div>
        </AwesomeSlider>
    )

    return (
        <div id={styles.deck_wrapper}>
            <h1 id={styles.header}>DeckPage</h1>
            {slider}
        </div>
    )
}

export default DeckPage;