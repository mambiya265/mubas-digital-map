// Rotated Marker plugin for Leaflet
L.Marker.include({
    _setPos: function (pos) {
        L.DomUtil.setPosition(this._icon, pos);

        if (this._shadow) {
            L.DomUtil.setPosition(this._shadow, pos);
        }

        this._zIndex = pos.y + this.options.zIndexOffset;

        this._resetZIndex();
    },

    _updateZIndex: function (offset) {
        this._icon.style.zIndex = this._zIndex + offset;
    },

    _animateZoom: function (opt) {
        var pos = this._map._latLngToNewLayerPoint(this._latlng, opt.zoom, opt.center).round();

        this._setPos(pos);
    },

    _initIcon: function () {
        var options = this.options,
            classToAdd = 'leaflet-zoom-' + (this._zoomAnimated ? 'animated' : 'hide');

        var icon = options.icon.createIcon(this._icon),
            addIcon = false;

        // if we're not reusing the icon, remove the old one and init new one
        if (icon !== this._icon) {
            if (this._icon) {
                this._removeIcon();
            }
            addIcon = true;

            if (options.title) {
                icon.title = options.title;
            }
            
            if (icon.tagName === 'IMG') {
                icon.alt = options.alt || '';
            }
        }

        L.DomUtil.addClass(icon, classToAdd);

        if (options.keyboard) {
            icon.tabIndex = '0';
        }

        this._icon = icon;

        if (options.riseOnHover) {
            this.on({
                mouseover: this._bringToFront,
                mouseout: this._resetZIndex
            });
        }

        if (this.options.rotationAngle) {
            this.setRotationAngle(this.options.rotationAngle);
        }

        var newShadow = options.icon.createShadow(this._shadow),
            addShadow = false;

        if (newShadow !== this._shadow) {
            this._removeShadow();
            addShadow = true;
        }

        if (newShadow) {
            L.DomUtil.addClass(newShadow, classToAdd);
            newShadow.alt = '';
        }
        this._shadow = newShadow;


        if (options.opacity < 1) {
            this._updateOpacity();
        }


        if (addIcon) {
            this.getPane().appendChild(this._icon);
        }
        this._initInteraction();
        if (newShadow && addShadow) {
            this.getPane('shadowPane').appendChild(this._shadow);
        }
    },

    setRotationAngle: function(angle) {
        this.options.rotationAngle = angle;
        if (this._icon) {
            this._icon.style[L.DomUtil.TRANSFORM] += ' rotate(' + angle + 'deg)';
        }
        return this;
    },

    setRotationOrigin: function(origin) {
        this.options.rotationOrigin = origin;
        if (this._icon) {
            this._icon.style[L.DomUtil.TRANSFORM + 'Origin'] = origin;
        }
        return this;
    }
});

L.marker = function (latlng, options) {
    return new L.Marker(latlng, options);
};