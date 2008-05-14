Caffeine.SoapEnvelope = Class.create();
Caffeine.SoapEnvelope.prototype = {
	
	parameters: {},
	
	/**
	 * Creates a new soap envelope for the specified action.
	 * @param {String} action Name of the action the Soap envelope is for
	 * @param {String} namespace Namespace for the Soap envelope
	 * @param {Object} parameters Object containing parameters for the soap envelope.  i.e. {myParam:'some value', foo:'bar'}
	 */
	initialize: function(action, namespace, parameters){
		this.action = action;
		this.namespace = namespace;
		if (parameters != null)
			this.parameters = parameters;
	},
	
	/**
	 * Returns a string version of the soap envelope
	 */
    toString: function(){
        var soap = '<?xml version="1.0" encoding="utf-8"?><soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope"><soap12:Body>';
        soap += '<' + this.action + ' xmlns="' + this.namespace + '">';
        soap += this.__parseParameters(this.parameters);
        soap += '</' + this.action + '></soap12:Body></soap12:Envelope>';
        return soap;
	},
    
    __parseParameters: function(parameters){
        var params = "";
        $H(parameters).each(function(pair) {
                params += "<" + pair.key + ">" + pair.value + "</" + pair.key + ">";
            });

        return params;
    }
}