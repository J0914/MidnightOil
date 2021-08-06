<<<<<<< HEAD
import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Friends from './Friends';
import SharedByUser from './SharedByUser';
import SharedByFriends from './SharedByFriends';
import {getUsers} from '../../store/session';

import styles from '../../css-modules/profile.module.css';

const ProfilePage = () => {
    const accepted = useSelector(state => state.classmates.acceptedDetail);
    const incoming = useSelector(state => state.classmates.incomingDetail);
    const pending = useSelector(state => state.classmates.pendingDetail);
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            dispatch(getUsers()); 
        }
    }, [dispatch, user]);


    return (
        <div id={styles.profile_wrapper}>
            <div id={styles.header_wrapper}>
<<<<<<< HEAD
                    <h1 id={styles.profile_header}>Welcome Back {user?.fName}!</h1>
            <div className={styles.logo_wrapper}>
                <img src={'https://i.ibb.co/BrBCh1Q/Midnight-Oil-Logo.png'} alt="logo" className={styles.logo} />
                {/* <div id={styles.theme_wrapper}>
                    <label htmlFor='light' className={styles.radio_label}>Light Theme</label>
                    <input type="radio" id='light' name="theme" checked={isDark === false} onChange={()=> setIsDark(false)}></input>
                    <label htmlFor='dark' className={styles.radio_label}>Dark Theme</label>
                    <input type="radio" id='dark' name="theme" checked={isDark === true} onChange={()=> setIsDark(true)}></input>
                </div> */}
            </div>
=======
            <h1 id={styles.profile_header}>Welcome Back {user?.fName}!</h1>
>>>>>>> parent of c8ad10d... bug fixes and style fixes
            </div>
            <Friends accepted={accepted} pending={pending} incoming={incoming} />
            <SharedByFriends />
            <SharedByUser />
        </div>
    )
}

=======
import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
<<<<<<< HEAD
import Friends from './Friends';
import SharedByUser from './SharedByUser';
import SharedByFriends from './SharedByFriends';
import {getUsers} from '../../store/session';
=======
import {getNotebooks} from '../../store/notebooks'
import {getDecks} from '../../store/decks'
>>>>>>> parent of 5c88887... basic setup for profile page and classmates

import styles from '../../css-modules/profile.module.css';

const ProfilePage = () => {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
<<<<<<< HEAD
    // const [isDark, setIsDark] = React.useState(false);

    useEffect(() => {
        if (user) {
            dispatch(getUsers()); 
        }
    }, [dispatch, user])


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
            <Friends accepted={accepted} pending={pending} incoming={incoming} />
            <SharedByFriends />
            <SharedByUser />
=======

    useEffect(() => {
        if (user) {
            (async() => {
                await dispatch(getNotebooks(user.id))
                await dispatch(getDecks(user.id))    
            })();
        }
    }, [user, dispatch]);

    return (
        <div className={styles.testdiv}>
            <h1 className={styles.testh1}>Welcome back username! (this feature is a work in progress)</h1>
>>>>>>> parent of 5c88887... basic setup for profile page and classmates
        </div>
    )
}

>>>>>>> parent of f1895e1... not finished, reverting main
export default ProfilePage;