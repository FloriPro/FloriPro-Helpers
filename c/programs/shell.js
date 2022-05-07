class program {
    init() {
        this.updateSlower = 0;
        this.wind = createWindow("Shell", "500", "fit-content", this);
        this.wind.setContent('<div class="consoleOutput"><div class="consoleLog"><p>console loading. Please Wait...</p></div></div><div style="display:flex"><p class="consoleInput">JShell></p><input placeholder="" class="consoleInput" type="text" style="width: -webkit-fill-available;" onkeyup="if (event.keyCode == 13){console.log(\'JShell>\'+this.value);try{eval(this.value);}catch(e){console.error(e);}this.value=\'\';searchWindows(\'' + this.wind.getClass() + '\').getProgram().redrawConsole()}"></input></div>')
        this.wind.windowClose = function () {
            this.getProgram().removeSelf(this);
            return true;
        }
        this.wind.setButtons({
            "clear": "_dataConsole = [];"
        })
    }

    redrawConsole() {
        var ht = "";
        for (var x of _dataConsole) {
            var xk = Object.keys(x);
            var className = "error";
            if (xk[0] == "log") {
                var className = "consoleLog";
            } else if (xk[0] == "warn") {
                var className = "consoleWarn";
            } else if (xk[0] == "error") {
                var className = "consoleError";
            }
            ht = '<div class="' + className + '"><p>' + x[xk[0]] + '</p></div>' + ht;
        }
        if (this.wind.getHtml().querySelector(".consoleOutput").innerHTML != ht) {
            this.wind.getHtml().querySelector(".consoleOutput").innerHTML = ht;
            this.wind.getHtml().querySelector(".consoleOutput").scrollTop = this.wind.getHtml().querySelector(".consoleOutput").scrollHeight;
        }
    }

    update() {
        if (this.updateSlower == 0) {
            this.redrawConsole();
        }
        this.updateSlower++;
        if (this.updateSlower >= 3) {
            this.updateSlower = 0;
        }
    }
}

prog = new program();