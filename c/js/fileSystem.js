console.log("initialising fileSystem.js");
imagePathToStringSrc = function (path) {
    var dataImage = localStorage.getItem(fileLookup[path]);
    return "data:image/png;base64," + btoa(dataImage);
}
console.log("fileSystem.js initialised");

createFastFileSelection = function (onClose, endFunctionName, program) {
    var selectWindow = createWindow("File selection (pre-alpha)", "automatic", null, program);
    selectWindow.windowClose = onClose;

    //create data
    var data = ""
    for (const [path, value] of Object.entries(fileLookup)) {
        data += '<button onclick="searchWindows(\'' + selectWindow.getClass() + '\').getProgram().' + endFunctionName + '(\'' + path + '\')">' + path + '</button>';
    }

    selectWindow.setContent("<h2>Select a File</h2>" + data);

    return selectWindow;
}