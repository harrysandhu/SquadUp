

/**
 *
 * 
 *      Rxjs State management
 *         
 *  
 *                              Models                          Controllers                     Views(React)
 *                      userModel = {}                          AppController ----   
 *                                                                                                 import {appController} from AppModel
 *                      serverModel = {}                        class UserController{
    *                                                              GetauthState
    *                                                              AddFriend
    *                                                                  
 * 
 *                                                                                              }              ----              appModel.x = 2
 *                      ChatModel = {}                          
 *                      GameModel = {}                                                              
 * 
 *                                                                                              appModel
 *                                                                                                {x}
 *              
 *                                                                                      FriendsScreen -> get the latest userModel automatically and re-render.
 *                          
 * 
 * 
 *                                  userModel = {
 *          id, name, email, username}
 *          
 * userController{
 *  function addFriend(id){
 *      let uid = userModel.id
 *      // make a server call to add a friend.
 *       
 *         update userModel
 * }
 * }
 * 
 *                                          appController.user.addfriend({id: "xx22"})
 * 
 * 
 * 
 *      click on a btn --->   postcontroller.addPost({content : "yo"})         addPost(content){ userController.uid POST request this post}          postModel gets updated

posts = []
<View>
<Text>
<text>
<View><

        SERVER/API
            |
VIEW -> CONTROLLER -> MODEL -> UPDATES
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<                              
    VIEW LISTENS FOR ANY UPDATE TO THE MODEL


    RxJs -> Observer Pattern

 


    ChatScreen

    
    const chatObj= {
           dsafgsgf: { 
                    from: {
                        id: 123
                        name: "Harry"
                    }
                    to: {
                        id: 420
                        name: "Doge"
                    }
                    text: "YOOOO"
                    attachements: [
                        http://googlecontent.google.com/apple.png,
                        http://googlecontent.google.com/apple.png,
                        http://googlecontent.google.com/apple.png,
                        http://googlecontent.google.com/apple.png,
                    ]
                    sentDT
                    readDT
                },
                 fdsg4rg: { 
                    from: {
                        id: 123
                        name: "Harry"
                    }
                    to: {
                        id: 420
                        name: "Doge"
                    }
                    text: "YOOOO"
                    attachements: [
                        http://googlecontent.google.com/apple.png,
                        http://googlecontent.google.com/apple.png,
                        http://googlecontent.google.com/apple.png,
                        http://googlecontent.google.com/apple.png,
                    ]
                    sentDT
                    readDT
                },
                 messageid: { 
                    from: {
                        id: 123
                        name: "Harry"
                    }
                    to: {
                        id: 420
                        name: "Doge"
                    }
                    text: "YOOOO"
                    attachements: [
                        http://googlecontent.google.com/apple.png,
                        http://googlecontent.google.com/apple.png,
                        http://googlecontent.google.com/apple.png,
                        http://googlecontent.google.com/apple.png,
                    ]
                    sentDT
                    readDT
                },
                 messageid: { 
                    from: {
                        id: 123
                        name: "Harry"
                    }
                    to: {
                        id: 420
                        name: "Doge"
                    }
                    text: "YOOOO"
                    attachements: [
                        http://googlecontent.google.com/apple.png,
                        http://googlecontent.google.com/apple.png,
                        http://googlecontent.google.com/apple.png,
                        http://googlecontent.google.com/apple.png,
                    ]
                    sentDT
                    readDT
                },
                 messageid: { 
                    from: {
                        id: 123
                        name: "Harry"
                    }
                    to: {
                        id: 420
                        name: "Doge"
                    }
                    text: "YOOOO"
                    attachements: [
                        http://googlecontent.google.com/apple.png,
                        http://googlecontent.google.com/apple.png,
                        http://googlecontent.google.com/apple.png,
                        http://googlecontent.google.com/apple.png,
                    ]
                    sentDT
                    readDT
                }
    }


    return (

        {chatObj.map((messageId, messageObject) => {
                <View key={messageId}>
                    <Text> {messageObject.text}</Text>
                    
                </View>

        })}
    )
    

*/                         
