Statm = {
    expressionGroups:[
      "size",
      "resident",
      "share",
      "text",
      "lib",
      "data",
      "dt"
    ],

    getHeaderNames: function(){
      return this.expressionGroups;
    },

    parseText: function(text){
      return {};
    }
}

/**

statm:
152876 17692 5684 3 0 48114 0

				  size		 (1) total program size
                             (same as VmSize in /proc/[pid]/status)
                  resident   (2) resident set size
                             (same as VmRSS in /proc/[pid]/status)
                  share      (3) shared pages (i.e., backed by a file)
                  text       (4) text (code)
                  lib        (5) library (unused in Linux 2.6)
                  data       (6) data + stack
                  dt         (7) dirty pages (unused in Linux 2.6)

                  */