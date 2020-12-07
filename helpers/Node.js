function Node(key) {
  return {
    key,
    parents: {
      // [key]: {
      //  ref: node,
      //  ...nodeData
      // }
    },
    children: {
      // [key]: {
      //  ref: node,
      //  ...nodeData
      // }
    },
    //..nodeData,
    addParent(key, ref, nodeData) {
      if (this.parents[key]) {
        return;
      }

      this.parents[key] = { ref, ...nodeData };
    },
    addChild(key, ref, nodeData) {
      if (this.children[key]) {
        return;
      }

      this.children[key] = { ref, ...nodeData };
    },
    getParent(key) {
      return this.parents[key];
    },
    getChild(key) {
      return this.children[key];
    }
  }
}

module.exports = Node;
