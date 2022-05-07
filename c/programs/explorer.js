class program {
    init() {
        this.pos = "c/"

        this.wind = createWindow("Explorer", "automatic", null, this);
        this.wind.setContent('<h1>Explorer</h1><div style="display:flex"><button onclick="searchWindows(\'' + this.wind.getClass() + '\').getProgram().back();">..</button><p id="path">c/</p></div><hr><div id="files"></div>')
        this.wind.windowClose = function () {
            this.getProgram().removeSelf(this);
            return true;
        }
        this.wind.setButtons({
            //"..": "searchWindows(\'" + this.wind.getClass() + "\').getProgram().back();",
            "new": "var p=searchWindows(\'" + this.wind.getClass() + "\').getProgram().newFile();",
            //"jump": "searchWindows(\'" + this.wind.getClass() + "\').getProgram();",
        })

        this.loadFiles();

        //add special menu
        var el = searchWindows(this.wind.getClass()).getHtml();
        el.addEventListener('contextmenu', function (e) {
            searchWindows(this.className).getProgram().rightclick(e);
            e.preventDefault();
        }, false);
    }

    loadFiles() {
        if (this.pos == "/") {
            this.pos = "";
        }

        this.wind.getHtml().querySelector("#path").innerText = this.pos;

        var files = []
        var folders = []

        for (const [key, value] of Object.entries(fileLookup)) {
            if (key.startsWith(this.pos)) {
                if (!key.replace(this.pos, "").includes("/")) {
                    files.push("<button pos=\"" + key + "\" onclick=\"loadFile('" + key + "')\">" + key.replace(this.pos, "") + "</button>");
                } else if (key.replace(this.pos, "").split("/").length > 1) {
                    var v = "<button onclick=\"searchWindows('" + this.wind.getClass() + "').getProgram().folderSel('" + key.replace(this.pos, "").split("/")[0] + "');\">" + key.replace(this.pos, "").split("/")[0] + "/</button>"
                    if (!folders.includes(v)) {
                        folders.push(v);
                    }
                }
            }
        }
        this.wind.getHtml().querySelector("#files").innerHTML = folders.join("") + files.join("");
    }
    folderSel(f) {
        this.pos = this.pos + f + "/";
        this.loadFiles();
    }
    back() {
        this.pos = this.pos.split("/").slice(0, -2).join("/") + "/";
        this.loadFiles();
    }
    rightclick(e) {
        if (e.path[0].attributes.pos != undefined) {
            var path = e.path[0].attributes.pos.value;

            if (path.endsWith(".od") && !this.setOnlineAdressWaiting) {
                this.setOnlineAdressWaiting = true;
                this.setOnlineAdressPath = path
                windowPrompt("New Adress (" + localStorage.getItem(fileLookup[path]) + ")", this, "setOnlineAdress", "cancelSetOnlineAdress")
            }
        }
    }
    setOnlineAdress(value) {
        this.setOnlineAdressWaiting = false;
        localStorage.setItem(fileLookup[this.setOnlineAdressPath], value)
    }
    cancelSetOnlineAdress() {
        this.setOnlineAdressWaiting = false;
    }

    async newFile() {
        var nam = prompt('file name:');
        if (nam != null) {
            await saveFile(this.pos + nam, 'new File!');
            this.loadFiles();
        }
    }
}

prog = new program();