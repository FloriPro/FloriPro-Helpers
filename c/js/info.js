class program {
    async init() {
        this.currentPath = "index"
        this.informationData = JSON.parse(await getFile("c/js/info/data.json"));

        this.wind = createWindow("Info", 500, 400, this);
        this.wind.windowClose = function () {
            return true;
        }
        await this.loadContent()
    }
    async loadContent() {
        var links = "<hr>"
        if (this.currentPath.split("/").length > 1) {
            links += "<a style='cursor:pointer;color:darkblue' onclick=\"searchWindows('" + this.wind.getClass() + "').getProgram().open('..')\">..</a><br>"
        }
        for (const [key, value] of Object.entries(this.loadPathData()["children"])) {
            links += "<a style='cursor:pointer;color:darkblue' onclick=\"searchWindows('" + this.wind.getClass() + "').getProgram().open('" + key + "')\">" + key + "</a><br>"
        }
        this.wind.setContent("<h1>Informations (" + this.currentPath + "):</h1><p>" + this.loadPathData()["text"] + "</p>" + links)
    }
    loadPathData() {
        var d = this.informationData;
        for (var x of this.currentPath.split("/")) {
            d = d["children"][x];
        }
        return d;
    }
    async open(key) {
        if (typeof this.loadPathData()["children"][key] == "string" &&
            this.loadPathData()["children"][key].startsWith("_")) {
            this.currentPath = this.loadPathData()["children"][key].slice(1);
        }
        else if (key == "..") {
            var v = this.currentPath.split("/");
            v.pop();
            this.currentPath = v.join("/");
        } else {
            this.currentPath += "/" + key;
        }
        console.log(this.currentPath);
        await this.loadContent();
    }
}


prog = new program();