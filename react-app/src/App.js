import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ProtectedRoute from './components/auth/ProtectedRoute';
import NavBar from './components/NavBar';
import Splash from './components/Splash';
import ProfilePage from './components/ProfilePage';
import NotePage from './components/NotePage';
import DeckPage from './components/DeckPage';
import Footer from './components/Footer'
import NotFoundPage from './components/NotFoundPage'
import { authenticate } from './store/session';


function App() {

  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

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
