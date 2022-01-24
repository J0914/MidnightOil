import React from 'react';
import { useState, useEffect, useRef } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NavLink, useHistory} from 'react-router-dom';
import {BsPlusCircle, BsDashCircle, BsTrash, BsPencil, BsX} from 'react-icons/bs'
import NotebookForm from './NotebookForm'
import EditNotebookForm from './EditNotebookForm'
import NoteForm from './NoteForm'
import DeleteModal from '../DeleteModal'
import * as notebookActions from '../../store/notebooks'

import styles from '../../css-modules/notebookdropdown.module.css'

const NotebooksDropdownMenu = ({isOpen, setIsOpen, setDecksIsOpen}) => {
    const dropdownRef = useRef(null);
    const [showNotebookForm, setShowNotebookForm] = useState(false);
    const [showEditNotebookForm, setShowEditNotebookForm] = useState(false);
    const [showNoteForm, setShowNoteForm] = useState(false);
    const [currentEle, setCurrentEle] = useState(null);
    const [doDelete, setDelete] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch();
    const history = useHistory();
    
    const user = useSelector(state => state.session.user)
    const notebooks = useSelector(state => state.notebooks.notebooks);
    
    console.log(currentId)

    useEffect(() => {
        if (doDelete) deleteNotebook(currentId);
    }, [doDelete])

    const handleClick = () => {
        setIsOpen(!isOpen)
        setDecksIsOpen(false);
    };

    const handleEditNotebookClick = (id) => {
        setShowEditNotebookForm(true);
        setCurrentEle(id)
    }

    const openNoteForm = (id) => {
        setShowNoteForm(!showNoteForm)
        setCurrentEle(id)
    }

    const deleteNotebook = (notebookId) => {
        let userId = user?.id       
        if (doDelete) {
            dispatch(notebookActions.deleteNotebook(userId, notebookId))
            history.push('/dashboard')
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
                            {/* <button className={styles.delete_notebook} onClick={() => deleteNotebook(notebook.id)}><BsTrash /></button> */}
                            <DeleteModal setCurrentId={setCurrentId} notebookId={notebook.id} setDelete={setDelete} item={'notebook'}/>
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
                            Object.values(notebook.notes).map(note => {
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