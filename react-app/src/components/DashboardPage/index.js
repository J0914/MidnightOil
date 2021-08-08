import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom'
// import Friends from './Friends';
// import SharedByUser from './SharedByUser';
// import SharedByFriends from './SharedByFriends';
import {getUsers} from '../../store/session';
import { getClassmates } from '../../store/classmates';
import { getNotebooks } from '../../store/notebooks';
import { getDecks } from '../../store/decks';

import styles from '../../css-modules/dashboard.module.css';

const ProfilePage = () => {
    // const accepted = useSelector(state => state.classmates.acceptedDetail);
    // const incoming = useSelector(state => state.classmates.incomingDetail);
    // const pending = useSelector(state => state.classmates.pendingDetail);
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const notebooks = useSelector(state => state.notebooks.notebooks);
    const decks = useSelector(state => state.decks.decks);

    const [ currentNotes, setCurrentNotes ] = useState(null);
    const [ currentDecks, setCurrentDecks ] = useState(null);

    useEffect(() => {
        (async() => {
          if (user) {
            await dispatch(getClassmates(user.id));
            await dispatch(getNotebooks(user.id));
            await dispatch(getDecks(user.id));
            await dispatch(getClassmates(user.id)) 
          }
        })();
      }, [dispatch, user]);

    useEffect(() => {
        if (user) {
            dispatch(getUsers()); 
        }
    }, [dispatch, user])

    useEffect(() => {
        if (notebooks) {
            const thenotebook = notebooks[notebooks.length-1];
            if (thenotebook) {
                const thenotes = Object.values(thenotebook?.notes)
                setCurrentNotes(thenotes);
            }
        }
        
    }, [notebooks])

    useEffect(() => {
        if (decks)
        setCurrentDecks(Object.values(decks));
    }, [decks])


    return (
        <div id={styles.profile_wrapper}>
            <div id={styles.header_wrapper}>
                    <h1 id={styles.profile_header}>Welcome Back {user?.fName}!</h1>
            <div className={styles.logo_wrapper}>
                <img src={'https://i.ibb.co/BrBCh1Q/Midnight-Oil-Logo.png'} alt="logo" className={styles.logo} />
            </div>
            </div>
            <div className={styles.content_wrapper}>
                    <h1 className={styles.profile_h1}>Get back to work! Select a note or flash card deck to get started.</h1>
                <div className={styles.notebook_wrapper}>
                    <h2 className={styles.notebook_h2}>Recent Notes</h2>
                    <div className={styles.notebook_list}>
                        {currentNotes?.length > 0 ? currentNotes.slice(0, 3).map((note) => (
                            <div key={note.id} className={styles.notebook_item}>
                                <div className={styles.profile_text}><Link to={`/notebooks/${note.notebookId}/notes/${note.id}`} className={styles.link} >{note.title}</Link></div>
                            </div>
                        ))
                        :
                        <p className={styles.profile_text}>Your most recent notebook is empty!</p>
                        }
                    </div>
                </div>
                <div className={styles.deck_wrapper}>
                    <h2 className={styles.deck_h2}>Recent Decks</h2>
                    <div className={styles.deck_list}>
                        {currentDecks?.length > 0 ? currentDecks.slice(0, 3).map((deck, index) => (
                            <div key={index} className={styles.deck_item}>
                                <div className={styles.profile_text}><Link to={`/decks/${deck.id}`} className={styles.link} >{deck.title}</Link></div>
                                <div className={styles.profile_text}>({Object.values(deck.cards).length} cards)</div>
                            </div>
                        ))
                        :
                        <p className={styles.profile_text}>You have no decks!</p>
                        }
                    </div>
                </div>
                <div className={styles.reminders_wrapper}>
                    <h2 className={styles.reminders_h2}>Study Tips</h2>
                    <div className={styles.reminders_list}>
                        <div className={styles.reminder_li}>
                        <li className={styles.profile_text}> Space out your studying! </li>
                        </div>
                        <div className={styles.reminder_li}>
                        <li className={styles.profile_text}> Test yourself! (use a deck!) </li>
                        </div>
                        <div className={styles.reminder_li}>
                        <li className={styles.profile_text}> DONT FORGET TO TAKE BREAKS! </li>
                        </div>
                        <div className={styles.reminder_li}>
                        <li className={styles.profile_text}> Create a study schedule! (and stick to it!) </li>
                        </div>
                        <div className={styles.reminder_li}>
                        <li className={styles.profile_text}> Always remember self care.  </li>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage;