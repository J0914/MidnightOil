// constants
const SET_CLASSMATES = 'classmates/SET_CLASSMATES';


const setClassmates = (classmates) => ({
  type: SET_CLASSMATES,
  payload: classmates
});

// get all classmates for current user
export const getClassmates = (userId) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}/classmates`)
  
  if (response.ok) {
    const classmates = await response.json();
    if (classmates.errors) {
        let errs = Object.values(classmates.errors)
        return errs
    } else {
        dispatch(setClassmates(classmates.classmates))
    }
    return null;
  } else {
    return ['response not okay, try again with better info']
  }
}

// send a friend request
export const sendFriendRequest = (userId, classmateId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}/classmates/${classmateId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            type: 'friend_request'
        })
    })
    if (response.ok) {
        const classmates = await response.json();
        if (classmates.errors) {
            let errs = Object.values(classmates.errors)
            return errs
        } else {
            dispatch(setClassmates(classmates.classmates))
        }
        return null;
    } else {
        return ['response not okay, try again with better info']
    }
}

// accept or deny a friend request
export const acceptOrDenyClassmate = (userId, classmateId, acceptVal) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}/classmates/${classmateId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(acceptVal)
    })
    const classmates = await response.json();
    if (response.ok) {
        if (classmates.errors) {
            let errs = Object.values(classmates.errors)
            return errs
        } else {
            dispatch(setClassmates(classmates.classmates))
        }
        return null;
    } else {
        return ['response not okay, try again with better info']
    }
}

// delete a classmate from list
export const removeClassmate = (userId, classmateId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}/classmates/${classmateId}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        const classmates = await response.json();
        if (classmates.errors) {
            let errs = Object.values(classmates.errors)
            return errs
        } else {
            dispatch(setClassmates(classmates.classmates))
        }
        return null;
    } else {
        return ['response not okay, try again with better info']
    }
}

// window.store.dispatch(window.classmateActions.getClassmates(1));

const initialState = { classmates: null };

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_CLASSMATES:
            return { ...state, classmates: action.payload }
        default:
        return state;
    }
}