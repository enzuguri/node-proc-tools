Status = {

	idExpressionGroups:[
		"real",
		"effective",
		"savedSet", 
		"filesystem"
	],

	parseIds: function(chunk){
		return null;
	},

	parseGroups: function(chunk){
		return chunk.trim().split(/\s/).map(parseFloat);
	},

	parseKb: function(chunk){
		return parseFloat(chunk.trim().split(/\s/)[0]);
	},

	lineMap:{
		"Name":[String,"name"],
		"State":[String,"state"],
		"Tgid":[Number,"tgid"],
        "Pid":[Number, "pid"],
        "PPid":[Number, "ppid"],
        "TracerPid":[Number, "tracerPid"],
        "Uid":["parseIds", "uid"],
        "Gid":["parseIds", "gid"],
        "FDSize":[Number, "fdSize"],
        "Groups":["parseGroups", "groups"],
        "VmPeak":["parseKb", "vmPeak"],
      	"VmSize":["parseKb", "vmSize"],
      	"VmLck":["parseKb", "vmLck"],
      	"VmHWM":["parseKb", "vmHWM"],
      	"VmRSS":["parseKb", "vmRSS"],
      	"VmData":["parseKb", "vmData"],
      	"VmStk":["parseKb", "vmStk"],
      	"VmExe":["parseKb", "vmExe"],
      	"VmLib":["parseKb", "vmLib"],
      	"VmPTE":["parseKb", "vmPTE"],
      	"Threads":[Number, "threads"],
      	"Cpus_allowed_list":[Number, "cpusAllowedList"],
        "Mems_allowed":[Number, "memsAllowed"],
        "Mems_allowed_list":[Number, "memsAllowedList"],
        "voluntary_ctxt_switches":[Number, "voluntaryContextSwitches"],
        "nonvoluntary_ctxt_switches":[Number, "nonvoluntaryContextSwitches"]
	},

	getHeaderNames: function(){
		var names = []
		for(var k in this.lineMap){
			names.push(this.lineMap[k][1]);
		}
		return names;
	},

	lineRegEx:/(\w+):\s(.+)/,

	parseLineType: function(chunk, type){
		if(type === Number){
			return parseFloat(chunk.trim());
		} else if(type === String){
			return chunk.trim();
		} else {
			return this[type](chunk);
		}

		return null;
	},

	parseText: function(text){
		var lines = text.split("\n"), match = null, result = {};
		for(var i = 0, l = lines.length; i<l; i++){
			match = this.lineRegEx.exec(lines[i]);
			if(match != null){
				var type = this.lineMap[match[1]];
				if(type != null){
					var val = this.parseLineType(match[2], type[0]);
					result[type[1]] = val;
				}
			}
		}

		return result;
	}
}

/**


$ cat /proc/$$/status
                  
                  SigQ:   0/3067
                  SigPnd: 0000000000000000
                  ShdPnd: 0000000000000000
                  SigBlk: 0000000000010000
                  SigIgn: 0000000000384004
                  SigCgt: 000000004b813efb
                  CapInh: 0000000000000000
                  CapPrm: 0000000000000000
                  CapEff: 0000000000000000
                  CapBnd: ffffffffffffffff
                  Cpus_allowed:   00000001
                  

              The fields are as follows:

              * Name: Command run by this process.

              * State: Current state of the process.  One of "R (running)",
                "S (sleeping)", "D (disk sleep)", "T (stopped)", "T (tracing
                stop)", "Z (zombie)", or "X (dead)".

              * Tgid: Thread group ID (i.e., Process ID).

              * Pid: Thread ID (see gettid(2)).

              * PPid: PID of parent process.

              * TracerPid: PID of process tracing this process (0 if not
                being traced).

              * Uid, Gid: Real, effective, saved set, and filesystem UIDs
                (GIDs).

              * FDSize: Number of file descriptor slots currently allocated.

              * Groups: Supplementary group list.

              * VmPeak: Peak virtual memory size.

              * VmSize: Virtual memory size.

              * VmLck: Locked memory size (see mlock(3)).

              * VmHWM: Peak resident set size ("high water mark").

              * VmRSS: Resident set size.

              * VmData, VmStk, VmExe: Size of data, stack, and text
                segments.

              * VmLib: Shared library code size.

              * VmPTE: Page table entries size (since Linux 2.6.10).

              * Threads: Number of threads in process containing this
                thread.

              * SigQ: This field contains two slash-separated numbers that
                relate to queued signals for the real user ID of this
                process.  The first of these is the number of currently
                queued signals for this real user ID, and the second is the
                resource limit on the number of queued signals for this
                process (see the description of RLIMIT_SIGPENDING in
                getrlimit(2)).

              * SigPnd, ShdPnd: Number of signals pending for thread and for
                process as a whole (see pthreads(7) and signal(7)).

              * SigBlk, SigIgn, SigCgt: Masks indicating signals being
                blocked, ignored, and caught (see signal(7)).

              * CapInh, CapPrm, CapEff: Masks of capabilities enabled in
                inheritable, permitted, and effective sets (see
                capabilities(7)).

              * CapBnd: Capability Bounding set (since kernel 2.6.26, see
                capabilities(7)).

              * Cpus_allowed: Mask of CPUs on which this process may run
                (since Linux 2.6.24, see cpuset(7)).

              * Cpus_allowed_list: Same as previous, but in "list format"
                (since Linux 2.6.26, see cpuset(7)).

              * Mems_allowed: Mask of memory nodes allowed to this process
                (since Linux 2.6.24, see cpuset(7)).

              * Mems_allowed_list: Same as previous, but in "list format"
                (since Linux 2.6.26, see cpuset(7)).

              * voluntary_context_switches, nonvoluntary_context_switches:
                Number of voluntary and involuntary context switches (since
                Linux 2.6.23).

                **/