import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as deckActions from '../../../store/decks'
import {BsCheck, BsX} from 'react-icons/bs'

import styles from '../../../css-modules/deckform.module.css';

const EditDeckForm = ({currentDeck, setIsEditing, currentTitle, setCurrentTitle, setCurrentDeck, deckId}) => {
    const [title, setTitle] = useState(currentTitle);
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)

    const editDeck = async (e) => {
        e.preventDefault();
        let userId;
        if (user) userId = user.id
        const deckVals = {
            title: title,
            share: currentDeck.share,
            onlyShare: false
        }
        const deck = await dispatch(deckActions.editDeck(userId, deckId, deckVals));
        if (Array.isArray(deck)) {
          setErrors(deck);
        } else {
            setCurrentDeck(deck)
            setCurrentTitle(title);
            setIsEditing(false)
        }
      };

      const close = () => {
        setIsEditing(false);
    }

    const editShareTrue = async (e) => {
        e.preventDefault();
        let userId;
        if (user) userId = user.id
        const deckVals = {
            title: title,
            share: true,
            onlyShare: true
        }
        const deck = await dispatch(deckActions.editDeck(userId, deckId, deckVals));
        if (Array.isArray(deck)) {
          setErrors(deck);
        } else {
            setCurrentDeck(deck)
            setCurrentTitle(title);
        }
    }

    const editShareFalse = async (e) => {
        e.preventDefault();
        let userId;
        if (user) userId = user.id
        const deckVals = {
            title: title,
            share: false,
            onlyShare: true
        }
        const deck = await dispatch(deckActions.editDeck(userId, deckId, deckVals));
        if (Array.isArray(deck)) {
          setErrors(deck);
        } else {
            setCurrentDeck(deck)
            setCurrentTitle(title);
        }
    }

    return (
        <div className={styles.form_container}>
                {errors.map((error, ind) => (
                <li className={styles.error} key={ind}>{error}</li>
                ))}
            <form id={styles.deck_form} onSubmit={editDeck}>
                <div id={styles.share_wrapper}>
                    <label for='public' className={styles.radio_label}>Public</label>
                    <input type="radio" id='public' name="share-btn" checked={currentDeck?.share} value={true} onChange={editShareTrue}></input>
                    <label for='private' className={styles.radio_label}>Private</label>
                    <input type="radio" id='private' name="share-btn" checked={!currentDeck?.share} value={false} onChange={editShareFalse}></input>
                </div>
                <input 
                type="text" 
                placeholder="Deck Name" 
                value={title}
                maxLength={20}
                onChange={(e) => setTitle(e.target.value)}
                className={styles.deck_name}
                required={true}
                />
            <div className={styles.card_btns__container}>
                <button type="submit" className={styles.deck_form__btn}><BsCheck /></button>
                <button onClick={close} className={styles.deck_form__btn}><BsX /></button>
            </div>
            </form>
        </div>
    )
}

export default EditDeckForm;