windowAlert = function (text) {
    var wind = createWindow("Achtung!", "automatic", null, null);
    wind.setContent("<h1>" + text + "</h1><button onclick=\"searchWindows('" + wind.getClass() + "').onCloseButton();\">OK</button>");
}