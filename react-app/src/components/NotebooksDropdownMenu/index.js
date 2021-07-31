import React from 'react';
import { useState, useRef, useEffect } from 'react';
import {useSelector} from 'react-redux';
import {NavLink} from 'react-router-dom';

import styles from '../../css-modules/notebookdropdown.module.css'

const NotebooksDropdownMenu = () => {
    const dropdownRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const notebooks = useSelector(state => state.notebooks.notebooks);

    const handleClick = () => setIsOpen(!isOpen);

    return (
        <div className={styles.notebook_menu__container}>
            <button onClick={handleClick} className={styles.notebook_menu__trigger}>
                <span>Notebooks</span>
            </button>
            {isOpen && <div ref={dropdownRef} className={`${styles.notebook_menu} ${isOpen ? styles.active : styles.inactive}`}>
                {notebooks?.map((notebook) => (
                    <>
                    <ul className={styles.notebook_title} key={notebook.id}>{notebook.title}</ul>
                        {
                            Object.values(notebook.notes).map(note => {
                                return (
                                    <NavLink className={styles.note_nav}to={`/notebook/${notebook.id}/notes/${note.id}`} key={note.id}>{note.title}</NavLink>
                                )
                            })
                        }
                    </>
                ))}
            </div>}
        </div>
    );
};

export default NotebooksDropdownMenu;