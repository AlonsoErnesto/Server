const mongoose = require("mongoose");
const { ApolloServer} = require("apollo-server")
//
const typeDefs = require('./gql/schema')
const resolvers = require('./gql/resolver')
require("dotenv").config({path:".env"})

mongoose.connect(process.env.BBDD,{
    useNewUrlParser: true,
    useFindAndModify:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
},(err,res)=>{
    err ? console.log("Error") : server()
});


function server()
{
    const ServerApollo = new ApolloServer({
        typeDefs,
        resolvers,
        //context
    });
    ServerApollo.listen().then(({url})=>{
        console.log("-------------------------");
        console.log("Server ON "+url);
        console.log("-------------------------");
    })
}

