class program {
    onOpen() {
        alert("this is an error");
    }

    onOpen(file) {
        alert("this is an error " + file);
    }

    init() {
        var data = "";
        for (const [key, value] of Object.entries(_dataPrograms)) {
            if (data != "") {
                data += "<hr>";
            }
            data += "<p onclick='startProgram(\"" + key + "\")' style='cursor:pointer;'>" + key + "</p>";
        }


        self.wind = createWindow("Programs", "automatic");
        self.wind.windowClose = function () { console.log("idk"); return true; }

        self.wind.setContent(data)

    }
}


prog = new program();