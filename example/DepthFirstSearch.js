'use strict';

/**
 * DFS
 */

//          1
//          |
//        /   \
//       /     \
//      2       3
//    / | \    / \
//   4  5  6  7   8
// Returns 1 2 4 5 6 3 7 8

// Sudo graph with a map of ints.
const nodeMap = new Map();
nodeMap.set(1, [2,3]);
nodeMap.set(2, [4,5,6]);
nodeMap.set (3, [7,8]);

// Just a test function to work with my sudo tree to get children
function childNodes(currentNode){
 return nodeMap.get(currentNode);
 //call callback.
}



//depthFirstSearch(rootTopic);
//startNode = startTopic
function depthFirstSearch(startNode){
  
  const nodesToVisit = [startNode];

  while (nodesToVisit.length > 0){
    const currentNode = nodesToVisit.pop();
    //validate(currentNode) validation goes here
    console.log(currentNode); // Just for testing
    
    //validateNode()

    if (childNodes(currentNode) != null){                      // If the current Node has children
      const childrenArray = childNodes(currentNode).reverse(); // Get it's children(doing a reverse so it's in postorder(left to right))
      childrenArray.forEach(element => {
        nodesToVisit.push(element)                             // Add each element to the stack of nodes we need to visit.
      });
    }
  }
}