windowAlert = function (text) {
    var wind = createWindow("Alert", "automatic", null, null);
    wind.setContent("<h1>" + text + "</h1><button onclick=\"searchWindows('" + wind.getClass() + "').onCloseButton();\">OK</button>");
}

createFastFileSelection = function (onClose, endFunctionName, program) {
    var selectWindow = createWindow("File selection (v. 0.1)", "automatic", null, program);
    selectWindow.windowClose = onClose;

    //create data
    var data = ""
    for (const [path, value] of Object.entries(fileLookup)) {
        data += '<button onclick="searchWindows(\'' + selectWindow.getClass() + '\').getProgram().' + endFunctionName + '(\'' + path + '\')">' + path + '</button>';
    }

    selectWindow.setContent("<h2>Select a File</h2>" + data);

    return selectWindow;
}