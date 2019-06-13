// 모든 파일들을 이 파일(schema.js)에서 합칠것임 
import path from "path"; 
import {makeExecutableSchema}from "graphql-tools";
import { mergeTypes, mergeResolvers, fileLoader } from 'merge-graphql-schemas';

// fileLoader 함수를 사용하여 지정된 폴더에서 모든 파일을 가져온다. 
// fileLoader를 통해 typeDefs와 resolvers를 모두 가져올 것이다 (.graphql 파일, .js 파일)
// 때문에 api 폴더 밑에는 resolver이나 graphql이 아닌 파일을 두면 안된다. 
// 예를 들어 resolver이 아닌 js파일이 api폴더 밑에 생성된다면 현재파일(schema.js)에서 그 js파일을 
// resolver로 인식하기 때문에 에러가 발생할 수 있음 
const allTypes = fileLoader(path.join(__dirname, "/api/**/*.graphql")); 
const allResolvers = fileLoader(path.join(__dirname, "/api/**/*.js")); 

// makeExecutableSchema를 이용해서 GraphQL Schema를 만들 수 있음 ( typeDefs, resolvers ) 
const schema = makeExecutableSchema({
    typeDefs: mergeTypes(allTypes), 
    resolvers: mergeResolvers(allResolvers)
}); 

export default schema;