<<<<<<< HEAD
// constants
const SET_ACCEPTED = 'classmates/SET_ACCEPTED';
const SET_PENDING = 'classmates/SET_PENDING';
const SET_INCOMING = 'classmates/SET_INCOMING';
const SET_ACCEPTED_DETAIL = 'classmates/SET_ACCEPTED_DETAIL';
const SET_PENDING_DETAIL = 'classmates/SET_PENDING_DETAIL';
const SET_INCOMING_DETAIL = 'classmates/SET_INCOMING_DETAIL';


const setAccepted = (accepted) => ({
  type: SET_ACCEPTED,
  payload: accepted
});

const setPending = (pending) => ({
  type: SET_PENDING,
  payload: pending
});

const setIncoming = (incoming) => ({
  type: SET_INCOMING,
  payload: incoming
});

const setAcceptedDetail = (acceptedDetail) => ({
  type: SET_ACCEPTED_DETAIL,
  payload: acceptedDetail
});

const setPendingDetail = (pendingDetail) => ({
  type: SET_PENDING_DETAIL,
  payload: pendingDetail
});

const setIncomingDetail = (incomingDetail) => ({
  type: SET_INCOMING_DETAIL,
  payload: incomingDetail
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
        
        const accepted = {};
        const incoming= {};
        const pending = {};

        classmates.classmates.forEach(classmate => {
            if (classmate.accepted === true) {
                accepted[classmate.user2] = classmate;
            }
            else if (classmate.requestor === false && classmate.accepted === false) {
                incoming[classmate.user2] = classmate;
            }
            else if (classmate.accepted === false) {
                pending[classmate.user2] = classmate;
            }
        })

        const acceptedDetails = [];
        const pendingDetails = [];
        const incomingDetails = [];

        if (Object.keys(accepted).length > 0) {
            dispatch(setAccepted(accepted));   
            Object.values(accepted).forEach(async relationship => {
                await dispatch(getClassmate(relationship.user2))
                .then(res => acceptedDetails.push(res)) 
            })
            dispatch(setAcceptedDetail(acceptedDetails));
        }

        if (Object.keys(incoming).length > 0) {
            dispatch(setIncoming(incoming));
            Object.values(incoming).forEach(async relationship => {
                await dispatch(getClassmate(relationship.user2))
                .then(res => incomingDetails.push(res)) 
            })
            dispatch(setIncomingDetail(incomingDetails));
        }
        
        if (Object.keys(pending).length > 0) {
            dispatch(setPending(pending));
            Object.values(pending).forEach(async relationship => {
                await dispatch(getClassmate(relationship.user2))
                .then(res => pendingDetails.push(res)) 
            })
            dispatch(setPendingDetail(pendingDetails));
        }


        return {accepted, pending, incoming};
    }

  } else {
    return ['response not okay, try again with better info']
  }
}

