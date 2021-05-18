


Game {
    id
    name
    gameId
    maxSize
}



Team{
    id
    name
    teamId
    game.id
    isActive
    createdAt
}



usersOnGame{
    game.id
    user.id
}

<!-- teamsOnGame{
    team.id 
    game.id
}
 -->

usersOnTeam{
    user.id
    team.id
}


{
    "123":{
        id: "123",
        name: "Among Us",
        gameId: "amongus",
        maxSize: 10
    },
    "456":{
        id: "456",
        name: "Fall Guys",
        gameId: "fallguys",
        maxSize: 4
    },
    "789":{
        id: "789",
        name: "Valheim",
        gameId: "valheim",
        maxSize: 10
    },
    "012":{
        id: "012",
        name: "Rocket League",
        gameId: "rocketleague",
        maxSize: 10
    },
    "696":{
        id: "012",
        name: "Overwatch",
        gameId: "overwatch",
        maxSize: 6
    }
}



{
    "901" : {
        id: "901",
        name: "KILL BILL",
        teamId: "kill_bill",
        gameId: "456",
        isActive: true,
        createdAt: null
    },
    "420" : {
        id: "420",
        name: "Khiladis",
        teamId: "akshaykumar420",
        gameId: "696",
        isActive: true,
        createdAt: null
    },
    "669" : {
        id: "669",
        name: "Chain Smokers",
        teamId: "chain_s",
        gameId: "012",
        isActive: true,
        createdAt: null
    },
    "323" : {
        id: "901",
        name: "One Direction",
        teamId: "nozaynnohomo",
        gameId: "012",
        isActive: true,
        createdAt: null
    },
    "344" : {
        id: "344",
        name: "Viking Squad",
        teamId: "vikes",
        gameId: "789",
        isActive: true,
        createdAt: null
    },
    "111" : {
        id: "111",
        name: "WhoIsImposter",
        teamId: "imposters",
        gameId: "123",
        isActive: true,
        createdAt: null
    },

}