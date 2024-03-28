'use strict';

const { filter } = require('jszip');
const { couldStartTrivia } = require('typescript');
/**
 * Example.easy - Easy usage
 */

const { Workbook, Topic, Zipper,Marker } = require('xmind');

const wb = new Workbook();
const topic = new Topic({sheet: wb.createSheet('sheet-1', 'central topic')});

const zip = new Zipper({path: '/tmp', workbook: wb});
const marker = new Marker();




function validate(topic){
  //console.log(topic.cid())
  let nodeList =[];
  topic.parent = topic;
  console.log(topic.children);
  nodeList.push(topic);
  console.log(nodeList.length);
  let visitNumber = 0;
  let flag = false;
      while (nodeList.length>0 && flag !=true){
        visitNumber = visitNumber + 1;
        console.log(visitNumber);
        const node = nodeList.pop();
        if(node !=undefined){
          visit(node);
        }
        else{
          flag = true;
        }
    //nodeList.pop(topic);
    let kids = topic.children;
    console.log("Children!!");
  //  console.log(topic.children);
    nodeList.push(kids);
  }
}

function visit(node){
  //console.log(node);
  //console.log(node.cids());
  const castNode = topic.find(node.cids()[0]);
 // console.log(castNode.title);
 // const parent = topic.find(topic.cid(castNode.parent().cid()));
  //console.log(castNode.getMarkers());
  const nodeMarkers = castNode.getMarkers();//typecast
  const parentMarkers = castNode.getMarkers();

 // console.log(nodeMarkers,parentMarkers);
  //console.log(castNode.cid());
//console.log(node.markers,nodeParent.markers);

  const validKid = isValidChild(nodeMarkers,parentMarkers);
  const isDuplicate = false;
  if(validKid &&  !isDuplicate){
    console.log("Node is good")
  }
  else{
    console.log("Node is bad")
    topic.on(topic.cid(node.cid())).marker('ERROR')
  }
}

function isValidChild(string1,string2){
//console.log(string1);
//console.log(string2);
return true;
}





// Just a test function to work with my sudo tree to get children
function childNodes(nodeMap,currentNode){
  console.log("currentNode",currentNode);
  console.log("map",nodeMap)
  console.log(typeof nodeMap.get(currentNode))
  return nodeMap.get(currentNode);
  //call callback.
 }
 
 
 
 //depthFirstSearch(rootTopic);
 //startNode = startTopic
 function depthFirstSearch(startNode,nodeMap){
  let counter = 0;
   const nodesToVisit = [startNode];
 
   while (nodesToVisit.length > 0){
    console.log(counter);

     const currentNode = nodesToVisit.pop();
     //validate(currentNode) validation goes here
     console.log(currentNode); // Just for testing
     
     //validateNode()
 
     if (childNodes(nodeMap,currentNode) != null){                      // If the current Node has children
       const childrenArray = childNodes(currentNode).reverse(); // Get it's children(doing a reverse so it's in postorder(left to right))
       childrenArray.forEach(element => {
         nodesToVisit.push(element)                             // Add each element to the stack of nodes we need to visit.
       });

     }
     counter = counter + 1;
   }

 }





topic
  .on()
  .add({title: 'main topic 1'})
  .add({title: 'main topic 2'})
  .add({title: 'main topic 2.2'})
  .add({title: 'main topic 3'})
  
  // .on(topic.cid('main topic 1'))
  // .add({title: 'subtopic 1 on main topic 1'})
  
  // .on(topic.cid('main topic 2'))
  // .marker(marker.smiley('cry'))
  // .add({title: 'subtopic 1 on main topic 2'})

  // .on(topic.cid('subtopic 1 on main topic 2'))
  // .add({title: 'test node'});

  // //Topic doesn't have a getId directly on it, apparently core.Topic is different than the Topic class.
  let nodeTree = new Map();
  const allNodes = topic.treeAsList();
  const rootNodeId = topic.sheet.getRootTopic().getId();
  //nodeTree.set(topic.id,[topic.getChildren.id]);
  //nodeTree.set(rootNodeId,[rootNodeId]);
  console.log("pre validate children!");

  console.log(allNodes.length);
  allNodes.forEach((node)=>
  {
    console.log(node.parent().getTitle());
    console.log(node.getTitle());
    if(!nodeTree.has(node.parent().getTitle())){
      console.log(node.parent().getTitle());
      if(node.parent().getTitle() ==='sheet-1'){
        console.log("NULL since top");
        nodeTree.set(node.getTitle(),[]);
      }
      else{
      //nodeTree.set(node.parent().title,[]); //if the nodeMap doesn't have this index, add it to the map
    }
  }
    else if (nodeTree.has(node.parent().getTitle())){
      nodeTree.get(node.parent().getTitle()).push(node.getTitle()); //otherwise we want to add this to the list of children of whatever parent it has.
    }
  }
  
  )
 // console.log(nodeTree);


//now have a node map.


  const filteredNodes = allNodes.filter((node)=>node.parent().getId() == rootNodeId); //all nodes that are children of root.
  // console.log(filteredNodes.length);
  // filteredNodes.forEach((node)=>console.log(node.getTitle()));
  // filteredNodes.forEach((node)=>console.log(node?.getMarkers()[0]?._initData.markerId));

  // let errorNodes = [];
  // errorNodes = filteredNodes.filter((node)=>node?.getMarkers()[0]?._initData.markerId == 'smiley-cry'); //any node in the set that has a cry marker.
  // console.log(errorNodes.length)

  // given a topic, get map from topic?
  // 1. Get all ids
  // 2. make map of each id to its children? ... might already have that
  // 3. Would need to iterate all node ids and match them to get the kvp<nodeID,[childrenids]>


console.log("starting dfs")
//console.log("topic id",topic.id)
depthFirstSearch(rootNodeId,nodeTree);



  console.log("end of script");

  

  // validate(topic);









zip.save().then(status => status && console.log('Saved.'));
