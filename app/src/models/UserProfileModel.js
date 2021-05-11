import {BehaviorSubject as BS} from 'rxjs'



export default class UserModel extends ProfileModel {
    constructor(){
        super()
        this.uid = new BS("")
        this.userId = new BS("")
    }
}



