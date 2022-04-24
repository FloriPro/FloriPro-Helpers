console.log("starting main.js")

LocalWindow = class {
    constructor(name, sizeX, sizeY, program, startPosX, startPosY) {
        if (startPosX == undefined) { startPosX = nextWindowPosX; nextWindowPosX = parseInt(window.innerWidth / 2); }
        if (startPosY == undefined) { startPosY = nextWindowPosY; nextWindowPosY = parseInt(window.innerHeight / 2); }

        console.log("create Windown: " + name);
        this.program = program;
        this.name = "windwoasdöflkj";
        this.uuid = getFreeWindowUUID(this.name);//document.querySelectorAll(".window").length;
        this.isMoving = false;

        $("#stuff").append('<div class="window window' + this.name + '_' + this.uuid + '" style="z-index: 500;position: absolute; top: ' + startPosY + 'px; left: ' + startPosX + 'px;"><div class="title-bar" onmousedown="this.parentNode.move=true;event.preventDefault();sortWindowZIndex(this.parentNode);"><div class="title-bar-text"><span>' + name + '</span></div> <div class="title-bar-controls"><button aria-label="Minimize"></button> <button aria-label="Maximize"></button><button aria-label="Close" class="close" onclick="var p = this.parentNode.parentNode.parentNode; var n=p.className;var w=searchWindows(n);w.onCloseButton();"></button></div></div><div class="content"><p>loading Window content... please wait</p></div></div>');
        //document.getElementsByClassName('window' + this.name + '_' + this.uuid)[0].querySelector(".close").addEventListener("click", function (e) { this.onCloseButton(); });

        if (sizeX == "automatic") {
            this.type = "aut"
            console.log("type: automatic")
            document.getElementsByClassName('window' + this.name + '_' + this.uuid)[0].style.width = "fit-content";
            document.getElementsByClassName('window' + this.name + '_' + this.uuid)[0].style.height = "fit-content";
        } else {
            console.log("type: specified")
            this.type = "specified";
            this.sizeX = sizeX;
            this.sizeY = sizeY;
            document.getElementsByClassName('window' + this.name + '_' + this.uuid)[0].style.width = this.sizeX + "px";
            document.getElementsByClassName('window' + this.name + '_' + this.uuid)[0].style.height = this.sizeY + "px";
        }
    }
    windowClose() {
        return true;
    }
    setContent(html) {
        document.getElementById("stuff").querySelector(".window" + this.name + "_" + this.uuid).querySelector(".content").innerHTML = html;
    }
    onCloseButton() {
        if (this.windowClose()) {
            console.log("closeing...");

            //remove from data
            var index = _dataWindows.indexOf(this);
            if (index !== -1) {
                _dataWindows.splice(index, 1);
            } else {
                console.error("could not remove window from array")
            }

            //remove html
            document.getElementsByClassName('window' + this.name + '_' + this.uuid)[0].remove();
        } else {
            console.log("close cancel");
        }
    }
    getClass() {
        return 'window window' + this.name + '_' + this.uuid;
    }
    getHtml() {
        return document.getElementsByClassName(this.getClass())[0];
    }
    getProgram() {
        return this.program;
    }
}

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
}

createWindow = function (name, posx, posy, program, startX, startY) {
    _dataWindows.push(new LocalWindow(name, posx, posy, program, startX, startY));
    return _dataWindows[_dataWindows.length - 1];
}
removeProgram = function (_this) {
    for (var progr of _dataRunningProgrms) {
        if (progr[0].id == _this.id) {
            _dataRunningProgrms.splice(_dataRunningProgrms.indexOf(progr), 1);
            return;
        }
    }
    console.error("could not remove program")
}

startProgram = async function (programName) {
    //create program from online file (evaling to get class)
    //response = await fetch(_dataPrograms[programName]);
    //var d = await response.text();
    var d = localStorage.getItem(fileLookup[_dataPrograms[programName]]);
    var prog;
    eval(d);

    //initialize program
    prog.id = _dataRunningProgrms.length;
    prog.removeSelf = removeProgram;
    prog.init();
    _dataRunningProgrms.push([programName, prog]);
}

startMenuClick = function (s) {
    eval(_dataDataJson.startMenu[s.querySelector("p").innerText]);
    toggleStartMenu();
}
nextWindowPosX = parseInt(window.innerWidth / 2);;
nextWindowPosY = parseInt(window.innerHeight / 2);;

_dataRunningProgrms = [];
_dataPrograms = {};

_dataDataJson = {};

_dataWindows = [];

loadData = function () {
    json = JSON.parse(localStorage.getItem(fileLookup["c/data.json"]))
    console.log(json);
    _dataDataJson = json;
    //console.log(json); // this will show the info it in firebug console
    json.programs.forEach(element => {
        _dataPrograms[element.name] = element.mainScript;
    });
}

loadData();
window.onbeforeunload = function () {
    //return "sure?";
}

initHtml = function () {
    document.querySelector("body").innerHTML = '<div id="all">    <div id="stuff">    </div>    <div id="StartMenu" style="display: none;">        <div class="StartMenuSelector">        </div>        <div class="StartMenuSelector" onclick="startMenuClick(this);">            <p>programs</p>        </div>        <hr>        <div class="StartMenuSelector" onclick="startMenuClick(this);">            <p>settings</p>        </div>        <div class="StartMenuSelector" onclick="startMenuClick(this);">            <hr>            <p>exit</p>        </div>    </div>    <div id="taskbar">        <button onclick="toggleStartMenu();" id="home"><span>⁕</span></button>    </div></div>';
    document.querySelector("body").onmouseup = function (event) { for (var element of document.getElementsByClassName('window')) { element.move = false; } };
    document.querySelector("body").onmousemove = function (event) { for (var element of document.getElementsByClassName('window')) { if (element.move) { element.style.top = parseInt(element.style.top) + event.movementY + 'px'; element.style.left = parseInt(element.style.left) + event.movementX + 'px'; event.preventDefault(); } } };

    var s = document.createElement("style");
    s.innerHTML = localStorage.getItem(fileLookup["c/css/styles.css"]);
    document.getElementsByTagName("head")[0].appendChild(s);
    console.log("added css")

    //set background img
    document.getElementById("all").style.background = 'url("' + imagePathToStringSrc('c/static/background.jpg') + '") center center / cover no-repeat';
}

initHtml();

console.log("main.js initialized")