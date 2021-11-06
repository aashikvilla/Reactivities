import { observer } from 'mobx-react-lite';
import React from 'react'
import { Button, ButtonGroup, Card } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store'

function ActivityDetails() {
    const{activityStore}=useStore();
    const{selectedActivity:activity,openForm,loading,handleCancelSelctedActivity}=activityStore
    if(!activity)
    return <></>;
    return (
        
        <Card style={{ marginRight:'0'}}>
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
                    <Button basic color='blue' content='Edit' onClick={()=>openForm(activity.id)}/>
                    <Button loader={loading} basic color='grey' content='Cancel' 
                    onClick={()=>handleCancelSelctedActivity()}/>
                </ButtonGroup>
            
            </Card.Content>
        </Card>
        
    )
}

export default observer(ActivityDetails)
