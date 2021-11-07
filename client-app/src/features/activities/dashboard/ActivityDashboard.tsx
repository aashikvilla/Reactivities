import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Grid} from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

function ActivityDashboard(){
        const {activityStore}=useStore();
     
      
 const {  loadingInitial}=activityStore;
 const {loadActivities,activityRegistry,setLoadingInitial}=activityStore;

  useEffect(()=>{
    activityRegistry.size<=1?activityStore.loadActivities():setLoadingInitial(false);      
  },[activityRegistry.size]);

  if(loadingInitial){
    return <LoadingComponent content={'Loading ...'} inverted={true}/>
  }

   
    return(
        <>
        <Grid>
            <Grid.Column width='14'>         
                <ActivityList />
            </Grid.Column>
        </Grid>
        </>
    )
}

export default observer(ActivityDashboard);