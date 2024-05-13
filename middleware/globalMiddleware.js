const globalMiddleware1 = (( req , res , next ) => {
    console.log("success globalMiddleware...1");
    next();
})

const globalMiddleware2 = (( req , res , next ) => {
    console.log("success globalMiddleware...2");
    next();
})


const globalMiddleware3 = (( req , res , next ) => {
    console.log("success globalMiddleware...3");
    next();
})

const globalMiddleware4 = (( req , res , next ) => {
    console.log("success globalMiddleware...4");
    next();
})

const globalMiddleware5 = (( req , res , next ) => {
    console.log("success globalMiddleware...5");
    next();
})

module.exports = { globalMiddleware1 , globalMiddleware2 , globalMiddleware3 , globalMiddleware4 , globalMiddleware5 };