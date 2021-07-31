import React from 'react';
import { useState, useRef, useEffect } from 'react';
import {useSelector} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {BsPlusCircle, BsTrash} from 'react-icons/bs'
import NotebookForm from '../NotebookForm'

import styles from '../../css-modules/notebookdropdown.module.css'

const NotebooksDropdownMenu = () => {
    const dropdownRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [showNotebookForm, setShowNotebookForm] = useState(false);
  
    const notebooks = useSelector(state => state.notebooks.notebooks);

    const handleClick = () => setIsOpen(!isOpen);

    const createNote = () => {
        return;
    }

    const deleteNotebook = () => {
        return;
    }


    return (
        <div className={styles.notebook_menu__container}>
            <button onClick={handleClick} className={styles.notebook_menu__trigger}>
                <span>Notebooks</span>
            </button>
            {isOpen && <div ref={dropdownRef} className={`${styles.notebook_menu} ${isOpen ? styles.active : styles.inactive}`}>
            <button className={styles.add_notebook} onClick={() => setShowNotebookForm(true)}>Create Notebook <BsPlusCircle /></button>
            {showNotebookForm && <NotebookForm setShowNotebookForm={setShowNotebookForm} />}
                {notebooks?.map((notebook) => (
                    <div  key={notebook.id}>
                    <div className={styles.notebook_container}>
                        <ul className={styles.notebook_title}>{notebook.title}</ul>
                        <button className={styles.delete_notebook} onClick={() => deleteNotebook}><BsTrash /></button>
                    </div>
                        <button className={styles.add_note} onClick={() => createNote}>Create Note <BsPlusCircle /></button>
                        <div className={styles.notes_container}>
                        {
                            Object.values(notebook.notes).map(note => {
                                return (
                                    <NavLink className={styles.note_nav}to={`/notebook/${notebook.id}/notes/${note.id}`} key={note.id}>{note.title}</NavLink>
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