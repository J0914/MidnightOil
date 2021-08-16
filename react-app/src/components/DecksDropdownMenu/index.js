import React from 'react';
import { useState, useRef } from 'react';
import {useSelector} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {BsPlusCircle, BsDashCircle} from 'react-icons/bs';
import DeckForm from './DeckForm'

import styles from '../../css-modules/deckdropdown.module.css'

const DecksDropdownMenu = ({isOpen, setIsOpen, setNotebooksIsOpen}) => {
    const dropdownRef = useRef(null);
    const [showDeckForm, setShowDeckForm] = useState(false);
    const decks = useSelector(state => state.decks.decks);

    const handleClick = () => {
        setIsOpen(!isOpen)
        setNotebooksIsOpen(false);
        
    };

    return (
        <div ref={dropdownRef}  className={styles.deck_menu__container}>
            <button onClick={handleClick} className={styles.deck_menu__trigger}>
                <span>Decks</span>
            </button>
            {isOpen && 
            <div className={`${styles.deck_menu} ${isOpen ? styles.active : styles.inactive}`}>
                <button className={styles.add_deck} onClick={() => setShowDeckForm(!showDeckForm)}>Create Deck {!showDeckForm ? <BsPlusCircle /> : <BsDashCircle />}</button>
                {showDeckForm && 
                <div className={styles.form__wrapper}>
                <DeckForm setIsOpen={setIsOpen} setShowDeckForm={setShowDeckForm} />
                </div>
                }
                {Object.values(decks).reverse().map((deck) => (
                    <NavLink onClick={() => setIsOpen(false)} className={styles.deck_nav} key={deck.id} to={`/decks/${deck.id}`}>{deck.title}</NavLink>
                ))}
            </div>
            }
        </div>
    );
};

export default DecksDropdownMenu;