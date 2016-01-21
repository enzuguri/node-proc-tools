var Connection = require('ssh2');


function ExecProxy(conn){
  this.conn = conn;
  this.stream = null;
}

ExecProxy.prototype.onData = function(data, extended) {
  console.log((extended === 'stderr' ? 'STDERR: ' : 'STDOUT: ')
              + data);
}

ExecProxy.prototype.onExec = function(err, stream){
  if (err) throw err;
  var self = this;
  self.stream = stream;
  //console.log(self)
  stream.on('data', this.onData);
  stream.on('end', this.onEnd);
  stream.on('close', this.onClose);
  stream.on('exit', function(code, signal) {
    self.onExit(code, signal);
  });
}

ExecProxy.prototype.onEnd = function() {
  console.log('Stream :: EOF');
}

ExecProxy.prototype.onExit = function(code, signal) {
  console.log('Stream :: exit :: code: ' + code + ', signal: ' + signal);
  this.conn.end();
}

ExecProxy.prototype.onClose = function() {
  console.log('Stream :: close');
}

ExecProxy.prototype.exec = function(command){
  var self = this;
  this.conn.exec(command, function(err, stream){
    self.onExec(err, stream);
  });
}


function connectionReady(conn){
  console.log('Connection :: ready');
  var execProxy = new ExecProxy(conn);
  execProxy.exec('cat /proc/13847/status');
}


var c = new Connection();
c.on('connect', function() {
  console.log('Connection :: connect');
});
c.on('ready', function() {
  connectionReady(c);  
});
c.on('error', function(err) {
  console.log('Connection :: error :: ' + err);
});
c.on('end', function() {
  console.log('Connection :: end');
});
c.on('close', function(had_error) {
  console.log('Connection :: close');
});
c.connect({
  host: 'humax-01156',
  port: 22,
  username: 'root',
  password: 'onlydebug'
});

// example output:
// Connection :: connect
// Connection :: ready
// STDOUT:  17:41:15 up 22 days, 18:09,  1 user,  load average: 0.00, 0.01, 0.05
//
// Stream :: exit :: code: 0, signal: undefined
// Connection :: end
// Connection :: close