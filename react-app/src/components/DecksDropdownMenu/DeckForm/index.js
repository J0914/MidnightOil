import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as deckActions from '../../../store/decks'
import {BsCheck, BsX} from 'react-icons/bs'

import styles from '../../../css-modules/deckform.module.css';

const DeckForm = ({setShowDeckForm}) => {
    const [title, setTitle] = useState('')
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)

    const createDeck = async (e) => {
        e.preventDefault();
        let userId;
        if (user) userId = user.id
        const deckVals = {
          title: title
        }
        const data = await dispatch(deckActions.createDeck(userId, deckVals));
        if (data) {
          setErrors(data);
        } else {
            setShowDeckForm(false)
        }
      };

    return (
        <form id={styles.deck_form} onSubmit={createDeck}>
                {errors.map((error, ind) => (
                <li className={styles.error} key={ind}>{error}</li>
                ))}
                <input 
                type="text" 
                placeholder="Deck Name" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={styles.deck_name}
                required={true}
                />
                <button type="submit" className={styles.deck_form__btn}><BsCheck /></button>
                <button onClick={() => setShowDeckForm(false)} className={styles.close}><BsX /></button>
            </form>
    )
}

export default DeckForm;