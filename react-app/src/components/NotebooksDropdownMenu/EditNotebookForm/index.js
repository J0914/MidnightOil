import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as notebookActions from '../../../store/notebooks'
import {BsCheck, BsX} from 'react-icons/bs'

import styles from '../../../css-modules/notebookform.module.css';

const EditNotebookForm = ({setShowEditNotebookForm, currentTitle, notebookId}) => {
    const [title, setTitle] = useState(currentTitle)
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)

    const editNotebook = async (e) => {
        e.preventDefault();
        let userId;
        if (user) userId = user.id
        const data = await dispatch(notebookActions.editNotebook(userId, notebookId, title));
        if (data) {
          setErrors(data);
        } else {
            setShowEditNotebookForm(false)
        }
      };

    return (
        <form id={styles.notebook_form} onSubmit={editNotebook}>
                {errors.map((error, ind) => (
                <li className={styles.error} key={ind}>{error}</li>
                ))}
                <input 
                type="text" 
                placeholder="Notebook Name" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={styles.notebook_name}
                required={true}
                />
                <button type="submit" className={styles.notebook_form__submit}><BsCheck /></button>
            </form>
    )
}

export default EditNotebookForm;