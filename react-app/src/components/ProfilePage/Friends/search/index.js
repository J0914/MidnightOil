import React from 'react';
import { useSelector } from 'react-redux'
import {BsFillPersonPlusFill, BsFillPersonDashFill, BsFillPersonCheckFill} from 'react-icons/bs'

import styles from '../../../../css-modules/search.module.css'

const Search = (currentAccepted) => {
    const users = useSelector(state => state.session.allUsers);

    const [ currentUsers, setCurrentUsers ] = React.useState(null)
    const [ searchText, setSearchText ] = React.useState('')
    const [ searchResults, setSearchResults ] = React.useState(null)

    const handleSearch = (e) => {
        setSearchText(e.target.value)

        if (e.target.value.length > 0) {
            setSearchResults(users.filter(user => user.username.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1))
        } else {
            setSearchResults(null)
        }
    }

    const sendFriendRequest = () => {
        return null;
    }

    React.useEffect(() => {
        setCurrentUsers(users)
    }, [users])

    console.log(currentAccepted)

    return (
        <div className={styles.search_wrapper}>
            <input className={styles.search_input} type="text" value={searchText} onChange={handleSearch} placeholder="Search for a user" />
            <div className={styles.search_results}>
            {searchResults && searchResults.length > 0 &&
                <ul className={styles.search_ul}>
                {searchResults.map(user =>
                    <li className={styles.search_result} key={user.id}>
                        {currentAccepted.currentAccepted.filter(friend => friend.username === user.username).length > 0 ?
                            <button className={styles.search_btns} ><BsFillPersonCheckFill /></button>
                        :
                            <button className={styles.search_btns} onClick={sendFriendRequest}><BsFillPersonPlusFill /></button>
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