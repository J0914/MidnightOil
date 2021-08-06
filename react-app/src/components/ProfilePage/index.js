import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom'
// import Friends from './Friends';
// import SharedByUser from './SharedByUser';
// import SharedByFriends from './SharedByFriends';
import {getUsers} from '../../store/session';

import styles from '../../css-modules/profile.module.css';

const ProfilePage = () => {
    // const accepted = useSelector(state => state.classmates.acceptedDetail);
    // const incoming = useSelector(state => state.classmates.incomingDetail);
    // const pending = useSelector(state => state.classmates.pendingDetail);
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const notebooks = useSelector(state => state.notebooks.notebooks);
    const decks = useSelector(state => state.decks.decks);

    const [ currentNotebooks, setCurrentNotebooks ] = useState(notebooks);
    const [ currentDecks, setCurrentDecks ] = useState(null);

    useEffect(() => {
        if (user) {
            dispatch(getUsers()); 
        }
    }, [dispatch, user])

    useEffect(() => {
        setCurrentNotebooks(notebooks);
    }, [notebooks])

    useEffect(() => {
        setCurrentDecks(Object.values(decks));
    }, [decks])


    return (
        <div id={styles.profile_wrapper}>
            <div id={styles.header_wrapper}>
                    <h1 id={styles.profile_header}>Welcome Back {user?.fName}!</h1>
            <div className={styles.logo_wrapper}>
                <img src={'https://i.ibb.co/BrBCh1Q/Midnight-Oil-Logo.png'} alt="logo" className={styles.logo} />
                {/* <div id={styles.theme_wrapper}>
                    <label for='light' className={styles.radio_label}>Light Theme</label>
                    <input type="radio" id='light' name="theme" checked={isDark === false} onChange={()=> setIsDark(false)}></input>
                    <label for='dark' className={styles.radio_label}>Dark Theme</label>
                    <input type="radio" id='dark' name="theme" checked={isDark === true} onChange={()=> setIsDark(true)}></input>
                </div> */}
            </div>
            </div>
            <div className={styles.content_wrapper}>
                    <h1 className={styles.profile_h1}>Get back to work! Select a notebook or flash card deck to get started.</h1>
                <div className={styles.notebook_wrapper}>
                    <h2 className={styles.notebook_h2}>Recent Notes</h2>
                    <div className={styles.notebook_list}>
                        {currentNotebooks?.slice(0, 3).map((notebook, index) => (
                            <div key={index} className={styles.notebook_item}>
                                {Object.values(notebook.notes).map((note) => (
                                    <div className={styles.profile_text}><Link className={styles.note_link} to={`/notebooks/${notebook.id}/notes/${note.id}`} className={styles.link} >{note.title}</Link></div>
                                ))}
                                <div id={styles.placeholder}></div>
                                
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.deck_wrapper}>
                    <h2 className={styles.deck_h2}>Recent Decks</h2>
                    <div className={styles.deck_list}>
                        {currentDecks?.slice(0, 3).map((deck, index) => (
                            <div key={index} className={styles.deck_item}>
                                <div className={styles.profile_text}><Link className={styles.link} >{deck.title}</Link></div>
                                <div className={styles.profile_text}>({Object.values(deck.cards).length} cards)</div>
                            </div>
                        ))}
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
                        <li className={styles.profile_text}> Reading is not studying! </li>
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