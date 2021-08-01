import React from 'react';
import { useState, useRef, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {BsPlusCircle, BsDashCircle, BsTrash, BsPencil, BsX} from 'react-icons/bs'
import NotebookForm from './NotebookForm'
import EditNotebookForm from './EditNotebookForm'
import NoteForm from './NoteForm'
import * as notebookActions from '../../store/notebooks'
import { Redirect } from 'react-router-dom';

import styles from '../../css-modules/notebookdropdown.module.css'

const NotebooksDropdownMenu = () => {
    const dropdownRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [showNotebookForm, setShowNotebookForm] = useState(false);
    const [showEditNotebookForm, setShowEditNotebookForm] = useState(false);
    const [showNoteForm, setShowNoteForm] = useState(false);
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user)
    const notebooks = useSelector(state => state.notebooks.notebooks);

    const handleClick = () => setIsOpen(!isOpen);

    const deleteNotebook = (notebookId) => {
        let userId;
        if (user) {
            userId = user.id
        }
        dispatch(notebookActions.deleteNotebook(userId, notebookId))
    }


    return (
        <div className={styles.notebook_menu__container}>
            <button onClick={handleClick} className={styles.notebook_menu__trigger}>
                <span>Notebooks</span>
            </button>
            {isOpen && <div ref={dropdownRef} className={`${styles.notebook_menu} ${isOpen ? styles.active : styles.inactive}`}>
            <button className={styles.add_notebook} onClick={() => setShowNotebookForm(!showNotebookForm)}>Create Notebook {!showNotebookForm ? <BsPlusCircle /> : <BsDashCircle />}</button>
            {showNotebookForm && 
            <div className={styles.form__wrapper}>
            <NotebookForm setShowNotebookForm={setShowNotebookForm} />
            <button onClick={() => setShowNotebookForm(false)} className={styles.close}><BsX /></button>
            </div>
            }
                
                {notebooks?.map((notebook) => (
                    <div  key={notebook.id}>
                    <div className={styles.notebook_container}>
                        {!showEditNotebookForm && 
                        <>
                        <ul className={styles.notebook_title}>{notebook.title}</ul>
                        <button className={styles.edit_notebook} onClick={() => setShowEditNotebookForm(true)}><BsPencil /></button>
                        <button className={styles.delete_notebook} onClick={() => deleteNotebook(notebook.id)}><BsTrash /></button>
                        </>
                        }
                        {showEditNotebookForm && 
                        <div className={styles.form__wrapper}>
                        <EditNotebookForm setShowEditNotebookForm={setShowEditNotebookForm} currentTitle={notebook.title} notebookId={notebook.id}/>
                        <button onClick={() => setShowEditNotebookForm(false)} className={styles.close}><BsX /></button>
                        </div>}
                    </div>
                        <button className={styles.add_note} onClick={() => setShowNoteForm(!showNoteForm)}>Create Note {!showNoteForm ? <BsPlusCircle /> : <BsDashCircle />}</button>
                        {showNoteForm && 
                        <div className={styles.form__wrapper}>
                        <NoteForm notebookId={notebook.id} setShowNoteForm={setShowNoteForm} setIsOpen={setIsOpen} />
                        <button onClick={() => setShowNoteForm(false)} className={styles.close}><BsX /></button>
                        </div>}
                        
                        <div className={styles.notes_container}>
                        {
                            Object.values(notebook.notes).map(note => {
                                return (
                                    <NavLink className={styles.note_nav}to={`/notebooks/${notebook.id}/notes/${note.id}`} key={note.id}>{note.title}</NavLink>
                                )
                            })
                        }
                        </div>
                    </div>
                ))}
            </div>}
        </div>
    );
};

export default NotebooksDropdownMenu;