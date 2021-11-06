import {  makeAutoObservable} from "mobx";
import apiservice from "../api/apiservice";
import { Activity } from "../models/activity";
import { v4 as uuid } from 'uuid';

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
        Date.parse(a.date)-Date.parse(b.date));
    }

   loadActivities= async ()=> {      
       try{
           const activities=await apiservice.Activities.list();
           console.log("from api",activities)
           let newres: Activity[]=[];
            activities.forEach((activity)=>{

                activity.date=activity.date.split('T')[0];
                this.activityRegistry.set(activity.id,activity);
                })           
                     
            this.setLoadingInitial(false)
       }
        catch(error){
            console.log(error);
            
            this.setLoadingInitial(false)
            
        }
       
   }

   setLoadingInitial = (v:boolean)=>{
       this.loadingInitial=v;
   }
   setLoading = (v:boolean)=>{
    this.loading=v;
}


   
   handleSelctedActivity=(id:string)=>{
        this.selectedActivity=this.activityRegistry.get(id);
    }

    handleCancelSelctedActivity=()=>{
        this.selectedActivity=undefined;
    }

    openForm=(id?:string)=>{
        id?this.handleSelctedActivity(id):this.handleCancelSelctedActivity();
        this.setEditMode(true);
    }

    closeForm=()=>{
        this.setEditMode(false);
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
            this.handleSelctedActivity(activity.id);
            this.setEditMode(false);
            this.setLoading(false);
          
        }
        else{
            activity.id=uuid();
            await apiservice.Activities.create(activity)
            this.activityRegistry.set(activity.id,activity);
            this.handleSelctedActivity(activity.id);
            this.setEditMode(false);
            this.setLoading(false);
        }
       
      }

}