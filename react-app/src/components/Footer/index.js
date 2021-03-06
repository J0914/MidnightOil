import React from 'react';
import {DiGithubBadge} from 'react-icons/di'
import {FaLinkedin, FaMusic, FaAngellist} from 'react-icons/fa'
import {BiUserCircle} from 'react-icons/bi'
import {BsX} from 'react-icons/bs'
import {BiHide, BiShow} from 'react-icons/bi'
import Slideshow from '../DeckPage/Slideshow';

import styles from '../../css-modules/footer.module.css'

const Footer = () => {
    const [showYoutube, setShowYoutube] = React.useState(false);
    const [hideYoutube, setHideYoutube] = React.useState(false);

    const startMusic = () => {
    setShowYoutube(!showYoutube)
    setHideYoutube(false);
    }


    return (
        <div id={styles.footer_wrapper}>
            <div id={styles.footer_content}>
                <label className={styles.footer_text}>Created by: Jordyn Sechrist</label>
                <a rel='noreferrer' target="_blank" className={`${styles.footer_link} ${styles.github}`} href='https://github.com/J0914'><DiGithubBadge /></a>
                <a rel='noreferrer' target="_blank" className={styles.footer_link} href='https://www.linkedin.com/in/jordyn-sechrist-87710b207/'><FaLinkedin /></a>
                <a rel='noreferrer' target="_blank" className={styles.footer_link} href='https://angel.co/u/jordyn-sechrist'><FaAngellist /></a>
                <a rel='noreferrer' target="_blank" className={styles.footer_link} href='https://j0914.github.io/'><BiUserCircle /></a>
            </div>
            <div id={styles.youtube_wrapper}>
                <div id={styles.music_label__div}>
                    <label htmlFor='music-btn' className={styles.footer_text}>Study Beats</label>
                </div>
                <button id='music-btn' className={styles.footer_link} onClick={startMusic}>{showYoutube? <BsX /> : <FaMusic />}</button>
                {showYoutube &&
                <button className={styles.footer_link} onClick={() => setHideYoutube(!hideYoutube)}>{hideYoutube ? <BiShow /> : <BiHide />}</button>}
                {showYoutube && 
                <div 
                id={styles.beats}
                className={`${styles.beats} ${hideYoutube ? styles.hidden : styles.visible}`}
                >
                    <Slideshow  
                    infiniteLoop={true} 
                    centerMode={true} 
                    centerSlidePercentage={80} 
                    showArrows={true}
                    isYoutube={true}
                    />
                </div>}
            </div>
        </div>
    )
}

export default Footer;