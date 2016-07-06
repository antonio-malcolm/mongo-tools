var exitCodeSuccess = 0;
var exitCodeErr = 1;
// Go reserves exit code 2 for its own use.
var exitCodeBadOptions = 3;
var exitCodeStopped = 4;

var rowRegex = /^sh\d+\|\s/;

var portRegex = /^sh\d+\| \S+:(\d+)(\s+\S+){16}/; // I counted like 22 fields, so 16 is just a number that should indicate that we're actually looking at a stat line

function statRows() {
  return rawMongoProgramOutput()
    .split("\n")
    .filter(function(r) {
      return r.match(rowRegex);
    })
    .map(function(r) {
      return r.replace(/^sh\d+\| /, "");
    });
}

function statFields(row) {
  return row.split(/\s/).filter(function(s) {
    return s !== "";
  });
}

function statOutputPortCheck(ports) {
  var portMap = {};
  ports.forEach(function(p) {
    portMap[p] = true;
  });
  foundRows = rawMongoProgramOutput().split("\n").filter(function(r) {
    return r.match(portRegex);
  });
  foundPorts = foundRows.map(function(r) {
    return r.match(portRegex)[1];
  });
  foundPorts.forEach(function(p) {
    portMap[p] = false;
  });
  somePortsUnseen = ports.some(function(p) {
    return portMap[p];
  });
  return !somePortsUnseen;
}

function discoverTest(ports, connectHost) {
  clearRawMongoProgramOutput();
  x = runMongoProgram("mongostat",
      "--host", connectHost,
      "--rowcount", 7,
      "--noheaders",
      "--discover");
  return statOutputPortCheck(ports);
}
