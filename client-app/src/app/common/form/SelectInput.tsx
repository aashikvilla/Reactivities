import { useField } from 'formik';
import React from 'react';
import { Label ,Form, Select} from 'semantic-ui-react';

interface Props{
    placeholder:string,
    name:string,
    options:any,
    label?:string,
   
}

export default function SelectInput(props:Props) {
    const{name,label,options}=props;

    const[field,meta, helpers]=useField(name);

    return (
        <Form.Field error ={meta.touched && meta.error}>
            <label>{label}</label>
            <Select
                clearable
                options={options}
                value={field.value}
                onChange={(e,d)=>helpers.setValue(d.value)}
                onBlur={()=>helpers.setTouched(true)}
                placeholder={props.placeholder}
            />
            {
                meta.touched && meta.error?
                <Label basic color='red'>{meta.error}</Label>
                :null
            }
        </Form.Field>
    )
}
