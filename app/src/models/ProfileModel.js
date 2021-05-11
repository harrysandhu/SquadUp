import {BehaviorSubject as BS} from 'rxjs'



export default class ProfileModel {
    constructor(){
        this.id = new BS("")
        this.name = new BS("")
        this.username = new BS("")
        this.avatarUrl = new BS("")
        this.bio = new BS("")
    }
}



