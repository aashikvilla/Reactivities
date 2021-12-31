import { ErrorMessage, Form, Formik } from 'formik'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { Button, Label } from 'semantic-ui-react'
import TextInput from '../../app/common/form/TextInput'
import { useStore } from '../../app/stores/store'

function LoginForm() {
    const {userStore}=useStore();
    return (
        <Formik 
        initialValues={{email:'',password:'',displayName:'',userName:'',error:null}}
        onSubmit={
            (values,{setErrors})=> userStore.login(values)
            .catch(error=>setErrors({error:"Invalid Email or Password"}))
        }
        >
            {({handleSubmit, isSubmitting, errors})=>(
                 <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                     <TextInput name="email" placeholder="Email"/>
                     <TextInput name="password" type="password" placeholder="Password"/>

                     <ErrorMessage name='error'
                        render={()=><Label style={{marginBottom:'10px'}}  basic color='red' 
                        content={errors.error}/> }
                     />

                     <Button loading={isSubmitting} positive content="Login" fluid type="submit"/>

                 </Form>

            )}
           
        </Formik>
    )
}

export default observer( LoginForm)
