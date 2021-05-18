import {BehaviorSubject as BS} from 'rxjs'



export default class UserProfileModel {
    constructor(){
        this.id = new BS("")
        this.name = new BS("")
        this.username = new BS("")
        this.avatarUrl = new BS("")
        this.bio = new BS("")
        this.uid = new BS("")
        this.userId = new BS("")
        
    }
}



