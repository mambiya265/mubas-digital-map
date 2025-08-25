// Sample GeoJSON data for MUBAS Digital Map
// This represents sample coordinate data for Malawi University of Business and Applied Sciences

var json_Copyofcoordinates1_1 = {
    "type": "FeatureCollection",
    "name": "Copyofcoordinates1_1",
    "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
    "features": [
        {
            "type": "Feature",
            "properties": {
                "id": 1,
                "name": "MUBAS Main Campus",
                "description": "Malawi University of Business and Applied Sciences - Main Campus",
                "category": "University"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [35.0085, -15.7691]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "id": 2,
                "name": "Chancellor College",
                "description": "University of Malawi - Chancellor College",
                "category": "University"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [35.0155, -15.7612]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "id": 3,
                "name": "Blantyre City Centre",
                "description": "Commercial hub of Blantyre",
                "category": "City Center"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [35.0086, -15.7860]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "id": 4,
                "name": "Kamuzu Central Hospital",
                "description": "Major public hospital in Lilongwe",
                "category": "Hospital"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [33.7872, -13.9626]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "id": 5,
                "name": "Lilongwe Capital City",
                "description": "Capital city of Malawi",
                "category": "City Center"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [33.7872, -13.9899]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "id": 6,
                "name": "Zomba Plateau",
                "description": "Mountain plateau and former capital",
                "category": "Landmark"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [35.3188, -15.3850]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "id": 7,
                "name": "Lake Malawi",
                "description": "Major freshwater lake",
                "category": "Water Body"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [34.7000, -12.0000]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "id": 8,
                "name": "Malawi Polytechnic",
                "description": "Technical college in Blantyre",
                "category": "University"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [35.0200, -15.8000]
            }
        }
    ]
};

// Add the layer to the global scope for use in the map
if (typeof window !== 'undefined') {
    window.json_Copyofcoordinates1_1 = json_Copyofcoordinates1_1;
}