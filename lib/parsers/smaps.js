Smaps = {
	
	lineMap:{
		"Size": "size",
		"Rss" : "rss",
		"Pss" : "pss",
		"Shared_Clean" : "sharedClean",
		"Shared_Dirty" : "sharedDirty",
		"Private_Clean" : "privateClean",
		"Private_Dirty" : "privateDirty",
		"Referenced" : "referenced",
		"Swap": "swap",
		"KernelPageSize" : "kernelPageSize",
		"MMUPageSize" : "mmuPageSize"
	},

	extractDigitRegExp: /(\d+)/,

	rowHeaderRegExp: /([\d\w\-]+)\s([\-rwxp]+)\s(\d+)\s([\d\:]+)\s(\d+)\s*(.+)?/,

	rowHeaderColNames: [
		"address",
		"permissions",
		"offset",
		"device",
		"inode",
		"pathname"
	],							

	getHeaderNames: function(){
		var names = this.rowHeaderColNames.slice(0);
		for(var k in this.lineMap){
			names.push(this.lineMap[k]);
		}
		return names;
	},

	parseLine: function(line, row){
		var keyName = null, reResult = null;
		for(var k in this.lineMap){
			if(line.indexOf(k) == 0){
				keyName = this.lineMap[k];
				reResult = this.extractDigitRegExp.exec(line);
				row[keyName] = parseInt(reResult[0]);
			}
		}
	},

	parseRowHeader: function(result){
		var rowObj = {}, names = this.rowHeaderColNames;
		for(var i = 0, l = names.length; i<l; i++){
			rowObj[names[i]] = result[i+1];
		}

		return rowObj;
	},

	parseText: function(text){
		var lines = text.split("\n"), line = null, result = [], currentRow = null;
		for(var i = 0, l = lines.length; i<l; i++){
			line = lines[i];
			var reResult = this.rowHeaderRegExp.exec(line);
			if(reResult != null){
				currentRow = this.parseRowHeader(reResult);
				result.push(currentRow);
			} else {
				this.parseLine(line, currentRow);
			}
		}

		return result;
	}
}