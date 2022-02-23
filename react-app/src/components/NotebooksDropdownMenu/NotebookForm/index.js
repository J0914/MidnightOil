import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import * as notebookActions from '../../../store/notebooks'
import {BsCheck} from 'react-icons/bs'

import styles from '../../../css-modules/notebookform.module.css';

const NotebookForm = ({setIsOpen, setShowNotebookForm}) => {
    const [title, setTitle] = useState('');
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user);

    const createNotebook = async (e) => {
        e.preventDefault();
        let userId;
        if (user) userId = user.id
        const notebook = await dispatch(notebookActions.createNotebook(userId, title));
        if (Array.isArray(notebook)) {
          setErrors(notebook);
        } else {
          const noteVals = {
            title: 'New Note',
            body: 'New Note'
          }
          const note = await dispatch(notebookActions.createNote(userId, notebook.id, noteVals))
          if (Array.isArray(note)) {
            setErrors(note)
          } else {
            setShowNotebookForm(false)
            setIsOpen(false)
            history.push(`/notebooks/${notebook.id}/notes/${note.id}`)
          }
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
                autoFocus={true}
                />
                <button type="submit" className={styles.notebook_form__submit}><BsCheck /></button>
            </form>
    )
}

export default NotebookForm;