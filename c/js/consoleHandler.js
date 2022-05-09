oldLog = console.log;
console.log = function (...data) {
    oldLog(data[0]);
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

cls = function () {
    _dataConsole = [];
}
help = function () {
    windowAlert("This is javascript. Informations: https://developer.mozilla.org/en-US/docs/Web/JavaScript")
}

_dataConsole = [];