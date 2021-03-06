imagePathToStringSrc = async function (path) {
    //return "data:image/png;base64," + btoa(localStorage.getItem(fileLookup[path]));
    return "data:image/png;base64," + btoa(await getFile(path));
}
getFile = async function (path) {
    if (path.endsWith(".od")) {
        var pathS = path + "(" + localStorage.getItem(fileLookup[path]) + ")";

        var wind = createWindow("", "fit-content", "fit-content", this);
        wind.setContent('<h1 style="background:white;width:fit-content;">Downloading File ' + pathS + '</h1>')
        wind.windowClose = function () {
            return true;
        }

        wind.getHtml().style.background = "#ffffff00"
        wind.getHtml().querySelector(".title-bar").style.background = "#ffffff00"
        wind.getHtml().querySelector(".close").style.background = "rgb(247 247 247 / 0%)"
        wind.getHtml().querySelector(".minimize").style.background = "rgb(247 247 247 / 0%)"
        wind.getHtml().querySelector(".maximize").style.background = "rgb(247 247 247 / 0%)"
        wind.getHtml().style.boxShadow= "unset";

        var dat = ""
        try {
            var f = await fetch(localStorage.getItem(fileLookup[path]));
            var array = await f.arrayBuffer();

            wind.setContent('<h1 style="background:white;width:fit-content;">Loading File Data ' + pathS + ' </h1><p style="background:white;width:fit-content;" class="loadingPercent">0%</p>')
            await delay(10);
            var dat = await bufferToString(array, wind.getHtml().querySelector(".loadingPercent"));
        } catch (e) {
            dat = "error downloading File!"
            console.error("error downloading File: " + e)
            windowAlert("error downloading File!");
        }
        wind.onCloseButton();//close loading window
        return dat;
    } else {
        return localStorage.getItem(fileLookup[path]);
    }
}
saveFile = async function (path, data) {
    if (!path.endsWith(".od")) {
        if (fileLookup[path] == null) {
            fileLookup[path] = Object.keys(fileLookup).length;//TODO: make better
            localStorage.setItem("fileLookup", JSON.stringify(fileLookup));
        }
        return localStorage.setItem(fileLookup[path], data);
    } else {
        if (fileLookup[path] == null) {
            fileLookup[path] = Object.keys(fileLookup).length;//TODO: make better
            localStorage.setItem("fileLookup", JSON.stringify(fileLookup));
        } else {
            windowAlert("can't save online File!");
        }
    }
}
bufferToString = async function (buf, element) {
    var view = new Uint8Array(buf);
    out = ""
    var timeForEveryPercent = view.length / 10;
    var i = 0;
    var p = 0;
    for (var x of view) {
        out += String.fromCharCode(x);
        if (i >= timeForEveryPercent) {
            i = 0;
            if (element != null && timeForEveryPercent > 1000) {
                p += 10;
                element.innerText = p + "%";
                await delay(10);
            }
        }
        i++;
    }
    return out;
}
