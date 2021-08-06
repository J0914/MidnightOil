<<<<<<< HEAD
import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import Search from './search'
import {BsFillPersonDashFill} from 'react-icons/bs'
import {removeClassmate} from '../../../store/classmates'


import styles from '../../../css-modules/profile.module.css';

const Friends = ({accepted, incoming, pending}) => {
    // debugger
    const [ currentAccepted, setCurrentAccepted ] = React.useState(accepted);
    const [ currentIncoming, setCurrentIncoming ] = React.useState(incoming);
    const [ currentPending, setCurrentPending ] = React.useState(pending);
    const dispatch = useDispatch();

    const userId = useSelector(state => state.session.user?.id);
    
    React.useEffect(() => {
        setCurrentAccepted(accepted);
        setCurrentIncoming(incoming);
        setCurrentPending(pending);
    }, [accepted, incoming, pending])

    const removeFriend= (classmateId) => {
        let answer = window.confirm(`Are you sure you want to delete this friend?`)
        if (answer) {
            dispatch(removeClassmate(userId, classmateId));
        }
    }
    
    // debugger
    return (
<<<<<<< HEAD
        <div id={styles.friends_wrapper} className={isDark ? styles.dark : styles.light}>
            <div className={styles.friends_header__div}>
=======
        <div id={styles.friends_wrapper}>
            <div className={styles.friends_header}>
>>>>>>> parent of c8ad10d... bug fixes and style fixes
                <h2 className={styles.friends_header}>Classmates</h2>
            </div>
            <div className={styles.accepted_wrapper}>
                <div className={styles.friends_header}>
                    <h2 className={`${styles.friends_header} ${styles.small_header}`}>Your List</h2>
                </div>
                <ul id={styles.friends_list}>
                {currentAccepted.length ? currentAccepted?.map(classmate => (
                    <div className={styles.classmate_container} key={classmate.id}>
                        <button onClick={() => removeFriend(classmate.id)} className={styles.remove_friend}><BsFillPersonDashFill/></button>
                        <li className={styles.accepted_li}>{classmate.username}</li>
                    </div>
                ))
                :
                    <div className={styles.empty_list}>
                        <p className={styles.inner_text}>You have no friends yet.</p>
                    </div>
                }
                </ul>
            </div>
        <div className={styles.pending_wrapper}>
            <div className={styles.friends_header}>
                <h2 className={`${styles.friends_header} ${styles.small_header}`}>Pending Requests</h2>
            </div>
<<<<<<< HEAD
            <div className={styles.classmate_wrapper}>
            {!currentPending ?
            <div className={styles.none}>
                <p className={styles.inner_text}>No pending requests.</p>
            </div>
            
            :
            currentPending.map(classmate => (
                <div className={styles.classmate_container} key={classmate.id}>
                    <button onClick={() => removeFriend(classmate.id)} className={styles.remove_friend}><BsFillPersonDashFill/></button>
                    <li className={styles.accepted_li}>{classmate.username}</li>
                </div>
            ))
            }
            </div>
=======
>>>>>>> parent of c8ad10d... bug fixes and style fixes
        </div>
        <div className={styles.incoming_wrapper}>
            <div className={styles.friends_header}>
                <h2 className={`${styles.friends_header} ${styles.small_header}`}>Incoming Requests</h2>
            </div>
<<<<<<< HEAD
            {!currentIncoming ?
            <div className={styles.none}>
                <p className={styles.inner_text}>No incoming requests.</p>
            </div>
            :
            null
            }
=======
>>>>>>> parent of c8ad10d... bug fixes and style fixes
        </div>
        <div className={styles.search_wrapper}>
            <div className={styles.friends_header}>
                <h1 className={`${styles.friends_header} ${styles.friends_search__header}`}>Find a Classmate</h1>
            </div>
             <Search setCurrentAccepted={setCurrentAccepted} setCurrentPending={setCurrentPending} setCurrentIncoming={setCurrentIncoming} currentAccepted={currentAccepted} />
        </div>
        </div>
    );
}

=======
import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import Search from './search'


import styles from '../../../css-modules/profile.module.css';

const Friends = ({isDark, accepted, incoming, pending}) => {
    // debugger
    const [ currentAccepted, setCurrentAccepted ] = React.useState(accepted);
    const [ currentIncoming, setCurrentIncoming ] = React.useState(incoming);
    const [ currentPending, setCurrentPending ] = React.useState(pending);
    
    React.useEffect(() => {
        setCurrentAccepted(accepted);
        setCurrentIncoming(incoming);
        setCurrentPending(pending);
    }, [accepted, incoming, pending])
    
    // debugger
    return (
        <div id={styles.friends_wrapper} className={isDark ? styles.dark : styles.light}>
            <div className={styles.friends_header}>
                <h2 className={styles.friends_header}>Classmates</h2>
            </div>
            <div className={styles.accepted_wrapper}>
                <div className={styles.friends_header}>
                    <h2 className={styles.friends_header}>Your List</h2>
                </div>
                {currentAccepted?.map(classmate => (
                    <div className={styles.classmate_container} key={classmate.id}>
                        <ul>
                            <li>{classmate.username}</li>
                        </ul>
                    </div>
                ))}
            </div>
        <div className={styles.pending_wrapper}>
            <div className={styles.friends_header}>
                <h2 className={styles.friends_header}>Pending Requests</h2>
            </div>
            {!currentPending ?
            <div>
                <p>No pending requests.</p>
            </div>
            :
            null
            }
        </div>
        <div className={styles.incoming_wrapper}>
            <div className={styles.friends_header}>
                <h2 className={styles.friends_header}>Incoming Requests</h2>
            </div>
            {!currentIncoming ?
            <div>
                <p>No incoming requests.</p>
            </div>
            :
            null
            }
        </div>
        <div className={styles.search_wrapper}>
            <div className={styles.friends_header}>
                <h1 className={styles.friends_header}>Find a Classmate</h1>
            </div>
             <Search currentAccepted={currentAccepted} />
        </div>
        </div>
    );
}

>>>>>>> parent of f1895e1... not finished, reverting main
export default Friends;