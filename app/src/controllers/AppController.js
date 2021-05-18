// Central model
import AppModel from "../models/AppModel"


// all the controllers
import DeviceController from "./DeviceController"
import UserController from "./UserController"


class AppController{
    static controller = new AppController()

    constructor(){
        AppModel.loading = 
        this.user = new UserController(AppModel.userModel, AppModel.userProfileModel)
        this.device = new DeviceController(AppModel.deviceModel)
        
    }


    async load(){
        try{
            await this.user.load()
            await this.device.load()
        }catch(e){
            console.log("Error at AppController", e)
            

        }
        
    }

}


export default AppController.controller