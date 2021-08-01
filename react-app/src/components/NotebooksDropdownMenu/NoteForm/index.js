import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as noteActions from '../../../store/notebooks'
import {BsCheck} from 'react-icons/bs'
import { Redirect } from 'react-router-dom';

import styles from '../../../css-modules/noteform.module.css';


const NoteForm = ({setShowNoteForm, noteId, setIsOpen, title}) => {
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const notes = useSelector(state => state.notebooks.notes)

    const createNote = async (e) => {
        e.preventDefault();
        let userId;
        if (user) userId = user.id
        const noteVals = {
            title: title,
            userId: userId,
            body: 'New Note'
        }
        const data = await dispatch(noteActions.createNote(userId, noteId, noteVals));
        if (data) {
          setErrors(data);
        } else {
            setShowNoteForm(false)
            setIsOpen(false);
        }
      };

    useEffect(() => {
        if (notes) {
            const note = notes[notes.length-1]
            return <Redirect to={`/notes/${noteId}/notes/${note.id}`} />;
        }
    }, [notes, noteId])

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
            />
            <button type="submit" className={styles.note_form__btn}><BsCheck /></button>
        </form>
    )
}

export default NoteForm;