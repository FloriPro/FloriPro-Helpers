class program {
    init() {
        var data = "";
        for (const [key, value] of Object.entries(_dataPrograms)) {
            if (data != "") {
                data += "<hr>";
            }
            data += "<p onclick='startProgram(\"" + key + "\");getProgramId(" + this.id + ").wind.onCloseButton();' style='cursor:pointer;'>" + key + "</p>";
        }

        this.wind = createWindow("Programs", "automatic", null, this);
        this.wind.windowClose = function () {
            //nextWindowPosX = parseInt(document.getElementsByClassName(this.getClass())[0].style.left)
            //nextWindowPosY = parseInt(document.getElementsByClassName(this.getClass())[0].style.top)
            this.getProgram().removeSelf(this);
            return true;
        }

        this.wind.setContent(data)

    }
}


prog = new program();