import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import * as notebookActions from './store/notebooks'
import * as deckActions from './store/decks'
import * as classmateActions from './store/classmates'

const store = configureStore();
if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.notebookActions = notebookActions;
  window.deckActions = deckActions;
  window.classmateActions = classmateActions
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <App />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
