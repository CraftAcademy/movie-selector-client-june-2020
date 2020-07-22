import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from "axios"
import './index.css'
import { StripeProvider } from "react-stripe-elements"

let apiUrl
if (process.env.NODE_ENV === 'production' )  {
  apiUrl = 'https://movie-selector-api.herokuapp.com/api/v1'
} else {
  apiUrl = 'http://localhost:3000/api/v1'
}
axios.defaults.baseURL = apiUrl

ReactDOM.render(
  <StripeProvider apiKey="pk_test_QicERB8w3kyqaYW3hUUQylRH">
    <App />
  </StripeProvider >,
  document.getElementById('root') 
);

serviceWorker.unregister();