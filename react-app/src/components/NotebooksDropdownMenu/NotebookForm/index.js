import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as notebookActions from '../../../store/notebooks'
import {BsCheck, BsX} from 'react-icons/bs'

import styles from '../../../css-modules/notebookform.module.css';

const NotebookForm = ({setShowNotebookForm}) => {
    const [title, setTitle] = useState('')
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)

    const createNotebook = async (e) => {
        e.preventDefault();
        let userId;
        if (user) userId = user.id
        const data = await dispatch(notebookActions.createNotebook(userId, title));
        if (data) {
          setErrors(data);
        } else {
            setShowNotebookForm(false)
        }
      };

    return (
        <form id={styles.notebook_form} onSubmit={createNotebook}>
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
                <button onClick={() => setShowNotebookForm(false)} className={styles.notebook_form__cancel}><BsX /></button>
            </form>
    )
}

export default NotebookForm;