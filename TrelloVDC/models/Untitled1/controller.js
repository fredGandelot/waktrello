
var appkey="f527fe40338800eec3c64e8548c29924";
var token="347f9c1d1a527bec54bbee6d3e40810e52d3e93c1c1e687bb9c69e501e0ff26c";
var username='elbouhassaniomar1'
 var wakTrello= require('wakanda-trello')
 
 model.Board.controlMethods.allEntities=function(event){
	var elements = [];
	
	
	wakTrello.getBoards(appkey,token,username).forEach(function(item){
		var elem = {};
		elem.ID = item.id;
		elem.name = item.name;
		elem.desc = item.desc;
		elements.push(elem);
	});
	console.log(elements);
 
	event.collectionStorage.elements = elements; 
	 
}



