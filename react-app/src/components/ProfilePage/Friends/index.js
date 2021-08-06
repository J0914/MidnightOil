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

export default Friends;