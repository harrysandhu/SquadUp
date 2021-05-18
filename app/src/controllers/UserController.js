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
            const isSignedIn = await GoogleAuth.isSignedIn()
            const userAuthState = await store("USER_AUTH_STATE")
            if(isSignedIn && userAuthState == "SIGN_IN"){
                let currentUser = await GoogleAuth.getCurrentUser()
                let user = await ApolloService.getUserByEmail(currentUser.email)
                this.setUser(user)
                this.setUserProfile(user)
                this.userModel.isSignedIn.next(true)
            }else{
                throw new Error("User not signed in.")
            }
        }catch(error){
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
            let user = await ApolloService.signUpUser(userInput)
            await store("USER_AUTH_STATE", "SIGN_IN")
            this.setUser(user)
            this.setUserProfile(user)
        }catch(error){
            await store("USER_AUTH_STATE", null)
            this.userModel.isSignedIn.next(false)
            this.userModel.error.next(error)
        }
    }


    async logout(){

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