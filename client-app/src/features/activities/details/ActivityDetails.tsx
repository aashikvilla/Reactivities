import { observer } from 'mobx-react-lite';
import { useEffect } from 'react'
import { useParams } from 'react-router';
import { Grid } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store'
import ActivityDetailsChat from './ActivityDetailsChat';
import ActivityDetailsHeader from './ActivityDetailsHeader';
import ActivityDetailsInfo from './ActivityDetailsInfo';
import ActivityDetailsSideBar from './ActivityDetailsSideBar';


export default observer(function ActivityDetails() {
    const{activityStore}=useStore();
    const{selectedActivity:activity, loadActivity}=activityStore;
    const {id}=useParams();

    useEffect(() => {
      if(id){
          loadActivity(id);
      }      
    }, [id,loadActivity])


    if(!activity)
    return <LoadingComponent inverted={false} content={''} />;
    return (
       <Grid>
           <Grid.Column width={10}>
               <ActivityDetailsHeader activity={activity}/>
               <ActivityDetailsInfo activity={activity}/>
               <ActivityDetailsChat/>
            </Grid.Column>
            <Grid.Column width={6}>
               <ActivityDetailsSideBar/>
           </Grid.Column>
       </Grid>
        
    )
})
