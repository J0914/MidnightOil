import React from 'react';
import { BsPencil, BsTrash, BsArrowBarUp} from 'react-icons/bs'
import EditCardBackForm from './EditCardBackForm';

import styles from '../../css-modules/card.module.css';

const CardBack = ({body, handleClick, isDark, deckId, userId, cardId, front}) => {
    const [isEditing, setIsEditing] = React.useState(false);

    const handleDelete = () => {
        return;
    }
    
    return (
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
                <label className={styles.label}>Back</label>
                {!isEditing ?
                <p className={styles.card_back__body}>{body}</p>
                :
                <EditCardBackForm front={front} cardId={cardId} deckId={deckId} userId={userId} setIsEditing={setIsEditing} body={body}/>
            }
            </div>
        </div>
    )
}

export default CardBack;