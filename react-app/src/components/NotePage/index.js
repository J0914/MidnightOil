import React, {useEffect, useState, useRef} from 'react';
import Editor from 'rich-markdown-editor';
import {useSelector, useDispatch} from 'react-redux'
import {useParams, NavLink, useHistory} from 'react-router-dom'
import {Prompt} from 'react-router'
import * as notebookActions from '../../store/notebooks'
import { BsPencil, BsTrash, BsX, BsPlusCircle, BsDashCircle} from 'react-icons/bs'
import {FiSave} from 'react-icons/fi'
import EditNoteForm from './EditNoteForm'
import NoteForm from '../NotebooksDropdownMenu/NoteForm'

import styles from '../../css-modules/notepage.module.css';

const NotePage = () => {
    const inputEl = useRef(null);
    const userId = useSelector(state => state.session.user?.id);
    const notebook = useSelector(state => state.notebooks.currentNotebook);
    const note = useSelector(state => state.notebooks.currentNote);
    const notes = useSelector(state => state.notebooks.notes);

    const [ currentNotebook, setCurrentNotebook ] = useState(null);
    const [ currentNotebookNotes, setCurrentNotebookNotes ] = useState(null);
    const [ currentNote, setCurrentNote ] = useState(note);
    const [ title, setTitle ] = useState(currentNote?.title || '');
    const [ body, setBody ] = useState(currentNote?.body || '');
    const [ share, setShare ] = useState(currentNote?.share || false);
    const [ isEditing, setIsEditing ] = useState(false);
    const [ isDark, setIsDark ] = useState(false);
    const [ showEditNoteForm, setShowEditNoteForm ] = useState(false);
    const [ showNoteForm, setShowNoteForm] = useState(false);
    const [ errors, setErrors] = useState([]);

    const dispatch = useDispatch();
    const history = useHistory()
    const {notebookId, noteId} = useParams();

    useEffect(() => {
        setCurrentNotebook(notebook)
        setCurrentNote(note);
        setCurrentNotebookNotes(notes);
    }, [note, notebook, notes])

    useEffect(() => {
        dispatch(notebookActions.getNote( userId, notebookId, noteId ))
        dispatch(notebookActions.getNotebook( userId, notebookId ))
    }, [dispatch, userId, notebookId, noteId]);

    useEffect(() => {
        setTitle(currentNote?.title);
        setBody(currentNote?.body);
        setShare(currentNote?.share);
        setIsEditing(false);
    }, [currentNote])

    const editNote = (e) => {
        e.preventDefault();
        const noteVals = {
            title: title,
            body: body,
            share: share,
            editBody: true,
            editTitle: false
        }
        const note = dispatch(notebookActions.editNote( userId, notebookId, noteId, noteVals))
        if (note.errors) {
            setErrors(note.errors)
        } else {
            setCurrentNote(note);
            setIsEditing(!isEditing);
        }
    }

    const deleteNote = () => {

        let answer = window.confirm(`Are you sure you want to delete this note?`)
        if (answer) {
            if (currentNotebookNotes?.length <= 1) {
                dispatch(notebookActions.deleteNote(userId, notebookId,noteId))
                history.push('/dashboard')
            } else {
                const data = dispatch(notebookActions.deleteNote(userId, notebookId,noteId))
                if (data.errors) {
                    setErrors(data.errors)
                } else {
                    history.push(`/notebooks/${notebookId}/notes/${currentNotebookNotes[0].id}`)
                }
            }
        } else {
            return;
        }
    }   


    return(
        <>
        <Prompt 
        when={isEditing}
        message="Are you sure you want to leave without saving?"
        />
            <div className={styles.note_wrapper}>
                {errors.map((error, ind) => (
                <li className={styles.error} key={ind}>{error}</li>
                ))}
                <form id='edit_note__form' onSubmit={editNote}>
                    <textarea
                    type="hidden" 
                    value={body}
                    className={styles.note_body}
                    required={true}
                    />
                </form>
                <div id={styles.note_header__div}>
                    { !showEditNoteForm ?
                    <div id={styles.header_container}>
                    <h2 id={styles.note_page__header}>{title}</h2>
                    <button className={styles.edit_note__title} onClick={() => {setShowEditNoteForm(!showEditNoteForm)}}><BsPencil /></button>
                    </div>
                    :
                    <EditNoteForm body={body} noteId={noteId}notebookId={notebookId} title={title} setTitle={setTitle} setShowEditNoteForm={setShowEditNoteForm}/>
                    }
                <div id={styles.under_note__title}> 
                {!isEditing && 
                <>
                <div className={styles.btn_wrapper}>
                    <button className={styles.edit_and_delete} onClick={() => setIsEditing(true)}>Edit Note <BsPencil /></button>
                    <button className={styles.edit_and_delete} onClick={deleteNote}><BsTrash /></button>
                </div>
                <div id={styles.theme_wrapper}>
                    <label htmlFor='light' className={styles.radio_label}>Light</label>
                    <input type="radio" id='light' name="theme" checked={!isDark} value={false} onChange={()=> setIsDark(false)}></input>
                    <label htmlFor='dark' className={styles.radio_label}>Dark</label>
                    <input type="radio" id='dark' name="theme" value={true} onChange={()=> setIsDark(true)}></input>
                </div>
                </>}
                {isEditing && 
                <>
                <div className={styles.btn_wrapper}>
                    <button type='submit' form='edit_note__form' className={styles.edit_and_delete} >Save Changes <FiSave /></button>
                    <button className={styles.edit_and_delete} onClick={() => setIsEditing(false)}><BsX /></button>
                </div>
                {/* <div id={styles.share_wrapper}>
                    <label htmlFor='public' className={styles.radio_label}>Public</label>
                    <input type="radio" id='public' name="share" checked={share} value={true} onChange={(e)=> setShare(true)}></input>
                    <label htmlFor='private' className={styles.radio_label}>Private</label>
                    <input type="radio" id='private' name="share" checked={!share} value={false} onChange={(e)=> setShare(false)}></input>
                </div> */}
                </>
                }
                </div>
                </div>
                <div id={styles.note_sidebar}>
                    <div id={styles.logo_div}>
                        <img id={styles.logo}src="https://i.ibb.co/RH80yCG/Midnight-Oil-Logo-No-Words-Transparent.png" alt="logo"/>
                    </div>
                    <div className={styles.sticky}>
                        <h2 id={styles.sidebar_header}>{currentNotebook?.title}</h2>
                        <button className={styles.add_note} onClick={() => setShowNoteForm(!showNoteForm)}>Create Note {!showNoteForm ? <BsPlusCircle /> : <BsDashCircle />}</button>
                        {showNoteForm && 
                        <div className={styles.form__wrapper}>
                        <NoteForm notebookId={currentNotebook?.id} setShowNoteForm={setShowNoteForm} />
                        <button onClick={() => {setShowNoteForm(false)}} className={styles.close}><BsX /></button>
                        </div>}
                        <div id={styles.note_sidebar}>
                            {currentNotebookNotes?.map(thenote => (
                                <div key={thenote.id} className={styles.note_link__wrapper}>
                                <NavLink className={styles.note_link} key={thenote.id} to={`/notebooks/${thenote.notebookId}/notes/${thenote.id}`}>{thenote?.title}</NavLink>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div id={styles.editor_container} className={isDark ? styles.dark : styles.light}>
                    <Editor
                    value={currentNote?.body}
                    id={styles.editor}
                    readOnly={!isEditing}
                    readOnlyWriteCheckboxes={!isEditing}
                    dark={isDark}
                    onChange={(value) => setBody(value)}
                    autoFocus={true}
                    />
                </div>
            </div>
        </>
    )
}

export default NotePage;