import React, { useEffect, useState } from 'react';

import './App.css';
import axios from 'axios';
import {Header, List, ListItem} from 'semantic-ui-react';

function App() {

  const [activities, setactivities] = useState([]);

  useEffect(()=>{
    axios.get('http://localhost:5000/api/activities').then(res=>{
      console.log('activities',res);
      setactivities(res.data);
      console.log("data",activities);
    });
  },[]);

  return (
    <div>
      <Header as='h2' icon='users' content='Reactivities'/>
     
        <List>
        
          {activities.map((activity:any)=>     
          (
            <ListItem key={activity.id}>{activity.title}</ListItem>
          )
            )}
          
        </List>
     
    </div>
  );
}

export default App;
