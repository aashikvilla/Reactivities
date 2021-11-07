import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { NavLink, useParams } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store'

function ActivityForm() {
    const navigate=useNavigate();
    const {activityStore}=useStore();
    const {loadingInitial  , loading , handleAddEditActivity, loadActivity,setLoadingInitial}=activityStore;
    const {id}=useParams();
    
    const [activity, setActivity] = useState({
        id:'',
        title:'',
        category:'',
        description:'',
        date:'',
        city:'',
        venue:'',
    });

    useEffect(() => {
        console.log("id",id,"load",loadingInitial)
       if(id){
           loadActivity(id).then(activity=>{
               setActivity(activity!);
           });
       }
       else{
           setLoadingInitial(false);
       }
    }, [id,loadActivity]);



    function handleSubmit(){
        console.log("on submit",activity);
        handleAddEditActivity(activity).then(()=>{
            navigate(`/activities/${activity.id}`);
        });
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const {name , value}= event.target;
        setActivity({...activity , [name]:value})
    }

    if(loadingInitial){
        return <LoadingComponent inverted={false} content={''}/>
    }


    return (
       <Segment clearing>
           <Form onSubmit={handleSubmit} autoComplete="off">
               <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange}/>
               <Form.TextArea placeholder='Description'  value={activity.description} name='description' onChange={handleInputChange}/>
               <Form.Input placeholder='Category'  value={activity.category} name='category' onChange={handleInputChange}/>
               <Form.Input type='date' placeholder='Date'  value={activity.date} name='date' onChange={handleInputChange}/>
               <Form.Input placeholder='City'  value={activity.city} name='city' onChange={handleInputChange}/>
               <Form.Input placeholder='Venue'  value={activity.venue} name='venue' onChange={handleInputChange}/>
               <Button loading={loading} floated='right' positive type='submit' content='Submit'/>
               <Button as={NavLink} to='/activities' floated='right' type='button' content='Cancel'/>
           </Form>
       </Segment>
    )
}

export default observer( ActivityForm)
