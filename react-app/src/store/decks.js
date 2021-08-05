// constants
const SET_DECKS = 'decks/SET_DECKS';
const SET_DECK = 'decks/SET_DECK';
const SET_CARDS = 'decks/SET_CARDS';


const setDecks = (decks) => ({
  type: SET_DECKS,
  payload: decks
});

const setDeck = (deck) => ({
  type: SET_DECK,
  payload: deck
});

const setCards = (cards) => ({
  type: SET_CARDS,
  payload: cards
});

// get all user decks
export const getDecks = (userId) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}/decks`)
  
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      let errs = Object.values(data.errors)
      return errs
    } else {
      const decks = Object.assign({}, data.decks)
        dispatch(setDecks(decks))
    }
    return (data.deck);
  } else {
    return ['response not okay, try again with better info']
  }
}
// get current deck
export const getDeck = (userId, deckId) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}/decks/${deckId}`)
  
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      let errs = Object.values(data.errors)
      return errs
    } else {
      const deck = (data.deck)
        dispatch(setDeck(deck))
    }
    return (data.deck);
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
      const data = await response.json();
      if (data.errors) {
        let errs = Object.values(data.errors)
        return errs
      } else {
          dispatch(setDecks(data.decks))
          dispatch(setDeck(data.deck))
      }
      return data.deck;
    } else {
      return response.errors
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
        let errs = Object.values(decks.errors)
        return errs
      } else {
          dispatch(setDecks(decks.decks));
          dispatch(setDeck(decks.deck));
      }
      return decks.deck;
    } else {
      return response.errors
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
        let errs = Object.values(decks.errors)
        return errs
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
    const data = await response.json();
    if (data.errors) {
      let errs = Object.values(data.errors)
      return errs
    } else {
        dispatch(setCards(data.cards))
    }
    return data.cards;
  } else {
    return ['response not okay, try again with better info']
  }
}


// create a new card
export const createCard = (userId, deckId, cardVals) => async (dispatch) => {
    
    const response = await fetch(`/api/users/${userId}/decks/${deckId}/cards`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(cardVals)
    })
    
    if (response.ok) {
        const cards = await response.json();
        if (cards.errors) {
          let errs = Object.values(cards.errors)
          return errs
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
        let errs = Object.values(cards.errors)
        return errs
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
          let errs = Object.values(cards.errors)
          return errs
        } else {
            dispatch(setCards(cards.cards))
      }
      return null;
    } else {
        return ['response not okay, try again with better info']
    }
}

// window.store.dispatch(window.deckActions.createDeck(1, {title: 'hello', share: false}));

const initialState = { decks: null, currentDeck: null, cards: null };

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_DECKS:
        return { ...state, decks: action.payload }
        case SET_DECK:
        return { ...state, currentDeck: action.payload }
        case SET_CARDS:
            return { ...state, cards: action.payload }
        default:
        return state;
    }
}