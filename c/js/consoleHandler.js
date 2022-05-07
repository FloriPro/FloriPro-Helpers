oldLog = console.log;
console.log = function (...data) {
    oldLog(data);
    _dataConsole.push({ "log": data.join(" ") });
    if (_dataConsole.length > 50) {
        _dataConsole.shift();
    }
}
oldWarn = console.warn;
console.warn = function (...data) {
    oldWarn(data);
    _dataConsole.push({ "warn": data.join(" ") });
    if (_dataConsole.length > 50) {
        _dataConsole.shift();
    }
}
oldError = console.error;
console.error = function (...data) {
    oldError(data);
    _dataConsole.push({ "error": data.join(" ") });
    if (_dataConsole.length > 50) {
        _dataConsole.shift();
    }
}