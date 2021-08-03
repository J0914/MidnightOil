import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {BsX} from 'react-icons/bs'
import {FiSave} from 'react-icons/fi'
import * as deckActions from '../../store/decks';

import styles from '../../css-modules/editcardform.module.css';


const EditCardFrontForm = ({setIsEditing, isDark, back, body, deckId, userId, cardId}) => {
    const [errors, setErrors] = useState([])
    const [theBody, setTheBody] = React.useState(body);
    const dispatch = useDispatch()

    const editCard = async (e) => {
        e.preventDefault()
        const cardVals = {
            front: theBody,
            back: back,
            editFront: true,
            editBack: false
        }
        console.log('above the dispatch')
        const data = await dispatch(deckActions.editCard(userId, deckId, cardId, cardVals));
        if (Array.isArray(data)) {
          setErrors(data);
          console.log('the errors are', data);
        } else {
            console.log('the else')
            setIsEditing(false)
        }
    };

    const close = () => {
        setIsEditing(false);
    //     setShowEditNoteForm(false)
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
            <form id={styles.card_front__form} onSubmit={editCard}>
                <textarea  
                placeholder="Card Front Text" 
                value={theBody}
                onChange={(e) => setTheBody(e.target.value)}
                id={styles.card_body}
                className={isDark ? styles.dark : styles.light}
                autoComplete={'on'}
                autoFocus={true}
                form='card_front__form'
                minLength={5}
                required={true}
                spellCheck={true}
                wrap={'soft'}
                />
                <div className={styles.card_btns__container}>
                <button type="submit" className={` ${styles.card_form__btn}  ${isDark ? styles.dark : styles.light}`}><FiSave /></button>
                <button onClick={close} className={` ${styles.card_form__btn}  ${isDark ? styles.dark : styles.light}`}><BsX /></button>
                </div>
            </form>
        </div>
    )
}

export default EditCardFrontForm;