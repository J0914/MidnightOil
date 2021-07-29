// constants
const SET_DECKS = 'decks/SET_DECKS';
const SET_CARDS = 'decks/SET_CARDS';
const SET_DECK_ERRORS = 'decks/SET_DECK_ERRORS';
const SET_CARD_ERRORS = 'decks/SET_CARD_ERRORS';

const setDecks = (decks) => ({
  type: SET_DECKS,
  payload: decks
});

const setCards = (cards) => ({
  type: SET_CARDS,
  payload: cards
});

const setDeckErrors = (deckErrors) => ({
    type: SET_DECK_ERRORS,
    payload: deckErrors
});

const setCardErrors = (cardErrors) => ({
    type: SET_CARD_ERRORS,
    payload: cardErrors
});

// get all user decks
export const getDecks = (userId) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}/decks`)
  
  if (response.ok) {
    const decks = await response.json();
    if (decks.errors) {
        dispatch(setDeckErrors(decks.errors))
    } else {
        dispatch(setDecks(decks.decks))
    }
    return null;
  } else {
    return ['response not okay, try again with better info']
  }
}

// create a new deck
export const createDeck = (userId, deckVals) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}/decks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(deckVals)
    })
    
    if (response.ok) {
      const decks = await response.json();
      if (decks.errors) {
        dispatch(setDeckErrors(decks.errors))
      } else {
          dispatch(setDecks(decks.decks))
      }
      return null;
    } else {
      return ['response not okay, try again with better info']
    }
  }

// edit a deck
export const editDeck = (userId, deckId, deckVals) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}/decks/${deckId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(deckVals)
    })
    
    if (response.ok) {
      const decks = await response.json();
      if (decks.errors) {
        dispatch(setDeckErrors(decks.errors))
      } else {
          dispatch(setDecks(decks.decks))
      }
      return null;
    } else {
      return ['response not okay, try again with better info']
    }
  }

// delete a deck
export const deleteDeck = (userId, deckId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}/decks/${deckId}`, {
        method: 'DELETE',
    })
    
    if (response.ok) {
      const decks = await response.json();
      if (decks.errors) {
        dispatch(setDeckErrors(decks.errors));
    } else {
        dispatch(setDecks(decks.decks))
    }
      return null;
    } else {
      return ['response not okay, try again with better info']
    }
}

// get all cards for current deck
export const getCards = (userId, deckId) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}/decks/${deckId}/cards`)
  
  if (response.ok) {
    const cards = await response.json();
    if (cards.errors) {
        dispatch(setCardErrors(cards.errors));
    } else {
        dispatch(setCards(cards.cards))
    }
    return null;
  } else {
    return ['response not okay, try again with better info']
  }
}


// create a new card
export const createCard = (userId, deckId, cardVals) => async (dispatch) => {
    
    const response = await fetch(`/api/users/${userId}/decks/${deckId}/notes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(cardVals)
    })
    
    if (response.ok) {
        const cards = await response.json();
        if (cards.errors) {
            dispatch(setCardErrors(cards.errors));
        } else {
            dispatch(setCards(cards.cards))
      }
      return null;
    } else {
        return ['response not okay, try again with better info']
    }
}

// edit a card
export const editCard = (userId, deckId, cardId, cardVals) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}/decks/${deckId}/cards/${cardId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(cardVals)
    })
    
    if (response.ok) {
      const cards = await response.json();
      if (cards.errors) {
          dispatch(setCardErrors(cards.errors));
        } else {
            dispatch(setCards(cards.cards))
        }
        return null;
    } else {
        return ['response not okay, try again with better info']
    }
}

// delete a card
export const deleteCard = (userId, deckId, cardId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}/decks/${deckId}/cards/${cardId}`, {
        method: 'DELETE',
    })
    
    if (response.ok) {
        const cards = await response.json();
        if (cards.errors) {
            dispatch(setCardErrors(cards.errors));
        } else {
            dispatch(setCards(cards.cards))
      }
      return null;
    } else {
        return ['response not okay, try again with better info']
    }
}

// window.store.dispatch(window.deckActions.createDeck(1, {title: 'hello', share: false}));

const initialState = { decks: null, deckErrors: null, cards: null, cardErrors: null};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_DECKS:
      return { ...state, decks: action.payload, deckErrors: null }
    case SET_CARDS:
        return { ...state, cards: action.payload, cardErrors: null }
    case SET_DECK_ERRORS:
        return { ...state, deckErrors: action.payload }
    case SET_CARD_ERRORS:
        return { ...state, cardErrors: action.payload }
    default:
      return state;
    }
}