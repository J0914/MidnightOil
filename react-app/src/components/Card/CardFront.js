import React from 'react';
import {useDispatch } from 'react-redux'
import { BsPencil, BsTrash, BsArrowBarUp} from 'react-icons/bs'
import EditCardFrontForm from './EditCardFrontForm';
import * as deckActions from '../../store/decks'
import {Prompt} from 'react-router'

import styles from '../../css-modules/card.module.css';

const CardFront = ({ isDark, setIsDark, i, body, handleClick, deckId, userId, cardId, back }) => {
    const [isEditing, setIsEditing] = React.useState(false);
    const dispatch = useDispatch();

    const handleDelete = () => {
        let answer = window.confirm(`Are you sure you want to delete this card?`)
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
        <div className={`${styles.card_front__wrapper} ${isDark ? styles.dark : styles.light}`}>
            {!isEditing && 
            <div className={styles.btns_container}>
                <button className={`${styles.front_btn} ${isDark ? styles.dark : styles.light}`} onClick={handleClick}><BsArrowBarUp /></button>
                <div className={styles.editing_btns}>
                    <button className={`${styles.edit_and_delete__btn} ${isDark ? styles.dark : styles.light}`} onClick={() => setIsEditing(true)}><BsPencil /></button>
                    <button className={`${styles.edit_and_delete__btn} ${isDark ? styles.dark : styles.light}`} onClick={handleDelete}><BsTrash /></button>
                </div>
            </div>}
            <div id={styles.body_wrapper}>
                {/* <div id={styles.title_div}> */}
                    <label className={styles.label}>Front - Card #{i + 1}</label>
                {/* </div> */}
                {!isEditing ?
                <p className={styles.card_front__body}>{body}</p>
                :
                <EditCardFrontForm isDark={isDark} back={back} cardId={cardId} deckId={deckId} userId={userId} setIsEditing={setIsEditing} body={body}/>
            }
            </div>
        </div>
        </>
    )
}

export default CardFront;