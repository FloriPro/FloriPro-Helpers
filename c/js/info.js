class program {
    onOpen() {
        alert("this is an error");
    }

    onOpen(file) {
        alert("this is an error " + file);
    }

    init() {
        this.wind = createWindow("Info", "automatic", null, this);
        this.wind.windowClose = function () {
            return true;
        }

        this.wind.setContent("<h1>Informations:</h1><p>this is a bad javascrip operating system. All the user data is stored localy in the browser. No os data is getting send from or to the server. You can easely make your own programs. Just open the text editor and view the programs. They are registered in data.json</p>")

    }
}


prog = new program();