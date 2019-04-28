class Network {
    constructor(layersConstruct) {
        this.inputLayer = layersConstruct.inputLayer;
        this.setSecretLayers(layersConstruct.secretLayers);
        this.setOutputLayer(layersConstruct.outputLayer, this.layers[this.layers.length - 1]);
    }

    setSecretLayers(secretLayers) {
        this.layers = [new Layer(secretLayers[0].n_nodes, this.inputLayer)];
        for (let layerIndex = 1; layerIndex < secretLayers.length; layerIndex++) {
            this.layers.push(new Layer(secretLayers[layerIndex].n_nodes, this.layers[layerIndex - 1]));            
        }
    }

    setOutputLayer(outputLayer, lastSecretLayer) {
        this.outputLayer = new Layer(outputLayer.n_nodes, lastSecretLayer);
    }

    calcOutput() {
        this.layers.forEach(layer => {
            layer.calcValues();
        })
        console.log("calc output");
        this.outputLayer.calcValues();
    }
}

class Layer {
    constructor(n_nodes, prevLayer) {
        this.n_nodes = n_nodes;
        this.prevLayer = prevLayer;
        this.nodes = Array.from({length: this.n_nodes}, _ => (new Node(this.prevLayer)));
    }

    calcValues() {
        console.log("calc Layer");
        this.nodes.forEach(node => {
            node.calcValue();
        })
    }
}

class Node {
    constructor(prevLayer) {
        this.value = 0;
        this.connections = [];
        for (let nodeIndex = 0; nodeIndex < prevLayer.n_nodes; nodeIndex++) {
            this.connections.push(new Connection(prevLayer.nodes[nodeIndex]));
        }
    }

    calcValue() {
        this.connections.forEach(connection => {
            this.value += connection.value;
        })
        this.value = this.value / this.connections.length;
        console.log(this.value);
    }
}

class Connection {
    constructor(refValue, weight = (Math.random() * 2 - 1)) {
        this.refValue = refValue;
        this.weight = weight;
    }

    get value() {
        return this.refValue.value * this.weight;
    }
}

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

console.log("finished");