  
//GET   (Read)

 exports.getBoardByID=function(appkey,token,idBoard){
 	
 	var request='https://api.trello.com/1/boards/'+idBoard+'?lists=open&list_fields=name&fields=name,desc&key='+appkey+'&token='+token ;
	var xhr=new XMLHttpRequest();
    xhr.open('GET',request,true);
    xhr.send();
	return JSON.parse(xhr.responseText);
 	
 	
 }
exports.getBoards = function (appkey,token,username) {
	var request='https://api.trello.com/1/members/'+username+'/boards?lists=open&list_fields=name&fields=name,desc&key='+appkey+'&token='+token ;
	var xhr=new XMLHttpRequest();
    xhr.open('GET',request,true);
    xhr.send();
	return JSON.parse(xhr.responseText);
};
exports.getListsOfABoard=function(appkey,token,idBoard){
    var request='https://api.trello.com/1/boards/'+idBoard+'/lists?key='+appkey+'&token='+token ;

	var xhr=new XMLHttpRequest();
    xhr.open('GET',request,true);
    xhr.send();
	return JSON.parse(xhr.responseText);
}

exports.getCardsOfAlist=function(appkey,token,idList){
	
	var request='https://api.trello.com/1/lists/'+idList+'/cards?key='+appkey+'&token='+token ;
	var xhr=new XMLHttpRequest();
    xhr.open('GET',request,true);
    xhr.send();
	return JSON.parse(xhr.responseText);
}
exports.getMembersOfABoard=function(appkey,token,idBoard){	
	var request='https://api.trello.com/1/boards/'+idBoard+'/members?key='+appkey+'&token='+token ;
	var xhr=new XMLHttpRequest();
    xhr.open('GET',request,true);
    xhr.send();
	return JSON.parse(xhr.responseText);
}

exports.getCardByID=function(appkey,token,idCard){
	
	var request='https://api.trello.com/1/Card/'+idCard+'?&key='+appkey+'&token='+token ;
	var xhr=new XMLHttpRequest();
    xhr.open('GET',request,true);
    xhr.send();
	return JSON.parse(xhr.responseText);
	
}

// POST
exports.createNewCard=function(appkey,token,idList,card){	
	var request='https://api.trello.com/1/cards?key='+appkey+'&token='+token+'&idList='+idList+'&name='+card.name+'&desc='+card.desc+'&due=';
	var xhr=new XMLHttpRequest();
    xhr.open('POST',request,true);
    xhr.send();
	return JSON.parse(xhr.responseText)
 
}

exports.createNewBoard=function(appkey,token,board){
	var request='https://api.trello.com/1/boards?key='+appkey+'&token='+token+'&name='+board.name+'&desc='+board.desc;
	var xhr=new XMLHttpRequest();
    xhr.open('POST',request,true);
    xhr.send();
	return JSON.parse(xhr.responseText)	
}

// PUT   

exports.renameCard=function(appkey,token,idCard,value){
	var request='https://api.trello.com/1/cards/'+idCard+'/name'+'?key='+appkey+'&token='+token+'&value='+value;
	var xhr=new XMLHttpRequest();
    xhr.open('PUT',request,true);
    xhr.send();
	return JSON.parse(xhr.responseText)
}
exports.renameBoard=function(appkey,token,idBoard,newName){

	var request='https://api.trello.com/1/board/'+idBoard+'/name'+'?key='+appkey+'&token='+token+'&value='+newName;
	var xhr=new XMLHttpRequest();
    xhr.open('PUT',request,true);
    xhr.send();
	return JSON.parse(xhr.responseText)
	
}



// DELETE 
exports.deleteCardByID=function(appkey,token,idCard){
	
	var request='https://api.trello.com/1/Card/'+idCard+'?key='+appkey+'&token='+token ;
	var xhr=new XMLHttpRequest();
    xhr.open('DELETE',request,true);
    xhr.send();
	return JSON.parse(xhr.responseText);
}








 
