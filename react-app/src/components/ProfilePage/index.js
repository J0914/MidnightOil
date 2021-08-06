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
        </div>
    )
}

export default ProfilePage;