import { makeAutoObservable } from 'mobx'
import React, { Component } from 'react'
import apiservice from '../api/apiservice';
import { User, UserFormValues } from '../models/user'

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
}
