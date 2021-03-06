let isTest = false;

let path = require('path');
let Day = require(path.join(__dirname, '..', '..', 'helpers', 'Day'));
let _ = require('lodash');
let day = new Day(2020, 7, isTest);

/*
* -------------------------------------------------------------------------------------
* Solution below
* -------------------------------------------------------------------------------------
*/

let Node = require(path.join(__dirname, '..', '..', 'helpers', 'Node'));

function initNodesMap(data) {
  let nodesMap = {};

  data.split('\r\n').forEach(line => {
    let bags = line.match(/(\d+ )?\w+ \w+ bags?/g).map(b => b.replace(/ bags?/, ''));
    let currentKey = bags[0];
    let currentNode = nodesMap[currentKey] || new Node(currentKey)
    nodesMap[currentKey] = currentNode;

    for (let i = 1; i < bags.length; i++) {
      if (bags[i] === 'no other') {
        continue;
      }

      let weight = bags[i].match(/\d+/)[0];
      let childKey = bags[i].substring(weight.length + 1);
      let childNode = nodesMap[childKey] || new Node(childKey);
      nodesMap[childKey] = childNode

      currentNode.addChild(childKey, childNode, {weight: +weight});
      childNode.addParent(currentKey, currentNode, {weight: +weight});
    }
  })

  return nodesMap;
}

function collectParents(node, parentsSet) {
  Object.keys(node.parents).forEach(parentKey => {
    parentsSet.add(parentKey);
  })

  Object.values(node.parents).forEach(parent => {
    collectParents(parent.ref, parentsSet)
  })
}

function computeChildWeight(node) {
  if (Object.keys(node.children).length === 0) {
    return 1;
  }

  const bagWeight = _.sumBy(Object.values(node.children), child => {
    return child.weight * computeChildWeight(child.ref);
  })

  return bagWeight + 1;
}


day.task1(data => {
  const nodesMap = initNodesMap(data);

  const parentsSet = new Set();
  collectParents(nodesMap['shiny gold'], parentsSet);

  return parentsSet.size;
})


day.task2(data => {
  const nodesMap = initNodesMap(data);

  return computeChildWeight(nodesMap['shiny gold']) - 1;
})
