windowAlert = function (text) {
    nextWindowPosX = parseInt(window.innerWidth / 2.5);
    nextWindowPosY = parseInt(window.innerHeight / 2.5);
    var wind = createWindow("Alert", "automatic", null, null);
    wind.setContent("<h1>" + htmlEntities(text) + "</h1><button onclick=\"searchWindows('" + wind.getClass() + "').onCloseButton();\">OK</button>");
}
windowPrompt = function (text, program, returnFunction, cancelFunction, type) {
    if (type == undefined) {
        type = "text"
    }
    var wind = createWindow("Alert", "automatic", null, null);
    wind.setContent("<h1>" + htmlEntities(text) + "</h1><input id=\"inp\" type=\"" + type + "\"><button onclick=\"getProgramId('" + program.id + "')." + returnFunction + "(this.parentNode.querySelector('#inp').value);searchWindows('" + wind.getClass() + "').onCloseButton();\">OK</button>");

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
rightclickMenu = function (values, mouseX, mouseY) {
    //remove old menus
    if (document.querySelector(".contexMenu") != undefined) {
        document.querySelector(".contexMenu").remove();
    }

    var buttons = [];
    for (const [key, value] of Object.entries(values)) {
        buttons.push(`<a style="cursor:pointer" onclick="this.parentNode.remove();` + value + `">` + key + `</a><br>`)
    }
    var element = `<div class="contexMenu" style="position: absolute; border: 2px solid black; top: ` + mouseY + `px; left: ` + mouseX + `px; z-index: 999990; padding: 5px; background: silver;">` + buttons.join("") + `</div>`;
    $("#all").append(element);
}
document.addEventListener('click', event => {
    if (document.querySelector(".contexMenu") != undefined) {
        document.querySelector(".contexMenu").remove();
    }
});