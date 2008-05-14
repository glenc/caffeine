Caffeine.Util = {
	
	/**
	 * Combines multiple segments of a URL into a single URL.
	 * example: Caffeine.Util.combineUrls("http://myserver/", "/docs", "mypage.htm");
	 */
	combineUrls: function() {
		if (arguments.length == 0) {
			return "";
		} else if (arguments.length == 1) {
			return arguments[0];
		} else if (arguments.length > 1) {
			
			var fixEnd = function(str) {
				if (str.endsWith("/")) {
					str = str.substring(0, str.length-1);
				}
				return str;
			};
			
			var fixStart = function(str) {
				if (!str.startsWith("/")) {
					str = "/" + str;
				}
				return str;
			};
			
			var fullUrl = fixEnd(arguments[0]);
			
			// loop through middle arguments
			for (var i = 1; i<arguments.length-1; i++) {
				fullUrl += fixStart(fixEnd(arguments[i]));
			}
			
			// only fix start of last item
			fullUrl += fixStart(arguments[arguments.length-1]);
			
			return fullUrl;
		}
	}
	
};