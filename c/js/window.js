LocalWindow = class {
    constructor(name, sizeX, sizeY, program, startPosX, startPosY) {
        if (nextWindowPosX == undefined) {
            nextWindowPosX = parseInt(window.innerWidth / 10);
        }
        if (nextWindowPosY == undefined) {
            nextWindowPosY = parseInt(window.innerHeight / 10);
        }
        if (startPosX == undefined) {
            startPosX = nextWindowPosX;
        }
        if (startPosY == undefined) {
            startPosY = nextWindowPosY;
        }
        nextWindowPosX = undefined;
        nextWindowPosY = undefined;

        this.program = program;
        this.name = "windwoasdöflkj";
        this.uuid = getFreeWindowUUID(this.name);
        this.isMoving = false;

        $("#stuff").append('<div class="window window' + this.name + '_' + this.uuid + '" style="z-index: 1;position: absolute; top: ' + startPosY + 'px; left: ' + startPosX + 'px;"><div class="title-bar" ontouchstart="this.parentNode.move=true;event.preventDefault();sortWindowZIndex(this.parentNode);" onmousedown="this.parentNode.move=true;event.preventDefault();sortWindowZIndex(this.parentNode);"><div class="title-bar-text"><span>' + name + '</span></div> <div class="title-bar-controls"><button aria-label="Minimize"></button> <button aria-label="Maximize"></button><button aria-label="Close" class="close" onclick="var p = this.parentNode.parentNode.parentNode; var n=p.className;var w=searchWindows(n);w.onCloseButton();"></button></div></div><div style="display:flex" class="buttonData"></div><div class="content"><p>loading Window content... please wait</p></div></div>');

        if (sizeX == "automatic") {
            this.type = "aut"
            document.getElementsByClassName('window' + this.name + '_' + this.uuid)[0].style.width = "fit-content";
            document.getElementsByClassName('window' + this.name + '_' + this.uuid)[0].style.height = "fit-content";
        } else {
            this.type = "specified";
            this.sizeX = sizeX;
            this.sizeY = sizeY;
            document.getElementsByClassName('window' + this.name + '_' + this.uuid)[0].style.width = this.sizeX + "px";
            document.getElementsByClassName('window' + this.name + '_' + this.uuid)[0].style.height = this.sizeY + "px";
        }

    }
    setWindowSize(sizeX, sizeY) {
        if (sizeX == "automatic") {
            this.type = "aut"
            document.getElementsByClassName('window' + this.name + '_' + this.uuid)[0].style.width = "fit-content";
            document.getElementsByClassName('window' + this.name + '_' + this.uuid)[0].style.height = "fit-content";
        } else {
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
    setButtons(buttons) {
        for (const [key, value] of Object.entries(buttons)) {
            this.getHtml().querySelector(".buttonData").innerHTML += "<button onclick=\"" + value.replace('"', '\\"') + "\">" + key + "</button>"
        }
    }
}