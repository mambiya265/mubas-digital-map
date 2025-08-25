// Pattern fills for Leaflet
L.Pattern = L.Class.extend({
    initialize: function (options) {
        L.setOptions(this, options);
    },

    onAdd: function (map) {
        this._map = map;

        if (!this._container) {
            this._initContainer();
        }

        map._panes.overlayPane.appendChild(this._container);
    },

    onRemove: function (map) {
        map._panes.overlayPane.removeChild(this._container);
        this._map = null;
    },

    _initContainer: function () {
        this._container = L.DomUtil.create('canvas', 'leaflet-layer');
        this._container.style.position = 'absolute';
        this._container.style.pointerEvents = 'none';
    }
});

L.StripePattern = L.Pattern.extend({
    options: {
        weight: 4,
        spaceWeight: 4,
        color: '#000000',
        spaceColor: '#ffffff',
        angle: 45
    },

    _initContainer: function () {
        var patternCanvas = document.createElement('canvas');
        var patternCtx = patternCanvas.getContext('2d');
        
        var size = this.options.weight + this.options.spaceWeight;
        patternCanvas.width = size;
        patternCanvas.height = size;
        
        patternCtx.fillStyle = this.options.spaceColor;
        patternCtx.fillRect(0, 0, size, size);
        
        patternCtx.fillStyle = this.options.color;
        patternCtx.fillRect(0, 0, this.options.weight, size);
        
        this._pattern = patternCanvas;
    }
});

L.pattern = function (options) {
    return new L.Pattern(options);
};

L.stripePattern = function (options) {
    return new L.StripePattern(options);
};