function toggleStartMenu() {
    if (document.getElementById("StartMenu").style.display == "none") {
        document.getElementById("StartMenu").style.display = "";
    } else {
        document.getElementById("StartMenu").style.display = "none";
    }
}

class Window {
    constructor(name, prog) {
        console.log("create Windown: " + name);
        self.name = name;
        self.prog = prog;
        self.uuid = document.querySelectorAll(".window").length
        document.getElementById("stuff").innerHTML += '<div class="window window' + name + '_' + self.uuid + '"><div class="title-bar"><div class="title-bar-text"><span>' + name + '</span></div> <div class="title-bar-controls"><button aria-label="Minimize"></button> <button aria-label="Maximize"></button><button aria-label="Close" onclick="windowCloseButton(this)"></button></div></div><div class="content"><p>loading Window content... please wait</p></div></div>';
    }
    setContent(html) {
        document.getElementById("stuff").querySelector(".window" + self.name + "_" + self.uuid).querySelector(".content").innerHTML = html;
    }
    onCloseButton() {
        if (self.prog.windowClose()) {
            console.log("close ok");
        } else {
            console.log("close cancel");
        }
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

function createWindow(name) {
    var w = new Window(name);
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