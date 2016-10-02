
var YoDebugVis = function() {

  var id = 1;
  var nodeList = [];
  var nodes;
  var edgeList = [];
  var edges;

  var addNode = function(_labelName) {
    nodeList.push({
      id: _labelName,
      label: _labelName
    });
  };

  var setNodeDataSet = function() {
    nodes = new vis.DataSet(nodeList);
  };

  var addEdge = function(_from, _to) {
    edgeList.push({
      from: _from,
      to: _to
    });
  };

  var setEdgeDataSet = function() {
    edges = new vis.DataSet(edgeList);
  };
/*
  // create an array with nodes
  var nodes = new vis.DataSet([
    {id: 1, label: 'Node 1'},
    {id: 2, label: 'Node 2'},
    {id: 3, label: 'Node 3'},
    {id: 4, label: 'Node 4'},
    {id: 5, label: 'Node 5'}
  ]);

  // create an array with edges
  var edges = new vis.DataSet([
    {from: 2, to: 4},
    {from: 1, to: 3},
    {from: 1, to: 2},
    {from: 2, to: 5}
  ]);
*/

  window.onload = function() {
    setNodeDataSet();
    setEdgeDataSet();

    var data = {
      nodes: nodes,
      edges: edges
    };
    var options = {
      edges: {
        arrows: {
          to: {enabled: true, scaleFactor: 1},
          middle: {enabled: false, scaleFactor: 1},
          from: {enabled: false, scaleFactor: 1}
        }
      }
    };

    // create a network
    var container = document.getElementById('mynetwork');

    // initialize your network!
    var network = new vis.Network(container, data, options);
  };

  return {
    addNode: addNode,
    setNodeDataSet: setNodeDataSet,
    addEdge: addEdge,
    setEdgeDataSet: setEdgeDataSet
  }
};