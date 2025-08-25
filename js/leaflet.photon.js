// Photon geocoding plugin for Leaflet
L.Control.Photon = L.Control.extend({
    options: {
        position: 'topleft',
        placeholder: 'Search...',
        url: 'https://photon.komoot.io/api/',
        lang: 'en'
    },
    
    onAdd: function(map) {
        this._map = map;
        
        var container = L.DomUtil.create('div', 'leaflet-control-photon');
        
        this._input = L.DomUtil.create('input', 'leaflet-photon-input', container);
        this._input.type = 'text';
        this._input.placeholder = this.options.placeholder;
        
        this._results = L.DomUtil.create('div', 'leaflet-photon-results', container);
        this._results.style.display = 'none';
        
        L.DomEvent.on(this._input, 'input', this._onInput, this);
        L.DomEvent.on(this._input, 'keydown', this._onKeydown, this);
        L.DomEvent.disableClickPropagation(container);
        
        return container;
    },
    
    _onInput: function(e) {
        var query = e.target.value;
        if (query.length < 3) {
            this._hideResults();
            return;
        }
        
        this._search(query);
    },
    
    _onKeydown: function(e) {
        // Handle Enter key
        if (e.keyCode === 13) {
            e.preventDefault();
            var firstResult = this._results.querySelector('.leaflet-photon-result');
            if (firstResult) {
                this._selectResult(firstResult);
            }
        }
    },
    
    _search: function(query) {
        var self = this;
        var url = this.options.url + '?q=' + encodeURIComponent(query) + '&lang=' + this.options.lang;
        
        // Simple JSONP-like request (for demo purposes)
        // In production, you'd want to use fetch() or XMLHttpRequest
        this._showDummyResults(query);
    },
    
    _showDummyResults: function(query) {
        // Show dummy results for demonstration
        this._results.innerHTML = '';
        
        var result = L.DomUtil.create('div', 'leaflet-photon-result', this._results);
        result.innerHTML = 'Search for: ' + query;
        result._latlng = L.latLng(-15.7, 35.0); // Default to Malawi
        
        L.DomEvent.on(result, 'click', function() {
            this._selectResult(result);
        }, this);
        
        this._results.style.display = 'block';
    },
    
    _selectResult: function(result) {
        if (result._latlng) {
            this._map.setView(result._latlng, 15);
            
            if (this._marker) {
                this._map.removeLayer(this._marker);
            }
            
            this._marker = L.marker(result._latlng).addTo(this._map);
        }
        
        this._input.value = result.innerHTML;
        this._hideResults();
    },
    
    _hideResults: function() {
        this._results.style.display = 'none';
    }
});

L.control.photon = function(options) {
    return new L.Control.Photon(options);
};