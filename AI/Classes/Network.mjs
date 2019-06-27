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
	
	improve(succesFactor = 0) {
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
        let combinedConnectionValues = 0
        this.connections.forEach(connection => {
            combinedConnectionValues += connection.value;
        })
		this.value = this.normalizeValue(combinedConnectionValues);
		return this.value;
    }
    
    normalizeValue(valuesSum) {
        return valuesSum / (Math.abs(valuesSum) + 1);
    }
	
	improve(succesFactor) {
        let bestConnection = this.selectBestConnection();
        bestConnection.increaseDependence();
        let worstConnection = this.selectWorstConnection();
        worstConnection.decreaseDependence();
    }
    
    selectBestConnection() {
        let bestConnection = this.connections.reduce((prev, current) => {
            return (prev.refValue.value > current.refValue.value) ? prev : current
        })
        return bestConnection;
    }

    selectWorstConnection() {
        let worstConnection = this.connections.reduce((prev, current) => {
            return (prev.refValue.value < current.refValue.value) ? prev : current
        })
        return worstConnection;
    }
}

class Connection {
    constructor(refValue, min = -100, max = 100, distribution = this.defaultWeightDistribution) {
        this.refValue = refValue;
        this.weight = distribution(min, max);
    }

    defaultWeightDistribution(min, max, onlyIntegers = true) {
        min = Math.ceil(min);
        max = Math.floor(max);
        let weight = Math.random() * (max - min + 1) + min;
        if (onlyIntegers) {
            return Math.floor(weight);
        }
        return weight;
    }

    get value() {
        return this.refValue.value * this.weight;
    }

    //makes the connection more significant
    increaseDependence(correlation = 1) {
        if (this.refValue < 0) {
            this.weight -= correlation;
        } else if (this.refValue > 0) {
            this.weight += correlation;
        }
    }

    decreaseDependence() {
        if (this.weight > 0) {
            this.weight --;
        } else if (this.weight < 0) {
            this.weight ++;
        }
    }
}

export {
    Network,
    Layer,
    Node,
    Connection,
}