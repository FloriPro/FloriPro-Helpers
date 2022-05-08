getFreeWindowUUID = function (name) {
    var i = 0;
    while (document.querySelectorAll(".window" + name + "_" + i).length != 0) {
        i++;
    }
    return i;
}

sortWindowZIndex = function (thi) {
    zIndexes = {};
}

searchWindows = function (classname) {
    for (var window of _dataWindows) {
        if (window.getClass() == classname) {
            return window;
        }
    }
}

toggleStartMenu = function () {
    if (document.getElementById("StartMenu").style.display == "none") {
        document.getElementById("StartMenu").style.display = "";
    } else {
        document.getElementById("StartMenu").style.display = "none";
    }
}

windowCloseButton = function (t) {
    var className = t.parentNode.parentNode.parentNode.classList[1];

    //get Window class
    _dataWindows.forEach(element => {
        if (element.name + "_" + element.uuid == className) {
            element.onCloseButton();
        }
    })
}
getProgramId = function (id) {
    for (var progr of _dataRunningProgrms) {
        if (progr[1].id == id) {
            return progr[1];
        }
    }
    return null;
}

createWindow = function (name, posx, posy, program, startX, startY) {
    _dataWindows.push(new LocalWindow(name, posx, posy, program, startX, startY));
    return _dataWindows[_dataWindows.length - 1];
}
removeProgram = function (_this) {
    program = _this.getProgram();
    for (var progr of _dataRunningProgrms) {
        if (progr[1].id == program.id) {
            _dataRunningProgrms.splice(_dataRunningProgrms.indexOf(progr), 1);
            return;
        }
    }
    console.error("could not remove program")
}

htmlEntities = function (str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

downloadSync = function (url) {
    return "idk how to do this";
}

startProgram = async function (programName) {
    //create program from online file (evaling to get class)
    //response = await fetch(_dataPrograms[programName]);
    //var d = await response.text();
    var d = await getFile(_dataPrograms[programName]);
    var prog;
    try {
        eval(d);
    } catch (e) {
        console.error(e);
    }
    //initialize program
    var i = 0;
    while (getProgramId(i) != null) {
        i++;
    }

    prog.id = i;
    prog.removeSelf = removeProgram;
    try {
        prog.init();
    } catch (e) {
        console.error(e);
    }
    _dataRunningProgrms.push([programName, prog]);
}
startProgramFile = async function (programName, file) {
    //create program from online file (evaling to get class)
    //response = await fetch(_dataPrograms[programName]);
    //var d = await response.text();
    var d = await getFile(_dataPrograms[programName]);
    var prog;
    try {
        eval(d);
    } catch (e) {
        console.error(e);
    }
    //initialize program
    var i = 0;
    while (getProgramId(i) != null) {
        i++;
    }

    prog.id = i;
    prog.removeSelf = removeProgram;
    try {
        prog.initFile(file);
    } catch (e) {
        console.error(e);
    }
    _dataRunningProgrms.push([programName, prog]);
}

loadFile = function (f) {
    console.log("loading " + f);
    var ff = f;
    if (f.endsWith(".od")) {
        f = f.slice(0, -3);
    }
    prog = ""
    var p = f.split(".")[f.split(".").length - 1];
    if (_dataDataJson["toStartWith"][p] != undefined) {
        prog = _dataDataJson["toStartWith"][p]
    } else {
        prog = _dataDataJson["toStartWith"]["default"]
    }
    startProgramFile(prog, ff);
}

startMenuClick = function (s) {
    try {
        eval(_dataDataJson.startMenu[s.querySelector("p").innerText]);
    } catch (e) {
        console.error(e);
    }
    toggleStartMenu();
}

nextWindowPosX = undefined;
nextWindowPosY = undefined;

_dataRunningProgrms = [];
_dataPrograms = {};

_dataDataJson = {};

_dataWindows = [];

_globalVar = {};

loadData = async function () {
    json = JSON.parse(await getFile("c/data.json"))
    _dataDataJson = json;
    json.programs.forEach(element => {
        _dataPrograms[element.name] = element.mainScript;
    });
}

window.onbeforeunload = function () {
    //return "sure?";
}

initHtml = async function () {
    document.querySelector("body").innerHTML = '<div id="all"><div id="stuff"></div><div id="StartMenu" style="display: none;z-index:999999"></div><div id="taskbar"><button onclick="toggleStartMenu();" id="home"><span>⁕</span></button></div></div>';
    //<div class="StartMenuSelector" onclick="startMenuClick(this);"><p>programs</p></div><hr>
    var d = [];
    for (const [path, value] of Object.entries(_dataDataJson["startMenu"])) {
        d.push('<div class="StartMenuSelector" onclick="startMenuClick(this);"><p>' + path + '</p></div>')
    }
    document.querySelector("#StartMenu").innerHTML = d.join("<hr>")
    document.querySelector("body").onmouseup = function (event) { for (var element of document.getElementsByClassName('window')) { element.move = false; } };
    document.querySelector("body").onmousemove = function (event) {
        for (var element of document.getElementsByClassName('window')) {
            if (element.move) {
                element.style.top = parseInt(element.style.top) + event.movementY + 'px';
                element.style.left = parseInt(element.style.left) + event.movementX + 'px'; event.preventDefault();
            }
        }
    };
    //document.querySelector("body").ontouchend = document.querySelector("body").onmouseup;
    //document.querySelector("body").onpointermove = document.querySelector("body").onmousemove;

    var s = document.createElement("style");
    s.innerHTML = await getFile("c/css/styles.css");
    document.getElementsByTagName("head")[0].appendChild(s);

    //set background img
    document.getElementById("all").style.background = 'url("' + await imagePathToStringSrc(_dataSettings["backgroundImage"]) + '") center center / cover no-repeat';
}
async function start() {
    eval(await getFile("c/js/window.js"));
    _dataSettings = JSON.parse(await getFile("c/js/settings/data.json"));
    await loadData();
    await initHtml();

    setInterval(function () {
        for (progr of _dataRunningProgrms) {
            if (progr[1].update != undefined) {
                progr[1].update();
            }
        }
    }, 100)
}
saveSettings = async function () {
    await saveFile("c/js/settings/data.json", JSON.stringify(_dataSettings))
}

delay = function (time) {
    return new Promise(resolve => setTimeout(resolve, time));
}
start();