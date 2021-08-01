import React, {useEffect, useState} from 'react';
import Editor from 'rich-markdown-editor';
import {useSelector, useDispatch} from 'react-redux'
import * as notebookActions from '../../store/notebooks'
import {useParams, NavLink} from 'react-router-dom'
import { BsPencil, BsTrash, BsX} from 'react-icons/bs'
import {FiSave} from 'react-icons/fi'
import EditNoteForm from './EditNoteForm'


import styles from '../../css-modules/notepage.module.css';

const NotePage = () => {
    const user = useSelector(state => state.session.user);
    const note = useSelector(state => state.notebooks.currentNote)
    const notebooks = useSelector(state => state.notebooks.notebooks)

    const [ isPrivate, setIsPrivate ] = useState(true);
    const [ body, setBody ] = useState('');
    const [ title, setTitle ] = useState('');
    const [ isDark, setIsDark ] = useState(false);
    const [ isEditing, setIsEditing ] = useState(false);
    const [ currentNotebook, setCurrentNotebook ] = useState(null);
    const [ showEditNoteForm, setShowEditNoteForm ] = useState(false);

    const dispatch = useDispatch();
    const {notebookId, noteId} = useParams();
    
    useEffect(() => {
        let userId;
        if (user) userId = user.id
        dispatch(notebookActions.getNote( userId, notebookId, noteId))
    }, [user, dispatch, notebookId, noteId]);

    useEffect(() => {
        if (note) {
            setTitle(note.title);
            setBody(note.body);
            setIsPrivate(!note.share);
            if (notebooks) {
                const notebook = notebooks.find(notebook => notebook.id === note.notebookId)
                const notes = Object.values(notebook.notes)
                notebook.notes = notes;
                setCurrentNotebook(notebook)
            }
        }
    }, [note, notebooks]);


    const editNote = () => {
        let userId;
        if (user) userId = user.id
        const noteVals = {
            body: body,
            share: isPrivate
        }
        dispatch(notebookActions.editNote( userId, notebookId, noteId, noteVals))
        setIsEditing(!isEditing);
    }

    const deleteNote = () => {
        return;
    }

    return(
        <div className={styles.note_wrapper}>
            <div id={styles.logo_div}>
                <img id={styles.logo}src="https://i.ibb.co/RH80yCG/Midnight-Oil-Logo-No-Words-Transparent.png" alt="logo"/>
            </div>
            <div id={styles.note_header__div}>
                { !showEditNoteForm ?
                <div id={styles.header_container}>
                <h2 id={styles.note_page__header}>{title}</h2>
                <button className={styles.edit_note__title} onClick={() => {setShowEditNoteForm(!showEditNoteForm)}}><BsPencil /></button>
                </div>
                :
                <EditNoteForm noteId={note.id}notebookId={currentNotebook.id} title={title} setTitle={setTitle} setShowEditNoteForm={setShowEditNoteForm}/>
                }
            <div id={styles.under_note__title}> 
            {!isEditing && 
            <>
            <div className={styles.btn_wrapper}>
                <button className={styles.edit_and_delete} onClick={editNote}><BsPencil /></button>
                <button className={styles.edit_and_delete} onClick={deleteNote}><BsTrash /></button>
            </div>
            <div id={styles.theme_wrapper}>
                <label className={styles.radio_label}>Light Theme</label>
                <input type="radio" id={styles.light} name="theme" checked={!isDark} value={false} onChange={()=> setIsDark(false)}></input>
                <label className={styles.radio_label}>Dark Theme</label>
                <input type="radio" id={styles.dark} name="theme" value={true} onChange={()=> setIsDark(true)}></input>
            </div>
            </>}
            {isEditing && 
            <>
            <div className={styles.btn_wrapper}>
                <button className={styles.edit_and_delete} onClick={editNote}><FiSave /></button>
                <button className={styles.edit_and_delete} onClick={() => setIsEditing(false)}><BsX /></button>
            </div>
            <div id={styles.share_wrapper}>
                <label className={styles.radio_label}>Public</label>
                <input type="radio" id={styles.public} name="share" checked={!isPrivate} value={false} onChange={()=> setIsPrivate(false)}></input>
                <label className={styles.radio_label}>Private</label>
                <input type="radio" id={styles.private} name="share" checked={isPrivate} value={true} onChange={()=> setIsPrivate(true)}></input>
            </div>
            </>
            }
            </div>
            </div>
            <div id={styles.note_sidebar}>
                <h2 id={styles.sidebar_header}>{currentNotebook?.title}</h2>
                {currentNotebook?.notes.map( thenote => {
                    if (thenote.id !== note.id) {
                        return (
                            <div className={styles.note_link__wrapper}>
                            <NavLink className={styles.note_link} key={thenote.id} to={`/notebooks/${thenote.notebookId}/notes/${thenote.id}`}>{thenote?.title}</NavLink>
                            </div>
                        )
                    }
                })}
            </div>
            <div id={styles.editor_container} className={isDark ? styles.dark : styles.light}>
                <Editor
                value={note ? note.body : ''}
                id={styles.editor}
                readOnly={!isEditing}
                readOnlyWriteCheckboxes={!isEditing}
                dark={isDark}
                onChange={(value) => setBody(value)}
                />
            </div>
        </div>
    )
}

export default NotePage;