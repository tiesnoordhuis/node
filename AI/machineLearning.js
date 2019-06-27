import { Network, Layer, Node, Connection } from "./Classes/Network.mjs";

var inputNodes = [{value: 1}, {value: 0.5}];
var outputNodes = [{value: 0}, {value: 0}];

var layersConstruct= {
    inputLayer: {
        n_nodes: 2,
        nodes: inputNodes,
    },
    outputLayer: {
        n_nodes: 2,
        nodes: outputNodes,
    },
    secretLayers: [
        {n_nodes: 5},
        {n_nodes: 5},
        {n_nodes: 5},
    ],
}

var test = new Network(layersConstruct);
test.calcOutput();
console.log(test.outputLayer.nodes[0].value)
test.improve();
test.calcOutput();
console.log(test.outputLayer.nodes[0].value)
test.improve();
test.calcOutput();
console.log(test.outputLayer.nodes[0].value)
test.improve();
test.calcOutput();
console.log(test.outputLayer.nodes[0].value)
test.improve();
test.calcOutput();
console.log(test.outputLayer.nodes[0].value)
test.improve();
test.calcOutput();
console.log(test.outputLayer.nodes[0].value)
test.improve();
test.calcOutput();
console.log(test.outputLayer.nodes[0].value)

console.log("finished");