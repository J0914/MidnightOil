import React from 'react';
import { useState, useRef } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {BsPlusCircle, BsDashCircle, BsTrash, BsPencil, BsX} from 'react-icons/bs'
import NotebookForm from './NotebookForm'
import EditNotebookForm from './EditNotebookForm'
import NoteForm from './NoteForm'
import * as notebookActions from '../../store/notebooks'

import styles from '../../css-modules/notebookdropdown.module.css'

const NotebooksDropdownMenu = () => {
    const dropdownRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [showNotebookForm, setShowNotebookForm] = useState(false);
    const [showEditNotebookForm, setShowEditNotebookForm] = useState(false);
    const [showNoteForm, setShowNoteForm] = useState(false);
    const [currentEle, setCurrentEle] = useState(null);
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user)
    const notebooks = useSelector(state => state.notebooks.notebooks);

    const handleClick = () => setIsOpen(!isOpen);

    const handleEditNotebookClick = (id) => {
        setShowEditNotebookForm(true);
        setCurrentEle(id)
    }

    const openNoteForm = (id) => {
        setShowNoteForm(!showNoteForm)
        setCurrentEle(id)
    }

    const deleteNotebook = (notebookId) => {
        let userId;
        if (user) {
            userId = user.id
        }
        let answer = window.confirm(`Are you sure you want to delete this notebook?`)
        if (answer) {
        dispatch(notebookActions.deleteNotebook(userId, notebookId))
        } else {
            return;
        }
    }

    return (
        <div ref={dropdownRef} className={styles.notebook_menu__container}>
            <div className={styles.fixmyproblems}>
            <button onClick={handleClick} className={styles.notebook_menu__trigger}>
                <span>Notebooks</span>
            </button>
            {isOpen && 
            <div className={`${styles.notebook_menu} ${isOpen ? styles.active : styles.inactive}`}>
                <button className={styles.add_notebook} onClick={() => setShowNotebookForm(!showNotebookForm)}>Create Notebook {!showNotebookForm ? <BsPlusCircle /> : <BsDashCircle />}</button>
                {showNotebookForm &&  
                <div className={styles.form__wrapper}>
                <NotebookForm setIsOpen={setIsOpen} setShowNotebookForm={setShowNotebookForm} />
                <button onClick={() => setShowNotebookForm(false)} className={styles.close}><BsX /></button>
                </div>
                }
                {notebooks?.map((notebook) => (
                    <div  key={notebook.id}>
                        <div className={styles.notebook_container}>
                            {!showEditNotebookForm && 
                            <>
                            <ul id={notebook.id}className={styles.notebook_title}>{notebook.title}</ul>
                            <button id={notebook.id} className={styles.edit_notebook} onClick={(e) => handleEditNotebookClick(notebook.id)}><BsPencil /></button>
                            <button className={styles.delete_notebook} onClick={() => deleteNotebook(notebook.id)}><BsTrash /></button>
                            </>
                            }
                            {showEditNotebookForm && notebook.id === currentEle &&
                            <div className={styles.form__wrapper}>
                            <EditNotebookForm setShowEditNotebookForm={setShowEditNotebookForm} currentTitle={notebook.title} notebookId={notebook.id}/>
                            <button onClick={() => setShowEditNotebookForm(false)} className={styles.close}><BsX /></button>
                            </div>
                            }
                            {showEditNotebookForm && notebook.id !== currentEle &&
                            <>
                            <ul id={notebook.id}className={styles.notebook_title}>{notebook.title}</ul>
                            <button id={notebook.id} className={styles.edit_notebook} onClick={(e) => handleEditNotebookClick(notebook.id)}><BsPencil /></button>
                            <button className={styles.delete_notebook} onClick={() => deleteNotebook(notebook.id)}><BsTrash /></button>
                            </>
                            }
                        </div>
                        <button className={styles.add_note} onClick={() => openNoteForm(notebook.id)}>Create Note {!showNoteForm ? <BsPlusCircle /> : <BsDashCircle />}</button>
                        {showNoteForm && notebook.id === currentEle &&
                        <div className={styles.form__wrapper}>
                        <NoteForm notebookId={notebook.id} setShowNoteForm={setShowNoteForm} setIsOpen={setIsOpen} />
                        <button onClick={() => setShowNoteForm(false)} className={styles.close}><BsX /></button>
                        </div>}
                        
                        <div className={styles.notes_container}>
                        {
                            Object.values(notebook.notes).reverse().map(note => {
                                return (
                                    <NavLink onClick={() => setIsOpen(false)} className={styles.note_nav}to={`/notebooks/${notebook.id}/notes/${note.id}`} key={note.id}>{note.title}</NavLink>
                                )
                            })
                        }
                        </div>
                    </div>
                ))}
            </div>}
            </div>
        </div>
    );
};

export default NotebooksDropdownMenu;