var Caffeine_UnitTests_Util = {
	Util_combineUrls: function() {
		var part1 = "http://myserver/"
		var part2 = "/home.htm"
		
		return Assert.areEqual("http://myserver/home.htm", Caffeine.Util.combineUrls(part1, part2));
	},
	
	Util_combineUrls_two: function() {
		var part1 = "http://myserver"
		var part2 = "home.htm"
		
		return Assert.areEqual("http://myserver/home.htm", Caffeine.Util.combineUrls(part1, part2));
	},
	
	Util_combineUrls_three: function() {
		var p1 = "/myserver/";
		var p2 = "/home.htm";
		
		return Assert.areEqual("/myserver/home.htm", Caffeine.Util.combineUrls(p1, p2));
	},
	
	Util_combineUrls_four: function() {
		var p1 = "myserver";
		var p2 = "home.htm";
		
		return Assert.areEqual("myserver/home.htm", Caffeine.Util.combineUrls(p1, p2));
	},
	
	Util_combineUrls_five: function() {
		var p1 = "http://myserver/";
		var p2 = "/dir1/"
		var p3 = "/home.htm";
		
		return Assert.areEqual("http://myserver/dir1/home.htm", Caffeine.Util.combineUrls(p1, p2, p3));
	},
	
	Util_combineUrls_six: function() {
		var p1 = "http://myserver";
		var p2 = "dir1"
		var p3 = "home.htm";
		
		return Assert.areEqual("http://myserver/dir1/home.htm", Caffeine.Util.combineUrls(p1, p2, p3));
	},
	
	Util_combineUrls_seven: function() {
		var p1 = "http://myserver";
		var p2 = "/dir1/";
		var p3 = "/dir2";
		var p4 = "dir3/";
		var p5 = "home.htm"
		
		return Assert.areEqual("http://myserver/dir1/dir2/dir3/home.htm", Caffeine.Util.combineUrls(p1, p2, p3, p4, p5));
	}
}