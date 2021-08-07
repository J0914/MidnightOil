import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProtectedRoute from './components/auth/ProtectedRoute';
import NavBar from './components/NavBar';
import Splash from './components/Splash';
import ProfilePage from './components/ProfilePage';
import NotePage from './components/NotePage';
import DeckPage from './components/DeckPage';
import Footer from './components/Footer'
import { authenticate } from './store/session';
import { getClassmates } from './store/classmates';
import { getNotebooks } from './store/notebooks';
import { getDecks } from './store/decks';


function App() {
  const theuser = useSelector(state => state.session.user);

  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      const data = await dispatch(authenticate());
      if (data) {
        await dispatch(getClassmates(data.id));
        await dispatch(getNotebooks(data.id));
        await dispatch(getDecks(data.id));
        await dispatch(getClassmates(data.id)) 
      }
      setLoaded(true);
    })();
  }, [dispatch, user]);

  useEffect(() => {
    setUser(theuser)
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <ProtectedRoute path='/profile' exact={true} >
          <ProfilePage />
        </ProtectedRoute>
        <ProtectedRoute path='/notebooks/:notebookId/notes/:noteId' exact={true} >
          <NotePage loaded={loaded} />
        </ProtectedRoute>
        <ProtectedRoute path='/decks/:deckId' exact={true} >
          <DeckPage />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <Splash />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
