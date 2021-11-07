import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react'
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import { Button, ButtonGroup, Card } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store'


export default observer(function ActivityDetails() {
    const{activityStore}=useStore();
    const{selectedActivity:activity, loading, loadActivity}=activityStore;
    const {id}=useParams();

    useEffect(() => {
      if(id){
          loadActivity(id);
      }      
    }, [id,loadActivity])


    if(!activity)
    return <LoadingComponent inverted={false} content={''} />;
    return (
        
        <Card fluid>
            <img src={`/assets/categoryImages/${activity.category}.jpg`} alt={activity.category} />
            <Card.Content>
            <Card.Header>{activity.title}</Card.Header>
            <Card.Meta>
                <span >{activity.date}</span>
            </Card.Meta>
            <Card.Description>
               {activity.description}
            </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <ButtonGroup widths='2'>
                    <Button basic color='blue' content='Edit' as={NavLink} to={`/manage/${activity.id}`}/>
                    <Button loader={loading} basic color='grey' content='Cancel' />
                </ButtonGroup>
            
            </Card.Content>
        </Card>
        
    )
})
