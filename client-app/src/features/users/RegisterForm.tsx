import { Form, Formik, FormikBag } from 'formik'
import { makeObservable } from 'mobx'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { Button } from 'semantic-ui-react'
import TextInput from '../../app/common/form/TextInput'
import { useStore } from '../../app/stores/store'

function RegisterForm() {
    const {userStore}=useStore();
    return (
               
        <Formik 
        initialValues={{email:'',password:'',displayName:'',userName:''}}
        onSubmit={values=>userStore.register(values)}
        >
            {({handleSubmit, isSubmitting})=>(
                 <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>

                     <TextInput name="displayName" placeholder="Display Name"/>
                     <TextInput name="userName" placeholder="User Name"/>
                     <TextInput name="email" placeholder="Email"/>
                     <TextInput name="password" type="password" placeholder="Password"/>

                     <Button loading={isSubmitting} positive content="Login" fluid type="submit"/>

                 </Form>

            )}
           
        </Formik>
    )
}

export default observer(RegisterForm)
