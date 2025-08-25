// QGIS2Web expression functions
var qgis2web_expressions = {
    // Basic expression evaluation functions
    evaluate: function(expression, feature) {
        // Simple expression evaluator for QGIS expressions
        if (typeof expression === 'string') {
            // Handle basic field references
            if (expression.startsWith('"') && expression.endsWith('"')) {
                var fieldName = expression.slice(1, -1);
                return feature.properties[fieldName] || '';
            }
            // Handle concatenation
            if (expression.includes('||')) {
                var parts = expression.split('||');
                var result = '';
                for (var i = 0; i < parts.length; i++) {
                    var part = parts[i].trim();
                    if (part.startsWith('"') && part.endsWith('"')) {
                        result += part.slice(1, -1);
                    } else {
                        result += feature.properties[part] || '';
                    }
                }
                return result;
            }
        }
        return expression;
    }
};