import { Formik ,Form, ErrorMessage} from 'formik';
import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { NavLink, useParams } from 'react-router-dom';
import { Button,  Header,  Label,  Segment } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import * as Yup from 'yup'
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import SelectInput from '../../../app/common/form/SelectInput';
import { categoryOptions } from '../../../app/common/Options/categoryOptions';
import DateInput from '../../../app/common/form/DateInput';
import { Activity } from '../../../app/models/activity';

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
        date:new Date(),
        city:'',
        venue:'',
    });

    const validationSchema=Yup.object({
        title: Yup.string().required("Activity title is Required"),
        description: Yup.string().required("Description is Required"),
        category: Yup.string().required("Category is Required"),
        date: Yup.string().required(),
        city: Yup.string().required("City is Required"),
        venue: Yup.string().required("Venue is Required"),
    })

    useEffect(() => {
        
       if(id){
           loadActivity(id).then(activity=>{
               setActivity(activity!);
           });
       }
       else{
           setLoadingInitial(false);
       }
    }, [id,loadActivity,setLoadingInitial]);



    function handleSubmit(activity:Activity){
        console.log("on submit",activity);
        handleAddEditActivity(activity).then(()=>{
            navigate(`/activities/${activity.id}`);
        });
    }

   

    if(loadingInitial){
        return <LoadingComponent inverted={false} content={''}/>
    }


    return (
       <Segment clearing>
           <Header content="Activity Details" color='teal'/>
           <Formik 
           validationSchema={validationSchema}
           enableReinitialize 
           initialValues={activity} 
           onSubmit={values=>handleSubmit(values)}>
               {({ handleSubmit, isValid,isSubmitting,dirty})=>(
                    <Form className="ui form"onSubmit={handleSubmit} autoComplete="off">
                        <TextInput placeholder="Title" name='title'/>        
                        <TextArea row={2} placeholder='Description' name='description'/>
                        <SelectInput options={categoryOptions} placeholder='Category' name='category'/>
                        <DateInput placeholderText='Date' name='date' showTimeSelect timeCaption='time' dateFormat='MMM d yyy h:mm aa'/>
                        <Header content="Loaction Details" color='teal'/>
                        <TextInput placeholder='City' name='city'/>
                        <TextInput placeholder='Venue' name='venue'/>
                        <Button
                        disabled={isSubmitting||!dirty} 
                        loading={loading} 
                        floated='right' positive type='submit' content='Submit'/>
                        <Button as={NavLink} to='/activities' floated='right' type='button' content='Cancel'/>
                    </Form>
               )}
            </Formik>
               
          
       </Segment>
    )
}

export default observer(ActivityForm)
