// constants
const SET_USER = 'session/SET_USER';
const SET_USERS = 'session/SET_USERS';
const REMOVE_USER = 'session/REMOVE_USER';

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const setUsers = (users) => ({
  type: SET_USERS,
  payload: users
});

const removeUser = () => ({
  type: REMOVE_USER,
})

export const getUsers = () => async (dispatch) => {
  const response = await fetch('/api/users/')
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }
    
    dispatch(setUsers(data.users));
    return data
  }
}

export const authenticate = () => async (dispatch) => {
  const response = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }
    
    dispatch(setUser(data));
    return data
  }
}

export const login = (email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });
  
  
  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
  
}

export const logout = () => async (dispatch) => {
  const response = await fetch('/api/auth/logout', {
    headers: {
      'Content-Type': 'application/json',
    }
  });
  
  if (response.ok) {
    dispatch(removeUser());
  }
};


export const signUp = (username, fName, lName, email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      fName,
      lName,
      email,
      password,
    }),
  });
  
  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}


// try this again without the thunk, maybe that's what's breaking it.

// export const getQuote = () => async (dispatch) => {
//   const response = await fetch('https://zenquotes.io/api/today')
//   if (response.ok) {
//     const data = await response.json();
//     // dispatch(setQuote())
//   }
// }

const initialState = { user: null, allUsers: null };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload }
    case SET_USERS:
      return { ...state, allUsers: action.payload }
      case REMOVE_USER:
        return { user: null }
    default:
      return state;
    }
  }
  