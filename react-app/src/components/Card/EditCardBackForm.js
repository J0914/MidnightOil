import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {BsX} from 'react-icons/bs'
import {FiSave} from 'react-icons/fi'
import * as deckActions from '../../store/decks';

import styles from '../../css-modules/editcardform.module.css';


const EditCardBackForm = ({isDark, setIsEditing, front, body, deckId, userId, cardId}) => {
    const [errors, setErrors] = useState([])
    const [theBody, setTheBody] = React.useState(body);
    const dispatch = useDispatch()

    const editCard = async (e) => {
        e.preventDefault()
        const cardVals = {
            front: front,
            back: theBody,
            editFront: false,
            editBack: true
        }
        const data = await dispatch(deckActions.editCard(userId, deckId, cardId, cardVals));
        if (Array.isArray(data)) {
          setErrors(data);
        } else {
            setIsEditing(false)
        }
    };

    const close = () => {
        setIsEditing(false);
    }

    return (
        <div id={styles.form_container}>
            <div id={styles.card_errors}>
                <ul>
            {errors.map((error, ind) => (
                <li className={styles.error} key={ind}>{error}</li>
                ))}
                </ul>
            </div>
            <form id={styles.card_back__form} onSubmit={editCard}>
                <textarea  
                placeholder="Card Back Text" 
                value={theBody}
                onChange={(e) => setTheBody(e.target.value)}
                id={styles.card_body}
                className={isDark ? styles.dark : styles.light}
                autoComplete={'on'}
                autoFocus={true}
                form='card_back__form'
                minLength={5}
                required={true}
                spellCheck={true}
                wrap={'soft'}
                />
                <div className={styles.card_btns__container}>
                <button type="submit" className={`${styles.card_form__btn} ${isDark ? styles.dark : styles.light}`}><FiSave /></button>
                <button onClick={close} className={`${styles.card_form__btn} ${isDark ? styles.dark : styles.light}`}><BsX /></button>
                </div>
            </form>
        </div>
    )
}

export default EditCardBackForm;