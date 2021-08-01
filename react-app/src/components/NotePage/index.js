import React, {useEffect, useState} from 'react';
import Editor from 'rich-markdown-editor';
import {useSelector, useDispatch} from 'react-redux'
import * as notebookActions from '../../store/notebooks'
import {useParams} from 'react-router-dom'
import { BsPencil, BsTrash, BsFillUnlockFill, BsLockFill} from 'react-icons/bs'


import styles from '../../css-modules/notepage.module.css';

const NotePage = () => {
    const [ toPublic, setToPublic ] = useState(false);
    const [ toPrivate, setToPrivate ] = useState(true);
    const [ title, setTitle ] = useState(null);
    const [ body, setBody ] = useState(null);
    const [ isDark, setIsDark ] = useState(false);
    const dispatch = useDispatch();
    const {notebookId, noteId} = useParams();
    const user = useSelector(state => state.session.user);
    const note = useSelector(state => state.notebooks.currentNote)
    
    useEffect(() => {
        let userId;
        if (user) userId = user.id
        console.log(userId, notebookId, noteId);
        dispatch(notebookActions.getNote( userId, notebookId, noteId))
    }, [user, dispatch]);

    useEffect(() => {
        if (note) {
            setTitle(note.title);
        }
    }, [note]);

    const editNote = () => {
        return;
    }

    const deleteNote = () => {
        return;
    }

    return(
        <div className={styles.note_wrapper}>
            <div id={styles.logo}>
                <img src="pic_trulli.jpg" alt="Italian Trulli"/>
            </div>
            <div id={styles.note_header__div}>
                <h2 id={styles.note_page__header}>{note?.title}</h2>
            <div id={styles.theme_wrapper}>
                <label className={styles.radio_label}>Light Theme</label>
                <input type="radio" id={styles.light} name="theme" value={false} onChange={()=> setIsDark(false)}></input>
                <label className={styles.radio_label}>Dark Theme</label>
                <input type="radio" id={styles.dark} name="theme" value={true} onChange={()=> setIsDark(true)}></input>
            </div>
            <div className={styles.btn_wrapper}>
                <button className={styles.edit_and_delete} onClick={editNote}><BsPencil /></button>
                <button className={styles.edit_and_delete} onClick={deleteNote}><BsTrash /></button>
            </div>
                {/* <input type="radio" id={styles.public} name="share" value={toPublic} onChange={()=> setToPublic(!toPublic)}></input> */}
                {/* <input type="radio" id={styles.private} name="share" value={toPrivate} onChange={()=> setToPrivate(!toPrivate)}></input> */}
            </div>
            <div id={styles.note_sidebar}>
                <ul id={styles.note_contents}>Contents</ul>
            </div>
            <div id={styles.editor_container}>
                <Editor
                value={note ? note.body : ''}
                id={styles.editor}
                readOnly={false}
                dark={isDark}
                />
            </div>
        </div>
    )
}

export default NotePage;