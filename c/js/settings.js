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
            console.log("handle close");
            this.getProgram().removeSelf(this);
            return true;
        }

        this.wind.setContent("<h1>Settings:</h1>")
    }
}


prog = new program();