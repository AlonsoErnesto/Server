const userController = require("../Controllers/user")


const resolvers  = {
    Query : {
        getUser : ()=>{
            console.log("Obteniendo Usuario")
            return null;
            },
        },
         Mutation: {
            //user
            register: (_,{input}) => userController.register(input),
            login: (_,{input}) => userController.login(input)
    },
}
module.exports = resolvers;