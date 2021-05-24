import GoogleAuth from "../services/GoogleAuth"
import ApolloService from "../services/ApolloService"
import FStore from "../services/FStore"
import store from "utils/store"
import { 
    Provider,
    State
} from "../utils/constants"
import { GoogleSignin } from "@react-native-google-signin/google-signin"


export default class UserController{

    /**
     * 
     * @param {UserModel} userModel user model instance
     */
    constructor(userModel, userProfileModel){
        this.userModel = userModel
        this.userProfileModel = userProfileModel
    }


    /**
     * Loads the userModel and userProfileModel if the user is signed in.
     */
    async load(){
        try{
            this.userModel.error.next(null)
            let currentUser = null 
            try{
               
                currentUser = await GoogleAuth.getCurrentUser()
            }catch(e){
                console.log(e)
            }
            
            console.log("CURRENT USER:", currentUser)
            const userAuthState = await store("USER_AUTH_STATE")
            if(currentUser != null && userAuthState == "SIGN_IN"){
                
                console.log("USER: ", currentUser.user.email)
                let user = await ApolloService.getUserByEmail(currentUser.user.email)
                this.userModel.route.next("UserNav")
                this.setUser(user)
                this.setUserProfile(user)
                this.userModel.isSignedIn.next(true)
            }else{
                this.userModel.route.next("Main")
            }
        }catch(error){
            console.log("error at user load: ", error)
            this.userModel.route.next("Main")
            this.userModel.isSignedIn.next(false)
            this.userModel.error.next(error)
        }
    }


    // async signIn(){
    //     // sign in with google and load user
    //     try{
    //         const {idToken} = await GoogleSignin.signIn()
    //         const googleCredential = auth.GoogleAuthProvider.credential(idToken)

    //     }
    // }


    async signUp(userInput){
        // sign up with google and load user
        try{
            let currentUser = null 
            try{
                currentUser = await GoogleAuth.getCurrentUser()
                console.log("got something")
            }catch(e){
                console.log(e)
            }
            if(currentUser != null){
                console.log("USER: ", currentUser.user.email)
                let user = await ApolloService.getUserByEmail(currentUser.user.email)
                let route = "Completion" 
                
                if(user == null){
                    // register user
                    user = await ApolloService.signUpUser(userInput)
                    
                }           
                await store("USER_AUTH_STATE", "SIGN_IN")
                
                if(user.profile.username != null && user.profile.username != ""){
                    route = "UserNav"
                }
                this.userModel.route.next(route)
                console.log(user)
                this.setUser(user)
                this.setUserProfile(user)
            }
           
        }catch(error){
            console.log("error at signup", error)
            await store("USER_AUTH_STATE", null)
            this.userModel.isSignedIn.next(false)
            this.userModel.error.next(error)
        }
    }


    async logout(){
        await GoogleSignin.signOut()
    }

    async setUsername(username){
        try{
            let data = {
                username: username,
                profile_id: this.userProfileModel.id.getValue()
            }
            let res = await ApolloService.setUsername(data)
            this.userProfileModel.username.next(res)
        }catch(error){
            this.userModel.error.next(error)
            throw error
        }
    }


    setUser(user){
        this.userModel.id.next(user.id)
        this.userModel.userId.next(user.userId)
        this.userModel.idToken.next(user.idToken)
        this.userModel.email.next(user.email)
        this.userModel.password.next(user.password)
        this.userModel.authStage.next(user.authStage)
        this.userModel.authType.next(user.authType)
        this.userModel.createdAt.next(user.createdAt)
        this.userModel.dob.next(user.dob)
    }

    setUserProfile(user){
        this.userProfileModel.id.next(user.profile.id)
        this.userProfileModel.name.next(user.profile.name)
        this.userProfileModel.username.next(user.profile.username)
        this.userProfileModel.avatarUrl.next(user.profile.avatarUrl)
        this.userProfileModel.bio.next(user.profile.bio)
        this.userProfileModel.uid.next(user.id)
        
    }

}