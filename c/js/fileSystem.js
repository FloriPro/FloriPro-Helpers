imagePathToStringSrc = function (path) {
    return "data:image/png;base64," + btoa(getFile(path));
}
getFile = function (path) {
    return localStorage.getItem(fileLookup[path]);
}
saveFile = function (path, data) {
    if (fileLookup[path] == null) {
        fileLookup[path] = Object.keys(fileLookup).length;//TODO: make better
    }
    localStorage.setItem("fileLookup", JSON.stringify(fileLookup));
    return localStorage.setItem(fileLookup[path], data)
}
