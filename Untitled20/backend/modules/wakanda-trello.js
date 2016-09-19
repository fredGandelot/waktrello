 
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
