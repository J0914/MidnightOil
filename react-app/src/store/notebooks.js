// constants
const SET_NOTEBOOKS = 'notebooks/SET_NOTEBOOKS';
const SET_NOTES = 'notebooks/SET_NOTES';

const setNotebooks = (notebooks) => ({
  type: SET_NOTEBOOKS,
  payload: notebooks
});

const setNotes = (notes) => ({
  type: SET_NOTES,
  payload: notes
});

// get all user notebooks
export const getNotebooks = (userId) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}/notebooks`)
  
  if (response.ok) {
    const notebooks = await response.json();
    if (notebooks.errors) {
      let errs = Object.values(notebooks.errors)
      return errs
    } else {
        dispatch(setNotebooks(notebooks.notebooks))
    }
    return null;
  } else {
    return ['response not okay, try again with better info']
  }
}

// create a new notebook
export const createNotebook = (userId, title) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}/notebooks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({title})
    })
    
    if (response.ok) {
      const notebooks = await response.json();
      if (notebooks.errors) {
        let errs = Object.values(notebooks.errors)
        return errs
      } else {
          dispatch(setNotebooks(notebooks.notebooks))
      }
      return null;
    } else {
      return ['response not okay, try again with better info']
    }
  }

// edit a notebook
export const editNotebook = (userId, notebookId, title) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}/notebooks/${notebookId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({title})
    })
    
    if (response.ok) {
      const notebooks = await response.json();
      if (notebooks.errors) {
        let errs = Object.values(notebooks.errors)
        return errs
      } else {
          dispatch(setNotebooks(notebooks.notebooks))
      }
      return null;
    } else {
      return ['response not okay, try again with better info']
    }
  }

// delete a notebook
export const deleteNotebook = (userId, notebookId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}/notebooks/${notebookId}`, {
        method: 'DELETE',
    })
    
    if (response.ok) {
      const notebooks = await response.json();
      if (notebooks.errors) {
        let errs = Object.values(notebooks.errors)
        return errs
    } else {
        dispatch(setNotebooks(notebooks.notebooks))
    }
      return null;
    } else {
      return ['response not okay, try again with better info']
    }
}

// get all all notes for current notebook
export const getNotes = (userId, notebookId) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}/notebooks/${notebookId}/notes`)
  
  if (response.ok) {
    const notes = await response.json();
    if (notes.errors) {
      let errs = Object.values(notes.errors)
      return errs
    } else {
        dispatch(setNotes(notes.notes))
    }
    return null;
  } else {
    return ['response not okay, try again with better info']
  }
}


// create a new note
export const createNote = (userId, notebookId, noteVals) => async (dispatch) => {
    
    const response = await fetch(`/api/users/${userId}/notebooks/${notebookId}/notes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(noteVals)
    })
    
    if (response.ok) {
        const notes = await response.json();
        if (notes.errors) {
          let errs = Object.values(notes.errors)
          return errs
        } else {
            dispatch(setNotes(notes.notes))
      }
      return null;
    } else {
        return ['response not okay, try again with better info']
    }
}

// edit a note
export const editNote = (userId, notebookId, noteId, noteVals) => async (dispatch) => {
    const {title, body, share} = noteVals;
    const response = await fetch(`/api/users/${userId}/notebooks/${notebookId}/notes/${noteId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(noteVals)
    })
    
    if (response.ok) {
      const notes = await response.json();
      if (notes.errors) {
        let errs = Object.values(notes.errors)
        return errs
        } else {
            dispatch(setNotes(notes.notes))
        }
        return null;
    } else {
        return ['response not okay, try again with better info']
    }
}

// delete a note
export const deleteNote = (userId, notebookId, noteId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}/notebooks/${notebookId}/notes/${noteId}`, {
        method: 'DELETE',
    })
    
    if (response.ok) {
        const notes = await response.json();
        if (notes.errors) {
          let errs = Object.values(notes.errors)
          return errs
        } else {
            dispatch(setNotes(notes.notes))
      }
      return null;
    } else {
        return ['response not okay, try again with better info']
    }
}

// window.store.dispatch(window.notebookActions.createNote(1, 1, {title: 'hello', body: 'omg it worked', share: false}));

const initialState = { notebooks: null, notes: null};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_NOTEBOOKS:
      return { ...state, notebooks: action.payload }
    case SET_NOTES:
        return { ...state, notes: action.payload }
    default:
      return state;
    }
}