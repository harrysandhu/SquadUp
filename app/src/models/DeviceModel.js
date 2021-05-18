import {BehaviorSubject as BS} from 'rxjs'



export default class DeviceModel {
    constructor(){
        this.id = new BS("")
        this.deviceId = new BS("")
        this.createdAt = new BS("")
        this.error = new BS(null)
    }
}