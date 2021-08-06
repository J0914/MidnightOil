// constants
const SET_NOTEBOOKS = 'notebooks/SET_NOTEBOOKS';
const SET_NOTEBOOK = 'notebooks/SET_NOTEBOOK';
const SET_NOTES = 'notebooks/SET_NOTES';
const SET_NOTE = 'notebooks/SET_NOTE'

const setNotebooks = (notebooks) => ({
  type: SET_NOTEBOOKS,
  payload: notebooks
});

const setNotebook = (notebook) => ({
  type: SET_NOTEBOOK,
  payload: notebook
});

const setNotes = (notes) => ({
  type: SET_NOTES,
  payload: notes
});

const setNote = (note) => ({
  type: SET_NOTE,
  payload: note
})

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

// get current user notebook
export const getNotebook = (userId, notebookId) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}/notebooks/${notebookId}`)
  
  if (response.ok) {
    const notebook = await response.json();
    if (notebook.errors) {
      let errs = Object.values(notebook.errors)
      return errs
    } else {
        dispatch(setNotebook(notebook.notebook))
        dispatch(setNotes(notebook.notes))
    }
    return notebook;
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
      return notebooks.notebook;
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

// get current note
export const getNote = (userId, notebookId, noteId) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}/notebooks/${notebookId}/notes/${noteId}`)
  
  if (response.ok) {
    const note = await response.json();
    if (note.errors) {
      let errs = Object.values(note.errors)
      return errs
    } else {
        dispatch(setNote(note))
    }
    return note;
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
        const data = await response.json();
        if (data.errors) {
          let errs = Object.values(data.errors)
          return {errors: errs}
        } else {
            dispatch(setNotebooks(data.notebooks))
            dispatch(setNotes(data.notes))
            dispatch(setNote(data.note))
            return(data.note)
      }
    } else {
        return ['response not okay, try again with better info']
    }
}

// edit a note
export const editNote = (userId, notebookId, noteId, noteVals) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}/notebooks/${notebookId}/notes/${noteId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(noteVals)
    })
    
    if (response.ok) {
      const data = await response.json();
      if (data.errors) {
        let errs = Object.values(data.errors)
        return {errors: errs}
      } else {
          dispatch(setNotebooks(data.notebooks))
          dispatch(setNotes(data.notes))
          dispatch(setNote(data.note))
          return data.note
      }
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
        const data = await response.json();
        if (data.errors) {
          let errs = Object.values(data.errors)
          return {errors: errs}
        } else {
          dispatch(setNotebooks(data.notebooks))
          dispatch(setNotes(data.notes))
          const noteArr = Object.values(data.notes)
          const note = noteArr[noteArr.length - 1]
          dispatch(setNote(note))
          return(note)
      }
    } else {
        return ['response not okay, try again with better info']
    }
}

// window.store.dispatch(window.notebookActions.createNote(1, 1, {title: 'hello', body: 'omg it worked', share: false}));

const initialState = { notebooks: null, notes: null, currentNotebook: null, currentNote: null};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_NOTEBOOKS:
      return { ...state, notebooks: action.payload }
    case SET_NOTEBOOK:
      return { ...state, currentNotebook: action.payload }
    case SET_NOTES:
        return { ...state, notes: action.payload }
    case SET_NOTE:
        return { ...state, currentNote: action.payload }
    default:
      return state;
    }
}