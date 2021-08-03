import React from 'react';
import { BsPencil, BsTrash, BsArrowBarUp} from 'react-icons/bs'
import EditCardFrontForm from './EditCardFrontForm';

import styles from '../../css-modules/card.module.css';

const CardFront = ({body, handleClick, isDark, deckId, userId, cardId, back}) => {
    const [isEditing, setIsEditing] = React.useState(false);

    const handleDelete = () => {
        return;
    }
    
    return (
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
                <label className={styles.label}>Front</label>
                {!isEditing ?
                <p className={styles.card_front__body}>{body}</p>
                :
                <EditCardFrontForm back={back} cardId={cardId} deckId={deckId} userId={userId} setIsEditing={setIsEditing} body={body}/>
            }
            </div>
        </div>
    )
}

export default CardFront;