export const getClassmate = (classmateId) => async (dispatch) => {
    const response = await fetch(`/api/users/classmates/${classmateId}`);
    if (response.ok) {
        const classmate = await response.json();
        return classmate
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
            
            const accepted = {};
            const incoming= {};
            const pending = {};

            classmates.classmates.forEach(classmate => {
                if (classmate.accepted === true) {
                    accepted[classmate.user2] = classmate;
                }
                else if (classmate.requestor === false && classmate.accepted === false) {
                    incoming[classmate.user2] = classmate;
                }
                else if (classmate.accepted === false) {
                    pending[classmate.user2] = classmate;
                }
            })

            const acceptedDetails = [];
            const pendingDetails = [];
            const incomingDetails = [];

            if (Object.keys(accepted).length > 0) {
                dispatch(setAccepted(accepted));   
                Object.values(accepted).forEach(async relationship => {
                    await dispatch(getClassmate(relationship.user2))
                    .then(res => acceptedDetails.push(res)) 
                })
                dispatch(setAcceptedDetail(acceptedDetails));
            }

            if (Object.keys(incoming).length > 0) {
                dispatch(setIncoming(incoming));
                Object.values(incoming).forEach(async relationship => {
                    await dispatch(getClassmate(relationship.user2))
                    .then(res => incomingDetails.push(res)) 
                })
                dispatch(setIncomingDetail(incomingDetails));
            }
            
            if (Object.keys(pending).length > 0) {
                dispatch(setPending(pending));
                Object.values(pending).forEach(async relationship => {
                    await dispatch(getClassmate(relationship.user2))
                    .then(res => pendingDetails.push(res)) 
                })
                dispatch(setPendingDetail(pendingDetails));
            }


            return {accepted, pending, incoming};
        }
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
            const accepted = {};
            const incoming= {};
            const pending = {};

            classmates.classmates.forEach(classmate => {
                if (classmate.accepted === true) {
                    accepted[classmate.user2] = classmate;
                }
                else if (classmate.requestor === false && classmate.accepted === false) {
                    incoming[classmate.user2] = classmate;
                }
                else if (classmate.accepted === false) {
                    pending[classmate.user2] = classmate;
                }
            })

            const acceptedDetails = [];
            const pendingDetails = [];
            const incomingDetails = [];

            if (Object.keys(accepted).length > 0) {
                dispatch(setAccepted(accepted));   
                Object.values(accepted).forEach(async relationship => {
                    await dispatch(getClassmate(relationship.user2))
                    .then(res => acceptedDetails.push(res)) 
                })
                dispatch(setAcceptedDetail(acceptedDetails));
            }

            if (Object.keys(incoming).length > 0) {
                dispatch(setIncoming(incoming));
                Object.values(incoming).forEach(async relationship => {
                    await dispatch(getClassmate(relationship.user2))
                    .then(res => incomingDetails.push(res)) 
                })
                dispatch(setIncomingDetail(incomingDetails));
            }
            
            if (Object.keys(pending).length > 0) {
                dispatch(setPending(pending));
                Object.values(pending).forEach(async relationship => {
                    await dispatch(getClassmate(relationship.user2))
                    .then(res => pendingDetails.push(res)) 
                })
                dispatch(setPendingDetail(pendingDetails));
            }


            return {accepted, pending, incoming};
        }
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
            const accepted = {};
            const incoming= {};
            const pending = {};

            classmates.classmates.forEach(classmate => {
                if (classmate.accepted === true) {
                    accepted[classmate.user2] = classmate;
                }
                else if (classmate.requestor === false && classmate.accepted === false) {
                    incoming[classmate.user2] = classmate;
                }
                else if (classmate.accepted === false) {
                    pending[classmate.user2] = classmate;
                }
            })

            const acceptedDetails = [];
            const pendingDetails = [];
            const incomingDetails = [];

            if (Object.keys(accepted).length > 0) {
                dispatch(setAccepted(accepted));   
                Object.values(accepted).forEach(async relationship => {
                    await dispatch(getClassmate(relationship.user2))
                    .then(res => acceptedDetails.push(res)) 
                })
                dispatch(setAcceptedDetail(acceptedDetails));
            }

            if (Object.keys(incoming).length > 0) {
                dispatch(setIncoming(incoming));
                Object.values(incoming).forEach(async relationship => {
                    await dispatch(getClassmate(relationship.user2))
                    .then(res => incomingDetails.push(res)) 
                })
                dispatch(setIncomingDetail(incomingDetails));
            }
            
            if (Object.keys(pending).length > 0) {
                dispatch(setPending(pending));
                Object.values(pending).forEach(async relationship => {
                    await dispatch(getClassmate(relationship.user2))
                    .then(res => pendingDetails.push(res)) 
                })
                dispatch(setPendingDetail(pendingDetails));
            }


            return {accepted, pending, incoming};
        }
    } else {
        return ['response not okay, try again with better info']
    }
}

// window.store.dispatch(window.classmateActions.getClassmates(1));

const initialState = { accepted: null, pending: null, incoming: null, acceptedDetail: [], pendingDetail: null, incomingDetail: null };

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_ACCEPTED:
            return { ...state, accepted: action.payload }
        case SET_PENDING:
            return { ...state, pending: action.payload }
        case SET_INCOMING:
            return { ...state, incoming: action.payload }
        case SET_ACCEPTED_DETAIL:
            return { ...state, acceptedDetail: action.payload }
        case SET_PENDING_DETAIL:
            return { ...state, pendingDetail: action.payload }
        case SET_INCOMING_DETAIL:
            return { ...state, incomingDetail: action.payload }
        default:
        return state;
    }
=======
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
>>>>>>> parent of 5c88887... basic setup for profile page and classmates
}