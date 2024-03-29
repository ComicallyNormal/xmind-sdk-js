
'use strict';

/**
 * Loader fully example
 */

const {Topic, Zipper,Loader,Marker} = require('xmind');
// const {Loader} = require('xmind')
// const {Topic} = require('../dist/')
// const {Zipper} = require('../dist/')
// const {Loader} = require('../dist/')
// import {Loader} from '../src/utils/loader'
const JSZip = require('jszip');
const fs = require('fs');
const path = require('path');
const v4 = require('uuid').v4;
const marker = new Marker();


const main = async () => {
  const file = fs.readFileSync(path.resolve(__dirname, '../test/fixtures/gw.xmind'));
  const loader = new Loader({ctx: await JSZip.loadAsync(file)});
  const sheets = await loader.loadSheets();
  
  let sheet;
  for (const key in sheets) {
    if (sheets[key].getTitle() === 'gw') {
      sheet = sheets[key];
    }
  }
  
  const topic = new Topic({sheet: sheet, isLoaded: true});


  topic.processAndAttachImportData();
  // //Topic doesn't have a getId directly on it, apparently core.Topic is different than the Topic class.
  let nodeTree = new Map();
  const allNodes = topic.treeAsList();
  const rootNodeId = topic.sheet.getRootTopic().getId();
  //nodeTree.set(topic.id,[topic.getChildren.id]);
  //nodeTree.set(rootNodeId,[rootNodeId]);
  console.log("pre validate children!");

  console.log("allNodes length: ",allNodes.length);
  allNodes.forEach((node)=>
  {
    console.log("parentTitle",node.parent().getTitle());
    console.log("child",node.getTitle());
    if(!nodeTree.has(node.parent().getTitle())){
      console.log(node.parent().getTitle());
      if(node.parent().getTitle() ==='gw'){
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




  // console.log(topic.cid("npm")); //assuming you have added npm as a node on the ui and saved to the backing file.
//  topic.on(topic.cid("npm")).add({title:"run"});


// console.log("microsoft object: "+topic.find(topic.cid("Microsoft")).getTitle()+ " "+ topic.find(topic.cid("Microsoft")).getMarkers());

console.log("starting dfs")
//console.log("topic id",topic.id)
depthFirstSearch(topic,"Central Topic",nodeTree);



  console.log("end of script");


// console.log(topic.find(topic.cid("Microsoft"))._data)
  const zip = new Zipper({ path: '/tmp', workbook: loader.getWorkbook() });
  return zip.save().then(status => status && console.info('saved!'));


//topic.validate() (will call dfs internally)
//dfs(){ for node in topic{ if not nodeIsValidNode(node) ->"Error"} } 


};

main();




function isValidChild(childString,parentString){

    const allowedEmojiMap = new Map();
    allowedEmojiMap.set("gw_event", ["gw_coverage"]);
    allowedEmojiMap.set("gw_riskobject", ["gw_coverage","gw_line"]);
    allowedEmojiMap.set("gw_limit", ["gw_coverage"]);
    allowedEmojiMap.set("gw_deductible", ["gw_coverage"]);
    allowedEmojiMap.set("gw_exclusions", ["gw_clausecategory","gw_riskobject"]);
    allowedEmojiMap.set("gw_exposure", ["gw_line","gw_riskobject"]);
    allowedEmojiMap.set("gw_condition", ["gw_clausecategory","gw_riskobject"]);
    allowedEmojiMap.set("gw_coverage", ["gw_clausecategory","gw_riskobject"]);
    allowedEmojiMap.set("gw_clausecategory", ["gw_riskobject"]);
    allowedEmojiMap.set("gw_riskobject", ["gw_line"]);
    allowedEmojiMap.set("gw_line", ["gw_product"]);
    allowedEmojiMap.set("gw_product", ["gw_product"]);

    


    let listOfValidParents = allowedEmojiMap.get(childString);
      
  console.log("child",childString);
  console.log("parent",parentString);
    if(listOfValidParents!=undefined){
      console.log("valid parents list",listOfValidParents);
          //get list of only emojis that match our parent emoji, if the list is empty, 
      //then our parent emoji is not a valid parent of our current emoji. if it is there, we will have a list of one. 
       
      let filteredEmojis = listOfValidParents.filter((emoji)=>{return emoji===parentString}); 
  
      if(filteredEmojis.length === 1){
        console.log("relationship was valid")
        return true
      }
      else{
        console.log("relationship was NOT valid")
        console.log(filteredEmojis.length);

        return false
      }
    }

 // console.log("filtered emojis",listOfValidParents);

  return false;
  }
  
  
  // Just a test function to work with my sudo tree to get children
  function childNodes(nodeMap,currentNodeTitle){
    console.log("currentNode",currentNodeTitle);
    console.log("typeof currentNode",typeof currentNodeTitle);
    console.log("map",nodeMap);
    console.log("typeof nodeMap",typeof nodeMap);
    console.log( nodeMap.get(currentNodeTitle));
    if(typeof nodeMap.get(currentNodeTitle)===undefined){
      //console.log("undef");
      return [];
    }
    return nodeMap.get(currentNodeTitle);
    //call callback.
   }
   
   
   
   //depthFirstSearch(rootTopic);
   //startNode = startTopic
   function depthFirstSearch(topic,startNode,nodeMap){
    let counter = 0;
     const nodesToVisit = [startNode];
   
     while (nodesToVisit.length > 0){
      console.log(counter);
  
       const currentNode = nodesToVisit.pop();
       //validate(currentNode) validation goes here
       //console.log(currentNode); // Just for testing
       
       //validateNode()
   
       if (childNodes(nodeMap,currentNode) != null){                      // If the current Node has children
  
        let returnArray = childNodes(nodeMap,currentNode);
        //console.log("return array",returnArray);
         const childrenArray = returnArray.reverse(); // Get it's children(doing a reverse so it's in postorder(left to right))
         childrenArray.forEach(element => {
           nodesToVisit.push(element)                             // Add each element to the stack of nodes we need to visit.
         });
       }
  
       let topicNode = topic.find(topic.cid(currentNode)); //finds a node given title
       let nodeEmoji = topicNode.getMarkers()[0]?._initData.markerId ;
       let parentTitle = topic.find(topic.cid(currentNode))?.parent().getTitle()
  
       let parentNodeEmoji = topic.find(topic.cid(parentTitle))?.getMarkers()[0]?._initData.markerId;
      //  let parentNodeEmoji = "GW";
      //  console.log(topic.find(topic.cid("Microsoft"))._data)
  
      let isValid = isValidChild(nodeEmoji,parentNodeEmoji);
       if(!isValid){
      
        console.log("child not valid",currentNode, "setting cry emoji on it");
        //topic.on(topic.cid(currentNode)).marker(marker.smiley('cry'));
       }
       console.log(currentNode);
       counter = counter + 1;
     }
  
   }
  
  

  
  
   // console.log(nodeTree);
  
  
  //now have a node map.
  
  
    //const filteredNodes = allNodes.filter((node)=>node.parent().getId() == rootNodeId); //all nodes that are children of root.
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
  
  




