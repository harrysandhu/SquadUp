import GoogleAuth from "../services/GoogleAuth"
import ApolloService from "../services/ApolloService"
import FStore from "../services/FStore"
import store from "utils/store"
import { 
    Provider,
    State
} from "../utils/constants"
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import DeviceInfo from 'react-native-device-info';

export default class DeviceController{
    constructor(deviceModel){
        this.deviceModel = deviceModel
    }

    async load(){
        try{
            await store("DEVICE", null)
            this.deviceModel.error.next(null)
            let device = await store("DEVICE")
            if(device == null){
                // get device id and check if exists
                const deviceId = DeviceInfo.getUniqueId()
                let d = await ApolloService.getDevice(deviceId)
                if(d == null){
                    device = await ApolloService.registerDevice(deviceId)
                    await store("DEVICE", device)
                }
            }
            console.log("device :", device)
            this.setDevice(device)
        }catch(error){
            console.log("device not loaded")
            this.deviceModel.error.next(error)
        }
    }

    async setDevice(device){
        this.deviceModel.id.next(device.id)
        this.deviceModel.deviceId.next(device.deviceId)
        this.deviceModel.createdAt.next(device.createdAt)
        this.deviceModel.error.next(null)
    }
}