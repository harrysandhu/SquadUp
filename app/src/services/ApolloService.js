import {
    useQuery, 
    useMutation, 
    gql, 
    useApolloClient 
} from "@apollo/client";

import { 
    GET_DEVICE, 
    GET_USER_BY_EMAIL
} from 'apollo/queries';

import { 
    REGISTER_DEVICE,
    SIGNUP_USER
} from 'apollo/mutations';

const client = useApolloClient();

/**
 * Class responsible for making Apollo/GraphQL server requests, and implements
 * all the use cases for the app. 
 */
export default class ApolloService{

    /**
     * Register Device 
     * @param {String} deviceId Device's deviceId.
     * @returns Device
     */
     static registerDevice = async (deviceId) => {
        return new Promise(async (resolve, reject) => {
            try{
                const result = await client.mutate({
                    mutation: REGISTER_DEVICE,
                    variables: {deviceId}
                })
                if("id" in Object(result.data.registerDevice)){
                    resolve(result.data.registerDevice)
                }else{
                    reject(new Error("Could not register device."))
                }
            }catch(e){
                console.log("error at registerDevice: ",e )
                reject(new Error("Could not register device."))
            }
        
        })
    }
    
    /**
     * Get Device by deviceId
     * @param {String} deviceId Device's deviceId.
     * @returns Device
     */
     static getDevice = async (deviceId) => {
        return new Promise(async (resolve, reject) => {
            try{
                const result = await client.query({
                    query: GET_DEVICE,
                    variables: {deviceId},
                    fetchPolicy: "network-only"
                })
                resolve(result.data.getDevice)
            }catch(e){
                console.log("error at getDevice: ",e )
                reject(new Error("Could not get device"))
            }
        
        })
    }

    /**
     * Gets the user by email, if account doesn't exist, rejects the promise.
     * @param {String} email user's email from google sign-in
     * @returns User
     */
    static getUserByEmail = async (email) => {
        return new Promise(async (resolve, reject) => {
            try{
                const result = await client.query({
                    query: GET_USER_BY_EMAIL,
                    variables: {email},
                    fetchPolicy: "network-only"
                })
                if("id" in Object(result.data.userByEmail)){
                    resolve(result.data.userByEmail)
                }else{
                    reject(new Error("Account doesn\'t exist. Please Sign Up."))
                }
            }catch(e){
                console.log("error at getUserbyEmail: ",e )
                reject(new Error("Account doesn\'t exist. Please Sign Up."))
            }
        
        })
    }
    
    /**
     * Sign up user using the userInput object. UserInput conforms to the 
     * apollo API.
     * @param {*} userInput {name, email, avatarUrl, userId, dID}
     * @returns User
     */
    static signUpUser = async (userInput) => {
        return new Promise(async (resolve, reject) => {
            try{
                const result = await client.mutate({
                    mutation: SIGNUP_USER,
                    variables: {userInput}
                })
                if("id" in Object(result.data.signUpUser)){
                    resolve(result.data.signUpUser)
                }else{
                    reject(new Error("Could not sign up."))
                }
            }catch(e){
                console.log("error at signUpUser: ",e )
                reject(new Error("Could not sign up."))
            }
        
        })
    }
    


}

