import React from 'react';
import ReactDOM from 'react-dom';
import './app/layout/style.css';
import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';
import 'semantic-ui-css/semantic.min.css'
import { store, StoreContext } from './app/stores/store';
import { Router } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css'
import 'react-toastify/dist/ReactToastify.min.css'
import{createBrowserHistory } from 'history';
import { unstable_HistoryRouter as HistoryRouter ,useNavigate  ,useLocation} from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css'


export const history =createBrowserHistory();


ReactDOM.render(
  <StoreContext.Provider value={store}>
    <HistoryRouter history={history}>    
     <App />
    </HistoryRouter>
  </StoreContext.Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
