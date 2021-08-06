import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {BsFillPersonPlusFill, BsFillPersonCheckFill} from 'react-icons/bs'
import {sendFriendRequest} from '../../../../store/classmates'

import styles from '../../../../css-modules/search.module.css'

const Search = (currentAccepted, setCurrentAccepted, setCurrentPending, setCurrentIncoming) => {
    const users = useSelector(state => state.session.allUsers);
    const userId = useSelector(state => state.session.user?.id);

    const [ currentUsers, setCurrentUsers ] = React.useState(null)
    const [ searchText, setSearchText ] = React.useState('')
    const [ searchResults, setSearchResults ] = React.useState(null)
    const [ errors, setErrors ] = React.useState([])

    const dispatch = useDispatch();

    const handleSearch = (e) => {
        setSearchText(e.target.value)

        if (e.target.value.length > 0) {
            setSearchResults(users?.filter(user => user.username.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1))
        } else {
            setSearchResults(null)
        }
    }

    const sendRequest = async (classmateId) => {
        const data = await dispatch(sendFriendRequest(userId, classmateId))
        if (Array.isArray(data)) {
            setErrors(data)
        } else {
            if(data.accepted) {
                setCurrentAccepted(data.accepted)
            } else if (data.pending) {
                setCurrentPending(data.pending)
            } else if (data.incoming) {
                setCurrentIncoming(data.incoming)
            }
        }
        return;
    }

    React.useEffect(() => {
        setCurrentUsers(users)
    }, [users])

    return (
        <div className={styles.search_wrapper}>
            {errors.map((error, ind) => (
            <li className={styles.error} key={ind}>{error}</li>
            ))}
            <input className={styles.search_input} type="text" value={searchText} onChange={handleSearch} placeholder="Search for a username" />
            <div className={styles.search_results}>
            {searchResults && searchResults.length > 0 &&
                <ul className={styles.search_ul}>
                {searchResults.map(user =>
                    <li className={styles.search_result} key={user.id}>
                        {currentAccepted.currentAccepted?.filter(friend => friend.username === user.username).length > 0 ?
                            <button onClick={() => setErrors(['This person is on your list!'])} className={styles.search_btns} ><BsFillPersonCheckFill /></button>
                        :
                            <button className={styles.search_btns} onClick={() => sendRequest(user.id)}><BsFillPersonPlusFill /></button>
                        }
                        <p className={styles.username} >{user.username}</p>
                    </li>
                )}
                </ul>
            }
            </div>
        </div>
    );
}

export default Search;