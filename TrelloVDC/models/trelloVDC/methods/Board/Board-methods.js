
model.Board.methods.classMethod = function() {
    return "Class method";
};

(model.Board.methods.publicClassMethod = function() {
    return "Class method";
}).scope="public";


model.Board.entityMethods.entityMethod = function() {
    return "Entity method";
};

(model.Board.entityMethods.publicEntityMethod = function() {
    return "Entity method";
}).scope="public"

 
 

model.Board.collectionMethods.entityCollectionMethod = function() {
    return "Collection method";
};

(model.Board.collectionMethods.publicEntityCollectionMethod = function() {
    return "Collection method";
}).scope="public"



model.Board.methods.classMethodWithParam = function(stringParam) {
    return stringParam;
};

(model.Board.methods.publicClassMethodWithParam = function(stringParam) {
    return stringParam;
}).scope="public"

model.Board.entityMethods.entityMethodWithParam = function(stringParam) {
    return stringParam;
};

(model.Board.entityMethods.publicEntityMethodWithParam = function(stringParam) {
    return stringParam;
}).scope="public";

model.Board.collectionMethods.entityCollectionMethodWithParam = function(stringParam) {
    return stringParam;
};

(model.Board.collectionMethods.publicEntityCollectionMethodWithParam = function(stringParam) {
    return stringParam;
}).scope="public";


 
