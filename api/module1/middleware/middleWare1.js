const moduleMiddleware1 = ( req , res , next ) => {
    console.log("Success moduleMiddleware...1");
    next();
}

const moduleMiddleware2 = ( req , res , next ) => {
    console.log("Success moduleMiddleware...2");
    next();
}

const moduleMiddleware3 = ( req , res , next ) => {
    console.log("Success moduleMiddleware...3");
    next();
}

const moduleMiddleware4 = ( req , res , next ) => {
    console.log("Success moduleMiddleware...4");
    next();
}

const moduleMiddleware5 = ( req , res , next ) => {
    console.log("Success moduleMiddleware...5");
    next();
}

module.exports = { moduleMiddleware1 , moduleMiddleware2 , moduleMiddleware3 , moduleMiddleware4 , moduleMiddleware5};