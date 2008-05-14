Caffeine.WebServices = {};

Caffeine.WebServices.Base = function(){};
Caffeine.WebServices.Base.prototype = {
 	
	site: "", 
	service: "", 
	namespace: "",
	
	/**
	 * Executes a SharePoint web method.
	 * Example: executeMethod("GetUserInfo", {userLoginName: "domain\\username"}, callback);
	 * @param {String} method Method to execute on the web service
	 * @param {Object} parameters Parameters to pass to the web method
	 * @param {function} callback Function to call after web service returns
	 * @param {Boolean} parseXml Set to false if resulting XML should not be parsed to objects
	 */
 	executeMethod: function(method, parameters, callback, parseXml) {
		if (parseXml == null) { parseXml = true; };
		
		new Ajax.Request(
			this._getUrl(),
			{
				method: "post",
				contentType: "application/soap+xml",
				postBody: new Caffeine.SoapEnvelope(method, this.namespace, parameters).toString(),
				onSuccess: function(transport) { callback(this._parseResults(method, transport, parseXml).bind(this)); },
				onFailure: this._handleError
			});
	},
	
	_getUrl: function() {
		return Caffeine.Util.combineUrl(this.site, "_vti_bin", this.service);
	},
	
	_handleError: function(transport) {
		Caffeine.handleError(transport.responseText + "\n\n Status Code: " + transport.status)
	}, 
	
	_parseResults: function(method, transport, parseXml) {
		var xml;
		if (document.implementation && document.implementation.createDocument) {
			var parser = new DOMParser();
			xml = parser.parseFromString(transport.responseText, "text/xml");
		} else if (window.ActiveXObject) {
			xml = new ActiveXObject("MSXML2.DOMDocument");
			xml.loadXML(transport.responseText);
		}
		
		var obj = {};
		obj.httpResponse = transport;
		
		var responseNode = xml.documentElement.selectSingleNode("//" + method + "Response");
		obj.responseXml = responseNode;
		
		
		if (parseXml) {
			
			// construct object representation of XML
			obj.response = {};
			
			try {
				var f = function(node, obj, inCollection) {
					if (node.nodeType != 1) { return; }
					
					var newObj;
					
					var nodeIsCollection = isCollection(node);
					if (nodeIsCollection) {
						newObj = [];
					} else {
						newObj = {};
						newObj.length = 0;
					}
		
					newObj._value = node.firstChild ? node.firstChild.nodeValue : "";
					newObj.getValue = function() { return newObj._value; };
					
					newObj.attributes = new Hash();
					for (var i=0; i<node.attributes.length; i++) {
						newObj.attributes[node.attributes[i].name] = node.attributes[i].value;
					};
					
					// parse children
					for (var i=0; i<node.childNodes.length; i++) {
						f(node.childNodes[i], newObj, nodeIsCollection);
					};
					
					if (inCollection) {
						obj.push(newObj);
					} else {
						obj[node.tagName] = newObj;
					}
				}
				
				var isCollection = function(node) {
					// get the name of the first node.  
					// then try and select multiple nodes with that name.  
					// if result = childcount, it's a collection
					
					// this won't handle XML like this:  <kids><son/><son/><daughter/></kids>
					if (node.childNodes.length > 1) {
						var childName = node.childNodes[0].tagName;
						return node.selectNodes(childName).length == node.childNodes.length;
					} else if (node.childNodes.length == 1) {
						// try this test: parent name = child name but with an extra s - assume collection
						if (node.childNodes[0].tagName + "s" == node.tagName) {
							return true;
						}
					}
					return false;
				}
				
				var rootIsCollection = isCollection(responseNode);
				for (i = 0; i<responseNode.childNodes.length; i++) {
					f(responseNode.childNodes[i], obj.response, rootIsCollection);
				}
				
			} catch(err) {
				obj.response = null;
			}
		} else {
			obj.response = null;
		}
	
		return obj;
	}
};
 
// build web service objects for each service.
[
 	[ "Alerts", 		"alerts.asmx", 			"http://schemas.microsoft.com/sharepoint/soap/2002/1/alerts/" ],
	[ "Authentication", "authentication.asmx", 	"http://schemas.microsoft.com/sharepoint/soap/" ],
	[ "Copy", 			"copy.asmx", 			"http://schemas.microsoft.com/sharepoint/soap/" ],
	[ "Dws", 			"dws.asmx", 			"http://schemas.microsoft.com/sharepoint/soap/dws/" ],
	[ "Forms", 			"forms.asmx", 			"http://schemas.microsoft.com/sharepoint/soap/" ],
	[ "Imaging", 		"imaging.asmx", 		"http://schemas.microsoft.com/sharepoint/soap/ois/" ],
	[ "StsAdapter", 	"dspsts.asmx", 			"http://schemas.microsoft.com/sharepoint/dsp" ],
	[ "Lists", 			"lists.asmx", 			"http://schemas.microsoft.com/sharepoint/soap/" ],
	[ "Meetings", 		"meetings.asmx", 		"http://schemas.microsoft.com/sharepoint/soap/meetings/" ],
	[ "People", 		"people.asmx", 			"http://schemas.microsoft.com/sharepoint/soap/" ],
	[ "Permissions", 	"permissions.asmx", 	"http://schemas.microsoft.com/sharepoint/soap/directory/" ],
	[ "SiteData", 		"sitedata.asmx", 		"http://schemas.microsoft.com/sharepoint/soap/" ],
	[ "Sites", 			"sites.asmx", 			"http://schemas.microsoft.com/sharepoint/soap/" ],
	[ "Search", 		"spsearch.asmx", 		"urn:Microsoft.Search" ],
	[ "UserGroup", 		"usergroup.asmx", 		"http://schemas.microsoft.com/sharepoint/soap/directory/" ],
	[ "Versions", 		"versions.asmx", 		"http://schemas.microsoft.com/sharepoint/soap/" ],
	[ "Views", 			"views.asmx", 			"http://schemas.microsoft.com/sharepoint/soap/" ],
	[ "WebPartPages", 	"webpartpages.asmx", 	"http://microsoft.com/sharepoint/webpartpages" ],
	[ "Webs", 			"webs.asmx", 			"http://schemas.microsoft.com/sharepoint/soap/" ]
].each(function(service) {
 	Caffeine.WebServices[service[0]] = Class.create();
	Caffeine.WebServices[service[0]].prototype = Object.extend(new Caffeine.WebServices.Base(), {
		initialize: function(site) {
			if (site == null || site == "") { 
				this.site = Caffeine.context.url; 
			} else { 
				this.site = site; 
			}
			
			this.service = service[1];
			this.namespace = service[2];
		}
	});
});