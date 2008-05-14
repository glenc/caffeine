var Caffeine_UnitTests_Soap = {
	SoapEnvelope_toString: function() {
		
		var params = {p1: "Hello", p2: "World"};
		
		var soap = new Caffeine.SoapEnvelope("TestAction", "TestNS", params);
		
		var expectedSoap = '<?xml version="1.0" encoding="utf-8"?><soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope"><soap12:Body><TestAction xmlns="TestNS"><p1>Hello</p1><p2>World</p2></TestAction></soap12:Body></soap12:Envelope>';
		
		return Assert.areEqual(expectedSoap, soap.toString());
		
	},
	
	SoapEnvelope_toString_NoParams: function() {
		
		var params = {};
		
		var soap = new Caffeine.SoapEnvelope("TestAction", "TestNS", params);
		
		var expectedSoap = '<?xml version="1.0" encoding="utf-8"?><soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope"><soap12:Body><TestAction xmlns="TestNS"></TestAction></soap12:Body></soap12:Envelope>';
		
		return Assert.areEqual(expectedSoap, soap.toString());
		
	},
	
	SoapEnvelope_toString_NullParams: function() {
		
		var soap = new Caffeine.SoapEnvelope("TestAction", "TestNS");
		
		var expectedSoap = '<?xml version="1.0" encoding="utf-8"?><soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope"><soap12:Body><TestAction xmlns="TestNS"></TestAction></soap12:Body></soap12:Envelope>';
		
		return Assert.areEqual(expectedSoap, soap.toString());
	},
	
	SoapEnvelope_toString_EmptyParams: function() {
		
		var params = {p1: ""};
		
		var soap = new Caffeine.SoapEnvelope("TestAction", "TestNS", params);
		
		var expectedSoap = '<?xml version="1.0" encoding="utf-8"?><soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope"><soap12:Body><TestAction xmlns="TestNS"><p1></p1></TestAction></soap12:Body></soap12:Envelope>';
		
		return Assert.areEqual(expectedSoap, soap.toString());
		
	}
}