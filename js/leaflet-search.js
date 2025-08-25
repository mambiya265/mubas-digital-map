// Search control for Leaflet
L.Control.Search = L.Control.extend({
    options: {
        position: 'topleft',
        layer: null,
        propertyName: 'name',
        marker: true,
        moveToLocation: function(latlng, title, map) {
            map.setView(latlng, 15);
        }
    },
    
    onAdd: function(map) {
        this._map = map;
        
        var container = L.DomUtil.create('div', 'leaflet-control-search leaflet-bar');
        
        this._input = L.DomUtil.create('input', 'search-input', container);
        this._input.type = 'text';
        this._input.placeholder = 'Search...';
        
        this._button = L.DomUtil.create('button', 'search-button', container);
        this._button.innerHTML = '🔍';
        
        this._tooltip = L.DomUtil.create('div', 'search-tooltip', container);
        this._tooltip.style.display = 'none';
        
        L.DomEvent.on(this._input, 'input', this._onInput, this);
        L.DomEvent.on(this._input, 'keydown', this._onKeydown, this);
        L.DomEvent.on(this._button, 'click', this._onButtonClick, this);
        L.DomEvent.disableClickPropagation(container);
        
        return container;
    },
    
    _onInput: function(e) {
        var query = e.target.value.toLowerCase();
        if (query.length < 2) {
            this._hideTooltip();
            return;
        }
        
        this._search(query);
    },
    
    _onKeydown: function(e) {
        if (e.keyCode === 13) { // Enter key
            e.preventDefault();
            this._selectFirst();
        } else if (e.keyCode === 27) { // Escape key
            this._hideTooltip();
        }
    },
    
    _onButtonClick: function(e) {
        L.DomEvent.stopPropagation(e);
        L.DomEvent.preventDefault(e);
        this._search(this._input.value);
    },
    
    _search: function(query) {
        if (!this.options.layer) {
            this._showNoResults();
            return;
        }
        
        var results = [];
        this.options.layer.eachLayer(function(layer) {
            if (layer.feature && layer.feature.properties) {
                var value = layer.feature.properties[this.options.propertyName];
                if (value && value.toString().toLowerCase().indexOf(query) !== -1) {
                    results.push({
                        layer: layer,
                        title: value,
                        latlng: layer.getLatLng ? layer.getLatLng() : layer.getBounds().getCenter()
                    });
                }
            }
        }, this);
        
        this._showResults(results);
    },
    
    _showResults: function(results) {
        this._tooltip.innerHTML = '';
        
        if (results.length === 0) {
            this._showNoResults();
            return;
        }
        
        for (var i = 0; i < Math.min(results.length, 5); i++) {
            var result = results[i];
            var item = L.DomUtil.create('div', 'search-result-item', this._tooltip);
            item.innerHTML = result.title;
            item._result = result;
            
            L.DomEvent.on(item, 'click', function(e) {
                this._selectResult(e.target._result);
            }, this);
        }
        
        this._tooltip.style.display = 'block';
    },
    
    _showNoResults: function() {
        this._tooltip.innerHTML = '<div class="search-result-item">No results found</div>';
        this._tooltip.style.display = 'block';
    },
    
    _selectFirst: function() {
        var firstItem = this._tooltip.querySelector('.search-result-item');
        if (firstItem && firstItem._result) {
            this._selectResult(firstItem._result);
        }
    },
    
    _selectResult: function(result) {
        this._input.value = result.title;
        this._hideTooltip();
        
        if (this.options.moveToLocation) {
            this.options.moveToLocation(result.latlng, result.title, this._map);
        }
        
        if (this.options.marker && result.latlng) {
            if (this._marker) {
                this._map.removeLayer(this._marker);
            }
            
            this._marker = L.marker(result.latlng).addTo(this._map);
        }
    },
    
    _hideTooltip: function() {
        this._tooltip.style.display = 'none';
    }
});

L.control.search = function(options) {
    return new L.Control.Search(options);
};