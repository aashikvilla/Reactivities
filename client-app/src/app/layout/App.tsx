import React from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import HomePage from '../../features/home/HomePage';
import { Route, Routes, useLocation,Router, } from 'react-router-dom';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import TestErrors from '../../features/errors/TestError';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/NotFound';
import {createBrowserHistory} from 'history'
import LoginForm from '../../features/users/LoginForm';
import RegisterForm from '../../features/users/RegisterForm';

export const history= createBrowserHistory();



function App() {
  const location =useLocation();
 
  return (
    <>
    
    <ToastContainer position='top-center' />
    
     <Routes>
      <Route path='/' element={<HomePage />} />
       <Route path={`/*`} element={
       <>
          <NavBar />
          <Container style={{ marginTop: '7em' }}>
            <Routes>              
                <Route path='/activities' element={<ActivityDashboard />} />
                <Route path='/activities/:id' element={<ActivityDetails />} />
                <Route key={location.key} path='/manage/:id' element={<ActivityForm />} />
                <Route key={location.key} path='/CreateActivity' element={<ActivityForm />} />
                <Route path='/errors' element={<TestErrors />} />
                <Route path='/login' element={<LoginForm />} />
                <Route path='/register' element={<RegisterForm />} />
                <Route path="*" element={<NotFound/>}/>
              </Routes>
          </Container>
        </>
      }/>


      </Routes>
     
    </>
  );
}

export default observer(App);
