import { Network, Layer, Node, Connection } from "./Classes/Network.mjs";

var inputNode = {value: 1};
var outputNode = {value: 1};

var layersConstruct= {
    inputLayer: {
        n_nodes: 1,
        nodes: [
            inputNode,
        ],
    },
    outputLayer: {
        n_nodes: 1,
        nodes: [
            outputNode,
        ],
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