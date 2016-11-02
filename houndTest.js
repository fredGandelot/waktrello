


  
    // Read Bundle ,we should implement  all the methods (4 methods) of read bundle ( there is a dependency between the four methods )
    //allEntities
model.Board.controlMethods.allEntities = function(event) {
	
	 
         var elements = [];
        try {
            wakTrello.getBoards(process.env.appkey, process.env.token, process.env.userNameTrello).forEach(function(item) {
                var elem = {};
                elem.ID = item.id;
                elem.name = item.name;
                elem.desc = item.desc;
                elements.push(elem);
            });
        }
        catch (e) {
            throw e;
        }
        event.collectionStorage.elements = elements;
    }
    //getCollectionLength
model.Board.controlMethods.getCollectionLength = function(event) {
	
    return event.collectionStorage.elements.length;
};

// getEntityByPos
model.Board.controlMethods.getEntityByPos = function(event) {
    var pos = event.position;
    var elements = event.collectionStorage.elements;
    var element = elements[pos];

    for (var i in element) {
        event.entityStorage[i] = element[i];
    }
};
// getAttributeValue

model.Board.controlMethods.getAttributeValue = function(event) {
                   return event.entityStorage[event.attributeName];
                
    };

// end Read Bundle
//orderBy

model.Board.controlMethods.orderBy = function(event) {
    // Get unsort entityCollection
    var elements = event.collectionStorage.elements;
    var orderBy1 = event.attributeNames[0];
    var orderBy2 = event.attributeNames[1];
    // Sort entityCollection
    elements.sort(function(s1, s2) {
        if (orderBy1.ascending) {
            if (s1[orderBy1.attname] < s2[orderBy1.attname])
                return -1;
            else if (s1[orderBy1.attname] == s2[orderBy1.attname]) {
                // if we have an ambiguity  we sort by the second attribute (in general ID)
                if (orderBy2 != undefined) {
                    if (orderBy2.ascending) {

                        if (s1[orderBy2.attname] < s2[orderBy2.attname]) {
                            return -1;
                        }
                        else
                            return 1;
                    }
                }
            }
            else
                return 1;
        }
        else {
            if (s2[orderBy1.attname] < s1[orderBy1.attname])
                return -1;
            else if (s2[orderBy1.attname] == s1[orderBy1.attname]) {
                if (orderBy2 != undefined) {
                    if (orderBy2.ascending) {

                        if (s1[orderBy2.attname] < s2[orderBy2.attname]) {
                            return -1;
                        }
                        else
                            return 1;
                    }
                }
            }
            else
                return 1;
        }
    });
    // Set sort entityCollection
    event.sortedCollectionStorage.elements = elements;
};

//Save Bundle  , we should implement  all the methods (4 methods) of Save bundle ( there is a dependency between the four methods )
model.Board.controlMethods.newEntity = function() {
   // nothing do do here,  already built by Wakanda
};

model.Board.controlMethods.setAttributeValue = function(event) {
	 
	   

    event.entityStorage[event.attributeName] = event.value;
};
model.Board.controlMethods.saveEntity = function(event) {
	  
    var board = {
            name: event.entityStorage[event.dataClass.attributes.name.name],
            desc: event.entityStorage[event.dataClass.attributes.desc.name]
        }
        // if ID = null we create a new card 
    if (event.entityStorage[event.dataClass.attributes.ID.name] == null) {

        try {

            wakTrello.createNewBoard(process.env.appkey, process.env.token, board)
        }
        catch (e) {
            throw e;
        }
    }
    // if ID not null we update an existing card
    else {
        try {
            wakTrello.renameBoard(process.env.appkey, process.env.token, event.entityStorage[event.dataClass.attributes.ID.name], event.entityStorage[event.dataClass.attributes.name.name]);
        }
        catch (e) {
            throw e;
        }
    }
};
// if this method is absent , the server should throw an exception --> i think its a bug
//dropEntity

model.Board.controlMethods.getEntityByKey = function(event) {
    var element;
    var idBoard = event.key[0];
    try {

        element = wakTrello.getBoardByID(process.env.appkey, process.env.token, idBoard);
    }
    catch (e) {
        throw e;
    }
    if (element && element.id) {
        event.entityStorage.ID = element.id;
        event.entityStorage.name = element.name;
        event.entityStorage.desc = element.desc;
        return true;
    }
    return false;
}

model.Board.controlMethods.countEntities = function(event) {
    // I think in event object we should have all entities
    var coll = wakTrello.getBoards(process.env.appkey, process.env.token, process.env.userNameTrello);
    return coll.length

}


model.Board.controlMethods.newCollection = function(event) {

    event.collectionStorage.elements = [];

}


model.Board.controlMethods.addEntityToCollection = function(event) {

    var path = event.entityStorage.path;
    if (path != null) {
        var boards = event.collectionStorage.elements;
        arr.push(path);
        event.collectionStorage.elements = boards;
    }
}









