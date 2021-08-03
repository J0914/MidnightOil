import React from 'react';
import { BsPencil, BsTrash, BsX, BsArrowBarUp} from 'react-icons/bs'
import {FiSave} from 'react-icons/fi'

import styles from '../../css-modules/card.module.css'

const CardBack = ({body, handleClick, isDark}) => {
    const [isEditing, setIsEditing] = React.useState(false);

    const handleEdit = () => {
        return;
    }

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
            <div>
                <label className={styles.label}>Back</label>
                <p className={styles.card_back__body}>{body}</p>
            </div>
            {isEditing &&
            <div className={styles.btns_container}>
                <div className={styles.editing_btns}>
                    <button className={styles.save_and_delete__btn} onClick={handleEdit}><FiSave /></button>
                    <button className={styles.save_and_delete__btn} onClick={() => setIsEditing(false)}><BsX /></button>
                </div>
            </div>
            }
        </div>
    )
}

export default CardBack;