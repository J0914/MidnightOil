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

    return (
        <div className={styles.form_container}>
            <form id={styles.deck_form} onSubmit={editDeck}>
                {errors.map((error, ind) => (
                <li className={styles.error} key={ind}>{error}</li>
                ))}
                
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