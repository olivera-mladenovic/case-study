import { ApolloServer } from "apollo-server";
import mongoose from 'mongoose';
import { typeDefs } from './graphql/typeDefs.js'
import resolvers from './graphql/resolvers/index.js'
mongoose.connect("mongodb+srv://olivera:mongodb10@cluster0.shlschd.mongodb.net/case?retryWrites=true&w=majority&appName=Cluster0").then(() =>  server.listen({port: 5001})).then(() => console.log('server listening...'))
// const resolvers = {
//     Query: {
       
//         async getReviews(){
//             try {
//                 const reviews = await Review.find();
//                 return reviews;
//             } catch(e) {
//                 console.log(e);
//             }
//         }
//     }
// }



const server = new ApolloServer({
    typeDefs,
    resolvers,
});

// server.listen({port: 5002}).then(res => console.log('server is listening...'))