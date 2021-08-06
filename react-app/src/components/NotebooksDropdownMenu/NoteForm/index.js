import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as noteActions from '../../../store/notebooks'
import {BsCheck} from 'react-icons/bs'
import { useHistory } from 'react-router-dom';

import styles from '../../../css-modules/noteform.module.css';


const NoteForm = ({setShowNoteForm, notebookId, setIsOpen}) => {
    const [errors, setErrors] = useState([])
    const [title, setTitle] = useState('')
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)

    const createNote = async (e) => {
        e.preventDefault()
        let userId;
        if (user) userId = user.id
        const noteVals = {
            title: title,
            body: 'New Note'
        }
        const note = await dispatch(noteActions.createNote(userId, notebookId, noteVals));
        if (Array.isArray(note)) {
          setErrors(note);
        } else {
            setShowNoteForm(false)
            if (setIsOpen) {
                setIsOpen(false);
            }
            history.push(`/notebooks/${notebookId}/notes/${note.id}`);
        }
      };

    return (
        <form id={styles.note_form} onSubmit={createNote}>
            {errors.map((error, ind) => (
            <li className={styles.error} key={ind}>{error}</li>
            ))}
            <input 
            type="text" 
            placeholder="Note Title" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.note_name}
            maxLength={20}
            required={true}
            />
            <button type="submit" className={styles.note_form__btn}><BsCheck /></button>
        </form>
    )
}

export default NoteForm;