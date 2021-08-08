import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProtectedRoute from './components/auth/ProtectedRoute';
import NavBar from './components/NavBar';
import Splash from './components/Splash';
import ProfilePage from './components/ProfilePage';
import NotePage from './components/NotePage';
import DeckPage from './components/DeckPage';
import Footer from './components/Footer'
import NotFoundPage from './components/NotFoundPage'
import { authenticate } from './store/session';
import { getClassmates } from './store/classmates';
import { getNotebooks } from './store/notebooks';
import { getDecks } from './store/decks';


function App() {

  const [loaded, setLoaded] = useState(false);
  const [forceRefresh, setForceRefresh] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      const user = await dispatch(authenticate());

      setLoaded(true);
    })();
  }, [dispatch]);

  useEffect(() => {
    if (loaded) setForceRefresh(!forceRefresh);
  }, [loaded])

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
        <Route path="*" >
          <NotFoundPage />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
