import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { Activity } from "../models/activity";
import { User, UserFormValues } from "../models/user";


const sleep=(delay:number)=>{
    return new Promise((resolve)=>{
        setTimeout(resolve,delay);
    })
}

axios.defaults.baseURL='http://localhost:5000/api/';

axios.interceptors.response.use( async response=>{
   
        await sleep(1000);
        return response;
   
},(error:AxiosError)=>{
    const{data, status}=error.response!;
    
    switch(status){
        
        case 400:toast.error('bad request');break;
        case 401:toast.error('unauthorized');break;
        case 404:toast.error('not found');break;
        case 500:toast.error('Server error');break;
    }
    return Promise.reject(error);
})

const responseBody=<T>(response:AxiosResponse<T>)=>response.data;

const request={
    get:<T>(url:string)=>axios.get<T>(url).then(responseBody),
    put:<T>(url:string,body:{})=>axios.put<T>(url,body).then(responseBody),
    post:<T>(url:string,body:{})=>axios.post<T>(url,body).then(responseBody),
    delete:<T>(url:string)=>axios.delete<T>(url).then(responseBody),
}

const Activities={
    list:()=>request.get<Activity[]>('activities'),
    details:(id:string)=>request.get<Activity>(`activities/${id}`),
    create:(activity:Activity)=>request.post('activities',activity),
    update:(activity:Activity)=>request.put(`activities/${activity.id}`,activity),
    delete:(id:string)=>request.get(`activities/${id}`),
}

const Account={
    current:()=>request.get<User>('/account/'),
    login:(user:UserFormValues)=>request.post<UserFormValues>('/account/login',user),
    register:(user:UserFormValues)=>request.post<UserFormValues>('/account/register',user)
}


const apiservice={
    Activities,
    Account
}

export default apiservice;