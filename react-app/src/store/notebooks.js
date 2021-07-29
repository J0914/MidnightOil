// constants
const SET_NOTEBOOKS = 'notebooks/SET_NOTEBOOKS';
const SET_NOTES = 'notebooks/SET_NOTES';
const SET_NOTE_ERRORS = 'notebooks/SET_NOTE_ERRORS';
const SET_NOTEBOOK_ERRORS = 'notebooks/SET_NOTEBOOK_ERRORS';

const setNotebooks = (notebooks) => ({
  type: SET_NOTEBOOKS,
  payload: notebooks
});

const setNotes = (notes) => ({
  type: SET_NOTES,
  payload: notes
});

const setNoteErrors = (noteErrors) => ({
    type: SET_NOTE_ERRORS,
    payload: noteErrors
});

const setNotebookErrors = (notebookErrors) => ({
    type: SET_NOTEBOOK_ERRORS,
    payload: notebookErrors
});

// get all user notebooks
export const getNotebooks = (userId) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}/notebooks`)
  
  if (response.ok) {
    const notebooks = await response.json();
    if (notebooks.errors) {
        dispatch(setNotebookErrors(notebooks.errors))
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
        dispatch(setNotebookErrors(notebooks.errors))
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
        dispatch(setNotebookErrors(notebooks.errors))
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
        dispatch(setNotebookErrors(notebooks.errors));
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
        dispatch(setNoteErrors(notes.errors));
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
            dispatch(setNoteErrors(notes.errors));
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
          dispatch(setNoteErrors(notes.errors));
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
            dispatch(setNoteErrors(notes.errors));
        } else {
            dispatch(setNotes(notes.notes))
      }
      return null;
    } else {
        return ['response not okay, try again with better info']
    }
}

// window.store.dispatch(window.notebookActions.createNote(1, 1, {title: 'hello', body: 'omg it worked', share: false}));

const initialState = { notebooks: null, notebookErrors: null, notes: null, noteErrors: null};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_NOTEBOOKS:
      return { ...state, notebooks: action.payload, notebookErrors: null }
    case SET_NOTES:
        return { ...state, notes: action.payload, noteErrors: null }
    case SET_NOTEBOOK_ERRORS:
        return { ...state, notebookErrors: action.payload }
    case SET_NOTE_ERRORS:
        return { ...state, noteErrors: action.payload }
    default:
      return state;
    }
}