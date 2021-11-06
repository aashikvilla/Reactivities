import React, { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
 const {activityStore}=useStore();
 const {  loadingInitial}=activityStore;

  useEffect(()=>{
    activityStore.loadActivities();      
  },[activityStore]);

  if(loadingInitial){
    return <LoadingComponent content={'Loading ...'} inverted={true}/>
  }

  return (
    <>
      <NavBar />
      <Container style={{marginTop:'5rem'}}>       
        <ActivityDashboard />
      </Container>     
    </>
  );
}

export default observer(App);
