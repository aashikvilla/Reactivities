import {  makeAutoObservable} from "mobx";
import apiservice from "../api/apiservice";
import { Activity } from "../models/activity";
import { v4 as uuid } from 'uuid';
import { format } from "date-fns/esm";

export default class ActivityStore{
    title="Hello from MobX";
    loading=false;
    editMode=false;
    loadingInitial=true;    
    narry:[1, 2, 3] | undefined;
    selectedActivity: Activity | undefined=undefined;
    activityRegistry= new Map<string, Activity>();

    constructor(){
        makeAutoObservable(this)
    }

    get activitiesByDate(){
        return Array.from(this.activityRegistry.values()).sort((a,b)=>
        a.date!.getTime()-b.date!.getTime());
    }
    get GroupedActivities(){
        return Object.entries(
            this.activitiesByDate.reduce((activities,activity)=>{
                const date=format(activity.date!,"dd MMM yyyy") ;
                activities[date]=activities[date]?[...activities[date],activity]:[activity];
                return activities;
            },{}as { [key:string] : Activity[] })
        )
    }

   loadActivities= async ()=> {      
       try{

           const activities=await apiservice.Activities.list();          

            activities.forEach((activity)=>{
                this.setActivity(activity);              
                })           
                     
            this.setLoadingInitial(false)
       }
        catch(error){
            console.log(error);
            
            this.setLoadingInitial(false)
            
        }
       
   }

   loadActivity=async(id:string)=>{
       let activity=this.getActivity(id);
       if(activity){
           this.selectedActivity=activity;
           return activity;
       }
       else{
        this.setLoadingInitial(true);
           try{               
               activity=await apiservice.Activities.details(id);
               this.setActivity(activity);
               this.selectedActivity=activity;
               this.setLoadingInitial(false);
               return activity;
           }
           catch(error){
               this.setLoadingInitial(false);
           }
       }
   }

   private getActivity=(id:string)=>{
       return this.activityRegistry.get(id);
   }
   private setActivity=(activity:Activity)=>{
    activity.date=new Date(activity.date);
    this.activityRegistry.set(activity.id,activity);

   }

   setLoadingInitial = (v:boolean)=>{
       this.loadingInitial=v;
   }
   setLoading = (v:boolean)=>{
    this.loading=v;
   }


   
    setEditMode=(state:boolean)=>{
        this.editMode=state;
    }

    handleDelete=(id:string)=>{
        this.setLoading(true);     
        apiservice.Activities.delete(id).then(res=>{
        this.activityRegistry.delete(id);
          this.setLoading(false);     
        })
    
      }

      handleAddEditActivity= async (activity:Activity)=>{
        this.setLoading(true);
    
        if(activity.id)
        {   await apiservice.Activities.update(activity)
            //this.setActivities([...this.activities.filter(a=>a.id!==activity.id),activity]);
            this.activityRegistry.set(activity.id,activity);
           
            this.setEditMode(false);
            this.setLoading(false);
          
        }
        else{
            activity.id=uuid();
            await apiservice.Activities.create(activity)
            this.activityRegistry.set(activity.id,activity);
          
            this.setEditMode(false);
            this.setLoading(false);
        }
       
      }

}