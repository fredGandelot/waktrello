var appkey = "f527fe40338800eec3c64e8548c29924";
var token = "347f9c1d1a527bec54bbee6d3e40810e52d3e93c1c1e687bb9c69e501e0ff26c";
var username = 'elbouhassaniomar1'
var wakTrello = require('wakanda-trello')
 
// Read Bundle ,we should implement  all the methods (4 methods) of read bundle ( there is a dependency between the four methods )

//allEntities
model.Board.controlMethods.allEntities = function(event) {
    var elements = [];


    wakTrello.getBoards(appkey, token, username).forEach(function(item) {
        var elem = {};
        elem.ID = item.id;
        elem.name = item.name;
        elem.desc = item.desc;
        elements.push(elem);
    });
    console.log(elements);

    event.collectionStorage.elements = elements;

}
//getCollectionLength
model.Board.controlMethods.getCollectionLength = function(event) {
    var collectionLength = event.collectionStorage.elements.length;
    return collectionLength;
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
if (event.attributeName === 'parent')
	{
		if (event.onlyLightValue)
			return {deferred: true};
		else
			return ds.Folder(event.entityStorage.parentId);
	}
	else
		return event.entityStorage[event.attributeName];
  
};