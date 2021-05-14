import { Observable } from 'rxjs'



// const observable = new Observable(subscriber => {
//     subscriber.next(1)
//     subscriber.next(2)
//     subscriber.next("hello")
//     setTimeout(()=>{
//         subscriber.next(4)
//         subscriber.complete()
//     }, 1000)
// })

// console.log(observable)
// console.log("before")

// observable.subscribe(x => {
//     console.log(x)
// })


// console.log("after sub")


/**
 
    function foo(){
        return 1
    }


    foo.call()

    - give me one value synchronously



    foo = new Observable(function subscribe(subcriber) => {
        subcriber.next(2)
        subcriber.next(5)
    })


    let subscriber = {
        next(x) => {console.log(x)}
    }

    foo.subscribe(subscriber)

    

    - observable.subscribe() means - give me any amount of values, either sync or async
    Core Observable concerns:

        Creating Observables
        Subscribing to Observables
        Executing the Observable
        Disposing Observables

 */



// import {Subject} from 'rxjs'


// const subject = new Subject()

// let obs1 = {
//     next: (v) => {
//         console.log("THIS IS HOW obs1 handles value: ", v)
//     } 
// }

// subject.subscribe(obs1)
// // console.log(subject)

// let obs2 = {
//     next: (v) => {
//         console.log("THIS IS HOW obs2 handles value: ", v)
//     } 
// }



// subject.subscribe(obs2)


// subject.next(1)






// import {BehaviorSubject} from 'rxjs'

// const bs = new BehaviorSubject(0)

// let ob1 = {next: (v) => console.log(`observer A ${v}`)}
// bs.subscribe(ob1)

// bs.next(1)
// bs.next(2)

// let ob2 = {next: (v) => console.log(`observer B ${v}`)}
// bs.subscribe(ob2)

// bs.next(3)



// console.log(bs.getValue())


// import {Subject} from 'rxjs'

// const bs = new Subject()

// let ob1 = {next: (v) => console.log(`observer A ${v}`)}
// bs.subscribe(ob1)

// bs.next(1)
// bs.next(2)

// let ob2 = {next: (v) => console.log(`observer B ${v}`)}
// bs.subscribe(ob2)

// bs.next(3)




/**


models


 */

let s = {"__typename": "User", "authStage": "SIGNUP", "authType": "GOOGLE", "createdAt": "2021-05-07T21:34:12.033Z", "device": {"__typename": "Device", "createdAt": "2021-05-07T21:33:31.801Z", "deviceId": "A16B90C6-CFD6-44D4-A32E-0801C9E2854F", "id": "30"}, "dob": "1999-05-28T10:26:39.359Z", "email": "hrvsandhu6@gmail.com", "id": "f336be17-9170-437f-ac3d-0260f0c9a2de", "idToken": null, "password": null, "profile": {"__typename": "Profile", "avatarUrl": "https://lh3.googleusercontent.com/a-/AOh14Gj07KmstmrQQWBJPhsK4QetSBUmeofqryoEb5I2=s96-c", "bio": null, "id": "695ff03b-1848-41bb-84db-a27e71e6f9a6", "name": "H S", "username": "Harry"}, "userId": "XhbE7U59FMU7loIiNR7eJ0W8KHw2"}
console.log(s)
console.log(JSON.parse(s))

