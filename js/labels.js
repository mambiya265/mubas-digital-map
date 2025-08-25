// Label handling for QGIS2Web
var labels = {
    // Label collision detection and management
    labelEngine: null,
    
    init: function() {
        // Initialize label engine if labelgun is available
        if (typeof labelgun !== 'undefined') {
            this.labelEngine = new labelgun.default(hideLabel, showLabel);
        }
    },
    
    addLabel: function(layer, latlng, text, options) {
        if (!text || text === '') return;
        
        var label = L.marker(latlng, {
            icon: L.divIcon({
                className: 'leaflet-label',
                html: text,
                iconSize: [100, 20],
                iconAnchor: [50, 10]
            })
        });
        
        if (this.labelEngine && options && options.weight) {
            this.labelEngine.ingestLabel({
                x: latlng.lng,
                y: latlng.lat,
                width: 100,
                height: 20,
                weight: options.weight,
                labelObject: label
            });
        }
        
        return label;
    },
    
    updateLabels: function(map) {
        if (this.labelEngine) {
            this.labelEngine.update();
        }
    }
};

function hideLabel(label) {
    if (label.labelObject && label.labelObject._icon) {
        label.labelObject._icon.style.display = 'none';
    }
}

function showLabel(label) {
    if (label.labelObject && label.labelObject._icon) {
        label.labelObject._icon.style.display = 'block';
    }
}

// Initialize labels when script loads
labels.init();