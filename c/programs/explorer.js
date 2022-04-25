class program {
    onOpen() {
        alert("open");
    }

    onOpen(file) {
        alert("opened with file " + file);
    }

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
            "new": "var p=searchWindows(\'" + this.wind.getClass() + "\').getProgram();saveFile(p.pos+prompt('file name:'),'new File!');p.loadFiles();",
            //"jump": "searchWindows(\'" + this.wind.getClass() + "\').getProgram();",
        })

        this.loadFiles();
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
                    files.push("<button onclick=\"loadFile('" + key + "')\">" + key.replace(this.pos, "") + "</button>");
                } else if (key.replace(this.pos, "").split("/").length > 1) {
                    var v = "<button onclick=\"searchWindows('" + this.wind.getClass() + "').getProgram().folderSel('" + key.replace(this.pos, "").split("/")[0] + "');\">" + key.replace(this.pos, "").split("/")[0] + "/</button>"
                    if (!folders.includes(v)) {
                        folders.push(v);
                    }
                }
            }
        }
        this.wind.getHtml().querySelector("#files").innerHTML = folders.join("")+files.join("");
    }
    folderSel(f) {
        this.pos = this.pos + f + "/";
        this.loadFiles();
    }
    back() {
        this.pos = this.pos.split("/").slice(0, -2).join("/") + "/";
        console.log(this.pos);
        this.loadFiles();
    }
}

prog = new program();