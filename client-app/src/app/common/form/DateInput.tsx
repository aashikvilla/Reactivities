import { useField } from 'formik';
import React from 'react';
import { Label ,Form} from 'semantic-ui-react';
import DatePicker,{ReactDatePickerProps} from 'react-datepicker'
import { queryHelpers } from '@testing-library/dom';


export default function DateInput(props:Partial <ReactDatePickerProps>) {
    const{name}=props;

    const[field,meta,helpers]=useField(name!);

    return (
        <Form.Field error ={meta.touched && meta.error}>
            <DatePicker 
            {...field}
            {...props}
            selected={field.value && new Date(field.value) || null }
            onChange={value=>helpers.setValue(value)}

            
            />
            {
                meta.touched && meta.error?
                <Label basic color='red'>{meta.error}</Label>
                :null
            }
        </Form.Field>
    )
}
