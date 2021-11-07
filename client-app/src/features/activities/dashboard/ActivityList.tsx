import { observer } from "mobx-react-lite";
import React, {useState } from "react";
import { NavLink } from "react-router-dom";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function ActivityList() {
    const [target, settarget] = useState('')
    
    const {activityStore}=useStore();
    const{loading,handleDelete,activitiesByDate:activities}=activityStore

    
    
    return (
       <Segment>
            <Item.Group divided>
               
            {activities.map((activity)=>(            
                <Item key={activity.id}>
                    <Item.Content>
                        <Item.Header as='a'>{activity.title}</Item.Header>
                        <Item.Meta>{activity.date}</Item.Meta>
                        <Item.Description>
                            <div>{activity.description}</div>
                            <div>{activity.city}</div>
                        </Item.Description>
                        <Item.Extra>
                            <Button floated='right' content='View' color='blue'  as={NavLink} to={`/activities/${activity.id}`}/>
                            <Button loading={loading && target===activity.id} floated='right' content='Delete' color='red' 
                            onClick={()=>{settarget(activity.id);handleDelete(activity.id)}}/>
                            <Label basic content={activity.category}/>
                        </Item.Extra>
                    </Item.Content>
                </Item>
            ))}
            </Item.Group>
       </Segment>
       
    )
});