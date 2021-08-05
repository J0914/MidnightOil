import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as deckActions from '../../../store/decks'
import {BsCheck, BsX} from 'react-icons/bs'
import { useHistory } from 'react-router-dom'

import styles from '../../../css-modules/deckform.module.css';

const DeckForm = ({setIsOpen, setShowDeckForm}) => {
    const [title, setTitle] = useState('')
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)

    const createDeck = async (e) => {
        e.preventDefault();
        let userId;
        if (user) userId = user.id
        const deckVals = {
          title: title
        }
        const data = await dispatch(deckActions.createDeck(userId, deckVals));
        if (Array.isArray(data)) {
          setErrors(data);
        } else {
            setShowDeckForm(false)
            if (setIsOpen) {
                setIsOpen(false);
            }
            history.push(`/decks/${data.id}`);
        }
      };

    return (
        <form id={styles.deck_dropdown__form} onSubmit={createDeck}>
                {errors.map((error, ind) => (
                <li className={styles.error} key={ind}>{error}</li>
                ))}
                <input 
                type="text" 
                placeholder="Deck Name" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={styles.deck_dropdown__name}
                required={true}
                />
                <button type="submit" className={styles.dropdown_deck_form__btn}><BsCheck /></button>
                <button onClick={() => setShowDeckForm(false)} className={styles.dropdown_deck_form__btn}><BsX /></button>
            </form>
    )
}

export default DeckForm;