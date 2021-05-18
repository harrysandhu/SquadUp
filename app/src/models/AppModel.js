import { BehaviorSubject as BS } from "rxjs";
import DeviceModel from "./DeviceModel";
import UserModel from "./UserModel";
import UserProfileModel from "./UserProfileModel";



class AppModel{
    static model = new AppModel()

    constructor(){
        // app's state
        this.loading = new BS(false)
        this.error = new BS("")
        this.isError = new BS(false)

        
        //store all models here
        this.userModel = new UserModel()
        this.userProfileModel = new UserProfileModel()
        this.deviceModel = new DeviceModel()

    }
}

export default AppModel.model;
