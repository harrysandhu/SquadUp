import {BehaviorSubject as BS} from 'rxjs'



export default class UserModel {
    constructor(){
        this.id = new BS("")
        this.userId = new BS("")
        this.idToken = new BS("")
        this.email = new BS("")
        this.password = new BS("")
        this.authStage = new BS("")
        this.authType = new BS("")
        this.createdAt = new BS("")
        this.dob = new BS("")
        this.idToken = new BS("")
        this.isSignedIn = new BS(false)
        this.error = new BS(null)
        this.route = new BS("")
    }
}



