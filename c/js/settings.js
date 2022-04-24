class program {
    onOpen() {
        alert("this is an error");
    }

    onOpen(file) {
        alert("this is an error " + file);
    }

    init() {
        this.wind = createWindow("Settings", "automatic", null, this);
        this.wind.windowClose = function () {
            this.getProgram().removeSelf(this);
            return true;
        }
        var d = "";
        for (const [key, value] of Object.entries(JSON.parse(getFile("c/data.json"))["settings"])) {
            d += "<button>" + key + "</button>";
        }

        this.wind.setContent("<h1>Settings:</h1>" + d)
    }
}


prog = new program();