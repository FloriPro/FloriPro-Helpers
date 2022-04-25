imagePathToStringSrc = function (path) {
    return "data:image/png;base64," + btoa(localStorage.getItem(fileLookup[path]));
}
getFile = function (path) {
    if (path.endsWith(".od")) {
        return "can't load onlineData files... I hope to fix this";
    } else {
        return localStorage.getItem(fileLookup[path]);
    }
}
saveFile = function (path, data) {
    if (fileLookup[path] == null) {
        fileLookup[path] = Object.keys(fileLookup).length;//TODO: make better
    }
    localStorage.setItem("fileLookup", JSON.stringify(fileLookup));
    return localStorage.setItem(fileLookup[path], data)
}
