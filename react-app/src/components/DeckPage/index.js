import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import Slideshow from './Slideshow'
import * as deckActions from '../../store/decks'
import {BsPlusCircle, BsDashCircle, BsPencil, BsTrash} from 'react-icons/bs'

import styles from '../../css-modules/deckpage.module.css'

const DeckPage = () => {
    const [currentCards, setCurrentCards] = useState(null);
    const [currentDeck, setCurrentDeck] = useState(null);
    const [showCreateCardForm, setShowCreateCardForm] = useState(false);
    const [isDark, setIsDark] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const cards = useSelector(state => state.decks.cards);
    const { deckId } = useParams();
    const userId = user?.id

    useEffect(() => {
        if (cards) {
            setCurrentCards(cards.reverse());
        }
    }, [cards])


    useEffect(() => {
        if (user) {

            (async () => {
                const deck = await dispatch(deckActions.getDeck(userId, deckId));
                const cards = await dispatch(deckActions.getCards(userId, deckId));
                setCurrentCards(cards);
                setCurrentDeck(deck);

            })();
        }
    }, [user, dispatch, deckId, userId])

    const createCard = () => {
        const cardVals = {
            front: `Edit me! ------------------------------------------
            by the way, You can only create one new card at a time. :)`,
            back: 'Edit me!'
        }
        dispatch(deckActions.createCard(userId, deckId, cardVals));
    }

    return (
        <div id={styles.deck_wrapper}>
            <div id={styles.deck_header__div}>
            <h1 id={styles.header}>{currentDeck?.title}
            <div className={styles.editing_btns}>
                    <button className={`${styles.edit_and_delete__btn} ${isDark ? styles.dark : styles.light}`} onClick={() => setIsEditing(true)}><BsPencil /></button>
                    <button className={`${styles.edit_and_delete__btn} ${isDark ? styles.dark : styles.light}`} ><BsTrash /></button>
                </div>
            </h1>
            
            </div>
            <div id={styles.body}>
            <div id={styles.above_card}>
            <div id={styles.create_btn__wrapper}>
            <label className={styles.add_card_label}>Create Card</label>
            <button className={styles.add_card} onClick={createCard}>{!showCreateCardForm ? <BsPlusCircle /> : <BsDashCircle />}</button>
            </div>
            <div id={styles.theme_wrapper}>
                <label className={styles.radio_label}>Light Theme</label>
                <input type="radio" id={styles.light} name="theme" checked={!isDark} value={false} onChange={()=> setIsDark(false)}></input>
                <label className={styles.radio_label}>Dark Theme</label>
                <input type="radio" id={styles.dark} name="theme" value={true} onChange={()=> setIsDark(true)}></input>
            </div>
            </div>
            <div className={`${styles.slideshow} ${isDark ? styles.dark : styles.light}`}>
                <div id={styles.shader}>
                <Slideshow  
                infiniteLoop={true} 
                centerMode={true} 
                centerSlidePercentage={80} 
                showArrows={true}
                currentCards={currentCards}
                setShowCreateCardForm={setShowCreateCardForm}
                isDark={isDark}
                deckId={deckId}
                userId={user?.id}
                />
                </div>
                </div>
            </div>
        </div>
    )
}

export default DeckPage;