

 var wakTrello = require('wakanda-trello'); 

  
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
        if (event.attributeName === 'children') {
            if(event.onlyLightValue){
                return {deferred: true};
            } else {
            	if(event.entityStorage.ID!=null)
                return ds.List.query('+' + event.entityStorage.ID)
            };            
        } else {
            return event.entityStorage[event.attributeName];
        }            
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
model.Board.controlMethods.getRelatedEntities = function(event) {

    return event.entityStorage.children;
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

/***************************************************************/
/************************** List ******************************/
/***************************************************************/
model.List.controlMethods.newEntity = function() {
    // nothing do do here,  already built by Wakanda
};

// Read Bundle ,we should implement  all the methods (4 methods) of read bundle ( there is a dependency between the four methods )
    //allEntities

model.List.controlMethods.allEntities = function(event) {
        var allLists = [];
        try {
            wakTrello.getBoards(process.env.appkey, process.env.token, process.env.userNameTrello).forEach(function(item) {

                wakTrello.getListsOfABoard(process.env.appkey, process.env.token, item.id).forEach(function(item) {
                    var list = {};
                    list.ID = item.id;
                    list.name = item.name;
                    list.isClosed = item.closed;
                    list.idBoard = item.idBoard;
                    allLists.push(list);
                })

            });
        }
        catch (e) {
            throw e;
        }
        event.collectionStorage.elements = allLists;
    }
    
    //getCollectionLength

model.List.controlMethods.getCollectionLength = function(event) {
    return event.collectionStorage.elements.length;
};

// getEntityByPos
model.List.controlMethods.getEntityByPos = function(event) {
    var pos = event.position;
    var elements = event.collectionStorage.elements;
    var element = elements[pos];

    for (var i in element) {
        event.entityStorage[i] = element[i];
    }
};
// getAttributeValue
model.List.controlMethods.getAttributeValue = function(event) {


    if (event.attributeName === 'parent') {

        return ds.Board(event.entityStorage.idBoard);
    }
    else
        return event.entityStorage[event.attributeName];

};
//getEntityByKey
model.List.controlMethods.getEntityByKey = function(event) {
    var element;
    var idBoard = event.key[0];
    try {

        element = wakTrello.getListByID(process.env.appkey, process.env.token, idBoard);
    }
    catch (e) {
        throw e;
    }
    if (element && element.id) {
        event.entityStorage.ID = element.id;
        event.entityStorage.name = element.name;
        event.entityStorage.isClosed = element.closed;
        event.entityStorage.idBoard = element.idBoard;
        return true;
    }
    return false;
}
// getRelatedKey
model.List.controlMethods.getRelatedKey = function(event) {

    return event.entityStorage.idBoard //  I store the idBoard on list entity  
        // if not we could do : 
        //return  event.entityStorage.parent (will call ds.Board .....)                        


}
// getRelatedEntity
model.List.controlMethods.getRelatedEntity = function(event) {

    return event.entityStorage.parent;

}

//getStamp
model.List.controlMethods.getStamp = function(event) {
    // je ne vois pas l'utilité de cette methode 
    return 10;

}

//newCollection

model.List.controlMethods.newCollection = function(event) {

    event.collectionStorage.elements = [];

}

//addEntityToCollection
model.List.controlMethods.addEntityToCollection = function(event) {
	var item = event.entity;
	var elements = event.collectionStorage.elements;
    var list = {};
    list.ID = item.ID;
    list.name = item.name;
    list.isClosed = item.closed;
    list.idBoard = item.idBoard;
    elements.push(list);
    event.collectionStorage.elements = elements;
}

//queryByString
model.List.controlMethods.queryByString = function(event) {



    if (event.queryString[0] === "+") {
        var elements = [];
        var idBoard = event.queryString.split("+")[1];
        wakTrello.getListsOfABoard(process.env.appkey, process.env.token, idBoard).forEach(function(item) {
            var list = {};
            list.ID = item.id;
            list.name = item.name;
            list.isClosed = item.closed;
            list.idBoard = item.idBoard;
            elements.push(list);
        })
        event.collectionStorage.elements = elements;
        return true;
    }
    else
        return false; // falls back on queryByCriteria()
}

// queryByCriteria 
model.List.controlMethods.queryByCriteria = function(event) {
  
    var listsToBeReturned=[];
    var criterias = event.query;
    if (criterias.length == 1)
	{
		var criteria = criterias[0]; 
		var val ;   
		var attributeName=criteria.attributeName;
		var beginWith = false;
		var endWith = false;
		var equal=false;
		if (criteria.value[0] == '*')
		{
			endWith = true;
			val = criteria.value.substring(1, criteria.value.length);
		}
		else if (criteria.value[criteria.value.length-1] == '*')
		{
			beginWith = true;
			val = criteria.value.substring(0, criteria.value.length-1);
		}
		else {
			equal=true;
			val = criteria.value;
			
		}
      if(beginWith){
      var lists=ds.List.all();
      
      	
      	lists.forEach(function(item){
      		var ok=false;
      			var subname = item[attributeName].substring(0,val.length);
      		if(subname.toLowerCase()==val.toLowerCase()) 
      		  ok=true;
      		
         if(ok){
         	
         	var list = {};
            list.ID = item.ID;
            list.name = item.name;
            list.isClosed = item.closed;
            list.idBoard = item.idBoard;
            listsToBeReturned.push(list);
         }	
      	})
      }else if(endWith){
      		
      	var lists=ds.List.all();
      	
      	lists.forEach(function(item){
      		var ok=false;
      		
      		var subname = item[attributeName].substring(item[attributeName].length-val.length);
      		if(subname.toLowerCase()==val.toLowerCase()) 
      		  ok=true;
      		
         if(ok){
         	 
         	var list = {};
            list.ID = item.ID;
            list.name = item.name;
            list.isClosed = item.closed;
            list.idBoard = item.idBoard;
            listsToBeReturned.push(list);
         }
      		
      	})
      }
      else {
      	
      	var lists=ds.List.all();
      	
      	lists.forEach(function(item){
      		var ok=false;
      		 
      		var subname = item[attributeName].substring(item[attributeName].length-val.length);
      		if(subname.toLowerCase()==val.toLowerCase()) 
      		  ok=true;
      		
         if(ok){
         	 
         	var list = {};
            list.ID = item.ID;
            list.name = item.name;
            list.isClosed = item.closed;
            list.idBoard = item.idBoard;
            listsToBeReturned.push(list);
         }
      		
      	})
      	
      }
 
     event.collectionStorage.elements = listsToBeReturned;
     return true;
   }
   return false;
}


/***************************************************************/
/************************** Card ******************************/
/***************************************************************/
//read bundle
model.Card.controlMethods.allEntities = function(event) {
    var allCards = [];
    try {
        wakTrello.getBoards(process.env.appkey, process.env.token, process.env.userNameTrello).forEach(function(item) {

            wakTrello.getListsOfABoard(process.env.appkey, process.env.token, item.id).forEach(function(item) {

                wakTrello.getCardsOfAlist(process.env.appkey, process.env.token, item.id).forEach(function(item) {

                    var card = {};
                    card.ID = item.id;
                    card.name = item.name;
                    card.isClosed = item.closed;
                    allCards.push(card);
                })

            })

        });
    }
    catch (e) {
        throw e;
    }
    event.collectionStorage.elements = allCards;
};
//getCollectionLength

model.Card.controlMethods.getCollectionLength = function(event) {
    return event.collectionStorage.elements.length;
};

// getEntityByPos
model.Card.controlMethods.getEntityByPos = function(event) {
    var pos = event.position;
    var elements = event.collectionStorage.elements;
    var element = elements[pos];

    for (var i in element) {
        event.entityStorage[i] = element[i];
    }
};
// getAttributeValue

model.Card.controlMethods.getAttributeValue = function(event) {
    return event.entityStorage[event.attributeName];
};
//End read bundle 
model.Card.controlMethods.getEntityByKey = function(event) {

    var element;
    var idCard = event.key[0];
    try {

        element = wakTrello.getCardByID(process.env.appkey, process.env.token, idCard);
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

model.Card.controlMethods.newEntity = function() {
    // nothing do do here,  already built by Wakanda
};

model.Card.controlMethods.dropEntity = function(event) {

        console.log("drop entity")
        if (event.entityStorage.ID != null) {
            try {
                wakTrello.deleteCardByID(process.env.appkey, process.env.token, event.entityStorage.ID);
            }
            catch (e) {
                throw e;
            }
        }
    }
    // dropEntities need allEntities to be implemented 
model.Card.controlMethods.dropEntities = function(event) {

    var allCards = event.collectionStorage.elements;
    allCards.forEach(function(item) {
        try {
            wakTrello.deleteCardByID(process.env.appkey, process.env.token, item.ID)
        }
        catch (e) {
            throw e;
        }
    });
    console.log("dropEntities");

}


//Member   Empty Class !



model.Member.controlMethods.allEntities = function(event) {
	
         var elements = [] ;
       
        event.collectionStorage.elements = elements;
    }
    //getCollectionLength
model.Member.controlMethods.getCollectionLength = function(event) {
	
    return event.collectionStorage.elements.length;
};

// getEntityByPos
model.Member.controlMethods.getEntityByPos = function(event) {
    var pos = event.position;
    var elements = event.collectionStorage.elements;
    var element = elements[pos];

    for (var i in element) {
        event.entityStorage[i] = element[i];
    }
};
// getAttributeValue

model.Member.controlMethods.getAttributeValue = function(event) {
        if (event.attributeName === 'children') {
            if(event.onlyLightValue){
                return {deferred: true};
            } else {
            	if(event.entityStorage.ID!=null)
                return ds.List.query('+' + event.entityStorage.ID)
            };            
        } else {
            return event.entityStorage[event.attributeName];
        }            
    };



model.Member.controlMethods.countEntities = function(event) {
    // I think in event object we should have all entities
    var coll =ds.Member.all();
    return coll.length

}








