// Measurement tool for Leaflet
L.Control.Measure = L.Control.extend({
    options: {
        position: 'topleft',
        primaryLengthUnit: 'meters',
        primaryAreaUnit: 'sqmeters'
    },
    
    onAdd: function(map) {
        this._map = map;
        this._measuring = false;
        this._measureVertexes = L.featureGroup().addTo(map);
        
        var container = L.DomUtil.create('div', 'leaflet-control-measure leaflet-bar');
        
        this._link = L.DomUtil.create('a', '', container);
        this._link.href = '#';
        this._link.title = 'Measure distances and areas';
        this._link.innerHTML = '📏';
        
        L.DomEvent.on(this._link, 'click', this._toggleMeasure, this);
        L.DomEvent.disableClickPropagation(container);
        
        return container;
    },
    
    _toggleMeasure: function(e) {
        L.DomEvent.stopPropagation(e);
        L.DomEvent.preventDefault(e);
        
        if (this._measuring) {
            this._stopMeasuring();
        } else {
            this._startMeasuring();
        }
    },
    
    _startMeasuring: function() {
        this._measuring = true;
        this._measureVertexes.clearLayers();
        L.DomUtil.addClass(this._container, 'enabled');
        
        this._map.on('click', this._onMapClick, this);
        this._map.on('mousemove', this._onMapMouseMove, this);
        
        this._points = [];
        this._tempLine = null;
    },
    
    _stopMeasuring: function() {
        this._measuring = false;
        L.DomUtil.removeClass(this._container, 'enabled');
        
        this._map.off('click', this._onMapClick, this);
        this._map.off('mousemove', this._onMapMouseMove, this);
        
        if (this._tempLine) {
            this._map.removeLayer(this._tempLine);
        }
    },
    
    _onMapClick: function(e) {
        this._points.push(e.latlng);
        
        // Add vertex marker
        var marker = L.circleMarker(e.latlng, {
            radius: 3,
            color: 'red',
            fillColor: 'red',
            fillOpacity: 1
        }).addTo(this._measureVertexes);
        
        if (this._points.length > 1) {
            // Calculate and display distance
            var distance = this._calculateDistance();
            var distanceText = this._formatDistance(distance);
            
            // Add measurement line
            var line = L.polyline(this._points, {
                color: 'red',
                weight: 2,
                dashArray: '5, 5'
            }).addTo(this._measureVertexes);
            
            // Add distance label
            var midpoint = this._getLineCenter();
            var label = L.marker(midpoint, {
                icon: L.divIcon({
                    className: 'leaflet-measure-tooltip',
                    html: distanceText,
                    iconSize: [100, 20],
                    iconAnchor: [50, 10]
                })
            }).addTo(this._measureVertexes);
        }
    },
    
    _onMapMouseMove: function(e) {
        if (this._points.length > 0) {
            var tempPoints = this._points.concat([e.latlng]);
            
            if (this._tempLine) {
                this._map.removeLayer(this._tempLine);
            }
            
            this._tempLine = L.polyline(tempPoints, {
                color: 'red',
                weight: 2,
                dashArray: '5, 5',
                opacity: 0.5
            }).addTo(this._map);
        }
    },
    
    _calculateDistance: function() {
        var total = 0;
        for (var i = 1; i < this._points.length; i++) {
            total += this._points[i-1].distanceTo(this._points[i]);
        }
        return total;
    },
    
    _formatDistance: function(distance) {
        if (distance < 1000) {
            return Math.round(distance) + ' m';
        } else {
            return (distance / 1000).toFixed(2) + ' km';
        }
    },
    
    _getLineCenter: function() {
        var bounds = L.latLngBounds(this._points);
        return bounds.getCenter();
    }
});

L.control.measure = function(options) {
    return new L.Control.Measure(options);
};