imagePathToStringSrc = async function (path) {
    //return "data:image/png;base64," + btoa(localStorage.getItem(fileLookup[path]));
    return "data:image/png;base64," + btoa(await getFile(path));
}
getFile = async function (path) {
    if (path.endsWith(".od")) {
        var wind = createWindow("Loading File", "automatic", null, this);
        wind.setContent('<h1>Downloading File ' + path + '</h1>')
        wind.windowClose = function () {
            return true;
        }

        var f = await fetch(localStorage.getItem(fileLookup[path]));
        wind.onCloseButton();

        //var decoder = new TextDecoder("ascii");
        //decoder.ignoreBOM=false;
        //var text = decoder.decode(await f.arrayBuffer());

        //return text;

        var array = await f.arrayBuffer();
        //return Array.prototype.slice.call(new Uint8Array(array)).join("")
        //return String.fromCharCode(bufferToString(array));

        return bufferToString(array);

        //return "can't load onlineData files... I hope to fix this";
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
bufferToString = function (buf) {
    var view = new Uint8Array(buf);
    out = ""
    for (var x of view) {
        out += String.fromCharCode(x);
    }
    return out;
    return Array.prototype.join.call(view, ",");
}
