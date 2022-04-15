class program {
    onOpen() {
        alert("this is an error");
    }

    onOpen(file) {
        alert("this is an error " + file);
    }

    init() {
        self.wind = createWindow("Programs", self);
        var data = "";

        for (const [key, value] of Object.entries(_dataPrograms)) {
            if (data != "") {
                data += "<hr>";
            }
            data += "<p onclick='startProgram(\"" + key + "\")' style='cursor:pointer;'>" + key + "</p>";
        }
        self.wind.setContent(data)
    }
    windowClose() {
        return true; //true to close, false to ignore
    }
}


prog = new program();