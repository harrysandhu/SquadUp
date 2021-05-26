import GoogleAuth from "../services/GoogleAuth"
import ApolloService from "../services/ApolloService"
import FStore from "../services/FStore"
import store from "utils/store"
import { 
    Provider,
    State
} from "../utils/constants"
import { GoogleSignin } from "@react-native-google-signin/google-signin"



export default class GameController{

    /**
     * 
     * @param {UserModel} userModel user model instance
     */
    constructor(gameModel){
        this.gameModel = gameModel
   }
   



}