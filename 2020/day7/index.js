let isTest = false;

let path = require('path');
let Day = require(path.join(__dirname, '..', '..', 'helpers', 'Day'));
let general = require(path.join(__dirname, '..', '..', 'helpers', 'general'));
let _ = require('lodash');
let day = new Day(2020, 7, isTest);
day.task(1, part1);
day.task(2, part2);

/*
* -------------------------------------------------------------------------------------
* Solution below
* -------------------------------------------------------------------------------------
*/

function Node(key) {
  return {
    key,
    parents: {
      // key: {
      //  ref: node,
      //  weight: sum
      // }
    },
    children: {
      // key: {
      //  ref: node,
      //  weight: sum
      // }
    },
    addParent(key, ref, weight) {
      if (this.parents[key]) {
        return;
      }

      this.parents[key] = { ref, weight };
    },
    addChild(key, ref, weight) {
      if (this.children[key]) {
        return;
      }

      this.children[key] = { ref, weight };
    },
    getParent(key) {
      return this.parents[key];
    },
    getChild(key) {
      return this.children[key];
    }
  }
}

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

      currentNode.addChild(childKey, childNode, +weight);
      childNode.addParent(currentKey, currentNode, +weight);
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

function computeChildWight(node) {
  if (Object.keys(node.children).length === 0) {
    return 1;
  }

  const bagWeight = _.sumBy(Object.values(node.children), child => {
    return child.weight * computeChildWight(child.ref);
  })

  return bagWeight + 1;
}


function part1(data) {
  const nodesMap = initNodesMap(data);

  const parentsSet = new Set();
  collectParents(nodesMap['shiny gold'], parentsSet);

  return parentsSet.size;
}

function part2(data) {
  const nodesMap = initNodesMap(data);

  return computeChildWight(nodesMap['shiny gold']) - 1;
}
