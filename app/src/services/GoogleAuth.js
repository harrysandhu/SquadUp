import {
    GoogleSignin
} from '@react-native-google-signin/google-signin'; 
import { firebaseConfig } from 'app/firebase.config';
import auth from '@react-native-firebase/auth';
GoogleSignin.configure(firebaseConfig);



export default class GoogleAuth{

    static getCurrentUser = async () =>{
        return new Promise(async (resolve, reject) => {
            try{
                const user = await GoogleSignin.signInSilently()
                resolve(user)
            }catch(error){
                reject(error)
            }

        })
    }

}