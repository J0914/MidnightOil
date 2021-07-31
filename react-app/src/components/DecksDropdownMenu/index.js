import React from 'react';
import { useState, useRef, useEffect } from 'react';
import {useSelector} from 'react-redux';
import {NavLink} from 'react-router-dom';

import styles from '../../css-modules/deckdropdown.module.css'

const DecksDropdownMenu = () => {
    const dropdownRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const decks = useSelector(state => state.decks.decks);

    useEffect(() => {
        const pageClickEvent = (e) => {
            console.log(e);
            if (isOpen) {
                window.addEventListener('click', pageClickEvent);
            }
            return () => {
                window.removeEventListener('click', pageClickEvent);
            }
        }
    }, [isOpen]);

    const handleClick = () => setIsOpen(!isOpen);

    return (
        <div className={styles.deck_menu__container}>
            <button onClick={handleClick} className={styles.deck_menu__trigger}>
                <span>Decks</span>
            </button>
            {isOpen && <div ref={dropdownRef} className={`${styles.deck_menu} ${isOpen ? styles.active : styles.inactive}`}>
                {decks?.map((deck) => (
                    <NavLink className={styles.deck_nav} key={deck.id} to={`/decks/${deck.id}`}>{deck.title}</NavLink>
                ))}
            </div>}
        </div>
    );
};

export default DecksDropdownMenu;