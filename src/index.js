import React from 'react';
import { render } from 'react-dom';
import firebase from 'firebase/app';
import 'firebase/database';

import App from './App';

firebase.initializeApp({
  apiKey: 'AIzaSyDwEQX-tKqE9wBTXSOo931ODnF2gqI076E ',
  authDomain: 'pushtotalk-413d4.firebaseapp.com',
  databaseURL: 'https://pushtotalk-413d4.firebaseio.com',
});

render(<App />, document.getElementById('root'));
