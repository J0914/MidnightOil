import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getNotebooks} from '../../store/notebooks'
import {getDecks} from '../../store/decks'

import styles from '../../css-modules/profile.module.css';

const ProfilePage = () => {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            (async() => {
                await dispatch(getNotebooks(user.id))
                await dispatch(getDecks(user.id))    
            })();
        }
    }, [user]);

    return (
        <div className={styles.testdiv}>
            <h1 className={styles.testh1}>Welcome back username!</h1>
        </div>
    )
}

export default ProfilePage;