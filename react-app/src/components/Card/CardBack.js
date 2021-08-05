import React from 'react';
import {useDispatch} from 'react-redux'
import { BsPencil, BsTrash, BsArrowBarUp} from 'react-icons/bs'
import EditCardBackForm from './EditCardBackForm';
import * as deckActions from '../../store/decks'
import {Prompt} from 'react-router'


import styles from '../../css-modules/card.module.css';

const CardBack = ({ isDark, i, body, handleClick,  deckId, userId, cardId, front}) => {
    const [isEditing, setIsEditing] = React.useState(false);
    const dispatch = useDispatch();

    const handleDelete = () => {
        let answer = window.confirm(`Are you sure you want to delete this deck?`)
        if (answer) {
        dispatch(deckActions.deleteCard(userId, deckId, cardId));
        }
    }
    
    return (
        <>
        <Prompt 
        when={isEditing}
        message="Are you sure you want to leave without saving?"
        />
        <div className={`${styles.card_back__wrapper} ${isDark ? styles.dark : styles.light}`}>
            {!isEditing && 
            <div className={styles.btns_container}>
                <button className={`${styles.back_btn} ${isDark ? styles.dark : styles.light}`} onClick={handleClick}><BsArrowBarUp /></button>
                <div className={styles.editing_btns}>
                    <button className={`${styles.edit_and_delete__btn} ${isDark ? styles.dark : styles.light}`} onClick={() => setIsEditing(true)}><BsPencil /></button>
                    <button className={`${styles.edit_and_delete__btn} ${isDark ? styles.dark : styles.light}`} onClick={handleDelete}><BsTrash /></button>
                </div>
            </div>}
            <div id={styles.body_wrapper}>
                <div id={styles.title_div}>
                    <label className={styles.label}>Back - Card #{i + 1}</label>
                </div>
                {!isEditing ?
                <p className={styles.card_back__body}>{body}</p>
                :
                <EditCardBackForm isDark={isDark} front={front} cardId={cardId} deckId={deckId} userId={userId} setIsEditing={setIsEditing} body={body}/>
            }
            </div>
        </div>
        </>
    )
}

export default CardBack;