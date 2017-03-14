
model.Board = new DataClass("Boards", "public");
model.Board.ID = new Attribute("storage", "string", "key", {readOnly: true});
model.Board.name = new Attribute("storage","string");
model.Board.desc = new Attribute("storage","string");
model.Board.children = new Attribute("relatedEntities", "Lists", "parent", {reversePath: true}); 
 


model.List=new DataClass("Lists","public");
model.List.ID=new Attribute("storage","string","key",{readOnly:true});
model.List.name=new Attribute("storage","string");
model.List.isClosed=new Attribute("storage","bool");
model.List.idBoard=new Attribute("storage","string");
model.List.parent = new Attribute("relatedEntity", "Board", "Board");
model.List.children = new Attribute("relatedEntities", "Cards", "parent", {reversePath: true});




model.Card= new DataClass("Cards","public");
model.Card.ID=new Attribute("storage","string","key",{readOnly :true});
model.Card.name= new Attribute("storage","string");
model.Card.isClosed=new Attribute("storage","bool");
model.Card.desc= new Attribute("storage","string");
model.List.idList=new Attribute("storage","string");
model.Card.parent = new Attribute("relatedEntity", "List", "List");


model.Member = new DataClass("Members", "public");
model.Member.ID = new Attribute("storage", "string", "key", {readOnly: true});
model.Member.fullname = new Attribute("storage","string");
model.Member.username = new Attribute("storage","string");
model.Member.properties.scope="publicOnServer";


include("./methods/Board/Board-methods.js");
include("./controller.js")