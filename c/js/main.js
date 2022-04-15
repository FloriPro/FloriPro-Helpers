class Window {
    constructor(name, sizeX, sizeY) {
        console.log("create Windown: " + name);
        self.name = "windwoasdöflkj";
        self.uuid = document.querySelectorAll(".window").length;
        document.getElementById("stuff").innerHTML += '<div class="window window' + self.name + '_' + self.uuid + '" style="z-index: auto;position: absolute; top: 0px; left: 0px;"><div class="title-bar" onmousedown="this.parentNode.move=true;event.preventDefault();"><div class="title-bar-text"><span>' + name + '</span></div> <div class="title-bar-controls"><button aria-label="Minimize"></button> <button aria-label="Maximize"></button><button aria-label="Close" class="close"></button></div></div><div class="content"><p>loading Window content... please wait</p></div></div>';
        document.getElementsByClassName('window' + self.name + '_' + self.uuid)[0].querySelector(".close").addEventListener("click", () => { this.onCloseButton(); });

        self.isMoving = false;
        //self.posx = 0;
        //self.posy = 0;
        //document.getElementsByClassName('window' + name + '_' + self.uuid)[0].style.transform = "translate(" + self.posx + "px, " + self.posy + "px)";

        //$("body").bind("mousemove", { _self: self }, (e) => { if (e.data._self.isMoving) { console.log('window' + e.data._self.name + '_' + e.data._self.uuid); e.data._self.posx += e.originalEvent.movementX; e.data._self.posy += e.originalEvent.movementY; document.getElementsByClassName('window' + e.data._self.name + '_' + e.data._self.uuid)[0].style.top = e.data._self.posy + "px"; document.getElementsByClassName('window' + e.data._self.name + '_' + e.data._self.uuid)[0].style.left = e.data._self.posx + "px"; } });
        //$("body").bind("mouseup", { _self: self }, (e) => { e.data._self.isMoving = false; });
        //$('.window' + self.name + '_' + self.uuid).bind("mousedown", { _self: [self][0] }, (e) => { console.log("click"); e.data._self.isMoving = true; });

        console.log(sizeX);
        if (sizeX == "automatic") {
            self.type = "aut"
            console.log("type: automatic")
            document.getElementsByClassName('window' + self.name + '_' + self.uuid)[0].style.width = "fit-content";
            document.getElementsByClassName('window' + self.name + '_' + self.uuid)[0].style.height = "fit-content";
        } else {
            console.log("type: specified")
            self.type = "specified";
            self.sizeX = sizeX;
            self.sizeY = sizeY;
            document.getElementsByClassName('window' + self.name + '_' + self.uuid)[0].style.width = self.sizeX + "px";
            document.getElementsByClassName('window' + self.name + '_' + self.uuid)[0].style.height = self.sizeY + "px";
        }
    }
    windowClose() {
        return true;
    }
    setContent(html) {
        document.getElementById("stuff").querySelector(".window" + self.name + "_" + self.uuid).querySelector(".content").innerHTML = html;
    }
    onCloseButton() {
        console.log(this);
        if (this.windowClose()) {
            console.log("close ok");
        } else {
            console.log("close cancel");
        }
    }
}

function toggleStartMenu() {
    if (document.getElementById("StartMenu").style.display == "none") {
        document.getElementById("StartMenu").style.display = "";
    } else {
        document.getElementById("StartMenu").style.display = "none";
    }
}


function windowCloseButton(t) {
    var className = t.parentNode.parentNode.parentNode.classList[1];

    //get Window class
    _dataWindows.forEach(element => {
        if (element.name + "_" + element.uuid == className) {
            element.onCloseButton();
        }
    })
}

function createWindow(name, posx, posy) {
    var w = new Window(name, posx, posy);
    _dataWindows.push(w);
    return w;
}

async function startProgram(programName) {
    response = await fetch(_dataPrograms[programName]);
    var d = await response.text();
    var prog;
    eval(d);
    _dataRunningProgrms.push([programName, prog]);
    prog.init();
}

function startMenuClick(s) {
    eval(_dataDataJson.startMenu[s.querySelector("p").innerText]);
}

let _dataRunningProgrms = [];
let _dataPrograms = {};

let _dataDataJson = {};

let _dataWindows = [];

function loadData() {
    $.getJSON("/c/data.json", function (json) {
        _dataDataJson = json;
        //console.log(json); // this will show the info it in firebug console
        json.programs.forEach(element => {
            _dataPrograms[element.name] = element.mainScript;
        });
    });
}

function getMain() {

}

loadData();