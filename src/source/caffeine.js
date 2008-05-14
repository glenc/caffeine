var Caffeine = {
	version: "0.1.0",
	context: {},
	
	/**
	 * Handles an exception by alerting the results of the
	 * error to the user.  Eventually this may be handled
	 * by something a bit more elegant.
	 * @param {Object} err Either a string message to be alerted or an Error object thrown
	 */
	handleError: function(err) {
		if (typeof(err) == 'object') {
			alert("An error occurred.\n\n" + err.message);
		} else {
			alert("An error occurred.\n\n" + err);
		}
	},
	
	
	/**
	 * Sets the context for Caffeine methods to the current
	 * site URL.  Many methods that require a site URL
	 * can use the context url if none is provided.
	 * @url {String} url Url to the site for the current context
	 */
	setContext: function(url) {
		Caffeine.context.url = url;
	}

};