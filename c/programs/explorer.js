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
        var menuData = {}
        if (e.path[0].attributes.pos != undefined) {
            var path = e.path[0].attributes.pos.value;

            menuData["duplicate"] = "windowAlert('wipDupe')";
            menuData["run as Program"] = "windowAlert('wipRun')";

            if (path.endsWith(".od") && !this.Waiting) {
                menuData["edit Adress"] = 'var t =searchWindows(\'' + this.wind.getClass() + '\').getProgram();t.Waiting=true;t.setOnlineAdressPath = \'' + path + '\';windowPrompt(\'New Adress (\' + localStorage.getItem(fileLookup[`' + path + '`]) + \')\', t, \'setOnlineAdress\', \'cancelWaiting\')';
            }
        } else {
            menuData["nothing to see here"] = "";
        }
        rightclickMenu(menuData, e.x, e.y);
    }
    setOnlineAdress(value) {
        console.log("set addres " + this.setOnlineAdressPath + " to " + value);
        this.Waiting = false;
        localStorage.setItem(fileLookup[this.setOnlineAdressPath], value)
    }
    cancelWaiting() {
        this.Waiting = false;
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