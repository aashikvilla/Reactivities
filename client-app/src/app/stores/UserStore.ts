import { symlinkSync } from 'fs';
import { makeAutoObservable, runInAction } from 'mobx'
import React, { Component } from 'react'
import { history } from '../..';
import apiservice from '../api/apiservice';
import { User, UserFormValues } from '../models/user'
import { store } from './store';

export default class UserStore{
    user:User|null=null

    constructor(){
        makeAutoObservable(this);
    }

    get isLoggedIn(){
        return !!this.user;
    }

    login = async(creds:UserFormValues)=>{
        try{
            const user =await apiservice.Account.login(creds);
            console.log(user);
            store.commonStore.setToken(user.token);
            runInAction(()=>this.user=user);
            history.push("/activities");
        }
        catch(error){
            throw error;
        }
    }

    register = async(creds:UserFormValues)=>{
        try{
            const user =await apiservice.Account.register(creds);
            console.log(user);
           
        }
        catch(error){
            console.log("register error",error);
            throw error;
        }

    }


    logout=()=>{
        store.commonStore.setToken(null);
        localStorage.removeItem('jwt');
        this.user=null;
        history.push("/");
    }

    getUser=async()=>{
        try{
            const user=await apiservice.Account.current();
            runInAction(()=>this.user=user);
        }
        catch(error){
            console.log(error);
        }

    }
}
