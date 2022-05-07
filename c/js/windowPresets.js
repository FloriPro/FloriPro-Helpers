windowAlert = function (text) {
    var wind = createWindow("Alert", "automatic", null, null);
    wind.setContent("<h1>" + htmlEntities(text) + "</h1><button onclick=\"searchWindows('" + wind.getClass() + "').onCloseButton();\">OK</button>");
}
windowPrompt = function (text, program, returnFunction, cancelFunction) {
    var wind = createWindow("Alert", "automatic", null, null);
    wind.setContent("<h1>" + htmlEntities(text) + "</h1><input id=\"inp\" type=\"text\"><button onclick=\"getProgramId('" + program.id + "')." + returnFunction + "(this.parentNode.querySelector('#inp').value);searchWindows('" + wind.getClass() + "').onCloseButton();\">OK</button>");

    wind.windowClose = function () {
        if (cancelFunction != undefined) {
            eval("getProgramId('" + program.id + "')." + cancelFunction + "();");
        }
        return true;
    }
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