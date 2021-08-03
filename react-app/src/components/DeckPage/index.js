import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import Slideshow from './Slideshow'
import * as deckActions from '../../store/decks'

import styles from '../../css-modules/deckpage.module.css'

const DeckPage = () => {
    const [currentCards, setCurrentCards] = useState(null);
    const [currentDeck, setCurrentDeck] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(null);
    const [isDark, setIsDark] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const { deckId } = useParams();

    useEffect(() => {

        let userId;
        if (user) {

            (async () => {
                userId = user.id;
                const deck = await dispatch(deckActions.getDeck(userId, deckId));
                const cards = await dispatch(deckActions.getCards(userId, deckId));
                setCurrentCards(cards);
                setCurrentDeck(deck);

            })();
        }
    }, [user, dispatch, deckId])

    return (
        <div id={styles.deck_wrapper}>
            <div id={styles.deck_header__div}>
            <h1 id={styles.header}>{currentDeck?.title}</h1>
            <div id={styles.theme_wrapper}>
                <label className={styles.radio_label}>Light Theme</label>
                <input type="radio" id={styles.light} name="theme" checked={!isDark} value={false} onChange={()=> setIsDark(false)}></input>
                <label className={styles.radio_label}>Dark Theme</label>
                <input type="radio" id={styles.dark} name="theme" value={true} onChange={()=> setIsDark(true)}></input>
            </div>
            </div>
            <div className={styles.slideshow}>
            <Slideshow 
            onChange={(i, slide) => setCurrentSlide(slide)} 
            infiniteLoop={true} 
            centerMode={true} 
            centerSlidePercentage={80} 
            showArrows={true}
            currentCards={currentCards}
            isDark={isDark} />
            </div>
        </div>
    )
}

export default DeckPage;