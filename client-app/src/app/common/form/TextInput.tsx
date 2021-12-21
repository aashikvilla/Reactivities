import { useField } from 'formik';
import React from 'react';
import { Label ,Form} from 'semantic-ui-react';

interface Props{
    placeholder:string,
    name:string,
    label?:string,
    type?:string
}

export default function TextInput(props:Props) {
    const{name,label,placeholder}=props;

    const[field,meta]=useField(name);

    return (
        <Form.Field error ={meta.touched && meta.error}>
            <label>{label}</label>
            <input {...field} {...props} />
            {
                meta.touched && meta.error?
                <Label basic color='red'>{meta.error}</Label>
                :null
            }
        </Form.Field>
    )
}
