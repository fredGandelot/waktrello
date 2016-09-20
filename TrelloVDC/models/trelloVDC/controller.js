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
                if (orderBy2.ascending) {

                    if (s1[orderBy2.attname] < s2[orderBy2.attname]) {
                        return 1;
                    }
                    else
                        return -1;
                }
            }
            else
                return 1;
        }
        else {
            if (s2[orderBy1.attname] < s1[orderBy1.attname])
                return -1;
            else if (s2[orderBy1.attname] == s1[orderBy1.attname]) {
                if (orderBy2.ascending) {

                    if (s1[orderBy2.attname] < s2[orderBy2.attname]) {
                        return 1;
                    }
                    else
                        return -1;
                }
            }
            else
                return 1;
        }

    });

    // Set sort entityCollection
    event.sortedCollectionStorage.elements = elements;

};