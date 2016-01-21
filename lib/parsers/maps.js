Maps = {
	
	expressionGroups:[
		"address",
		"perms",
		"offset",
		"dev",
		"inode",
		"pathname"
	],

	getHeaderNames : function(){
		return this.expressionGroups;
	},

	parseText: function(text){
		return [];
	}	
}

/*

address           perms offset  dev   inode       pathname
00400000-00452000 r-xp 00000000 08:02 173521      /usr/bin/dbus-daemon

*/