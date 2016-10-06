
model.Board.methods.classMethod = function() {
    return "Class method";
};

model.Board.entityMethods.entityMethod = function() {
    return "Entity method";
};

model.Board.collectionMethods.entityCollectionMethod = function() {
    return "Collection method";
};


model.Board.methods.classMethodWithParam = function(stringParam) {
    return stringParam;
};

model.Board.entityMethods.entityMethodWithParam = function(stringParam) {
    return stringParam;
};

model.Board.collectionMethods.entityCollectionMethodWithParam = function(stringParam) {
    return stringParam;
};