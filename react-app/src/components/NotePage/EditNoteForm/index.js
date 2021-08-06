import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as noteActions from '../../../store/notebooks'
import {BsCheck, BsX} from 'react-icons/bs'

import styles from '../../../css-modules/editnoteform.module.css';


const EditNoteForm = ({setShowEditNoteForm, notebookId, body, title, setTitle, noteId}) => {
    const [errors, setErrors] = useState([])
    const [originalTitle, setOriginalTitle ] = useState(null)
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)

    const createNote = async (e) => {
        e.preventDefault()
        let userId;
        if (user) userId = user.id
        const noteVals = {
            title: title,
            body: body,
            editTitle: true,
            editBody: false
        }
        const note = await dispatch(noteActions.editNote(userId, notebookId, noteId, noteVals));
        if (Array.isArray(note)) {
          setErrors(note);
        } else {
            setShowEditNoteForm(false)
        }
      };

    const close = () => {
        setTitle(originalTitle);
        setShowEditNoteForm(false)
    }

    useEffect(() => {
        setOriginalTitle(title);
    }, [title])

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
            required={true}
            maxLength={19}
            size={20}
            />
            <button type="submit" className={styles.note_form__btn}><BsCheck /></button>
            <button onClick={close} className={styles.note_form__btn}><BsX /></button>
        </form>
    )
}

export default EditNoteForm;