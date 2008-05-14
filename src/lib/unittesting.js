var Assert = {
	areEqual: function(expected, actual) {
		return expected === actual;
	}
}

var TestFixture = {
	run: function(fixture, output) {
		for (fn in fixture) {
			if (typeof(fixture[fn]) == 'function') {
				var result;
				try {
					result = fixture[fn]() ? "Pass" : "Fail";
				} catch (ex) {
					result = "Error";
				}
				
				output.innerHTML += "<span class='test'>" + fn + "</span>" + "   -   " + TestFixture._formatResult(result) + "<br/>";
			}
		}
	},
	
	_formatResult: function(result) {
		var prefix = "<span class='test-result test-" + result + "'>";
		return prefix + result + "</span>";
	}
}