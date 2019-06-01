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
        this.outputLayer.calcValues();
	}
	
	improve(succesFactor) {
		this.layers.forEach((layer) => {
			layer.improve(succesFactor);
		})
	}
}

class Layer {
    constructor(n_nodes, prevLayer) {
        this.n_nodes = n_nodes;
        this.prevLayer = prevLayer;
        this.nodes = Array.from({length: this.n_nodes}, _ => (new Node(this.prevLayer)));
    }

    calcValues() {
        this.nodes.forEach(node => {
            node.calcValue();
        })
	}
	
	improve(succesFactor) {
		this.nodes.forEach((node) => {
			node.improve(succesFactor);
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
		return this.value;
	}
	
	improve(succesFactor) {
		this.connections.forEach((connection) => {
			connection.improve(succesFactor);
		})
	}
}

class Connection {
    constructor(refValue, weight = (Math.random() * 2 - 1)) {
        this.refValue = refValue;
        this.weight = weight;
        this.oldWeight = 0;
    }

    get value() {
        return this.refValue.value * this.weight;
    }

    improve(succesFactor) {
		let calc = this.weight - this.oldWeight;
		this.oldWeight = this.weight;
		if (succesFactor > 0) {
			this.weight += (calc * Math.random()) / succesFactor;
		} else if (succesFactor < 0) {
			this.weight -= (calc * Math.random()) / succesFactor;
		} else {
			this.weight += (Math.random() - 0,5) / 1000
		}
    } 
}

export {
    Network,
    Layer,
    Node,
    Connection,
}