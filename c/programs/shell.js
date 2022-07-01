class program {
    init() {
        this.correntConsole = [];
        console.log("JShell V0.1 by FloriPro");

        this.updateSlower = 0;
        this.wind = createWindow("Shell", "500", "fit-content", this);
        this.wind.setContent('<div class="consoleOutput"><div class="consoleLog"><p>console loading. Please Wait...</p></div></div><div style="display:flex"><p class="consoleInput">JShell></p><input placeholder="" class="consoleInput" type="text" style="width: -webkit-fill-available;" onkeyup="if (event.keyCode == 13){console.log(\'JShell>\'+this.value);try{var r=eval(this.value);if (r==undefined){console.information(\'> undefined\')}else{console.log(\'> \'+r)};}catch(e){console.error(e);}this.value=\'\';searchWindows(\'' + this.wind.getClass() + '\').getProgram().redrawConsole()}"></input></div>')
        this.wind.windowClose = function () {
            this.getProgram().removeSelf(this);
            return true;
        }
        this.wind.setButtons({
            "clear": "_dataConsole = [];"
        })
    }

    genConsoleDat(_dataConsole) {
        var ht = "";
        for (var x of _dataConsole) {
            var xk = Object.keys(x);
            var className = "error";
            if (xk[0] == "log") {
                var className = "consoleLog";
            } else if (xk[0] == "warn") {
                var className = "consoleWarn";
            } else if (xk[0] == "information") {
                var className = "consoleInformation";
            } else if (xk[0] == "error") {
                var className = "consoleError";
            }
            ht = '<div class="' + className + '"><p>' + x[xk[0]].replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;") + '</p></div>' + ht;
        }
        return ht;
    }

    redrawConsole() {
        var ht = this.genConsoleDat(_dataConsole);
        var hto = this.genConsoleDat(this.correntConsole);
        if (hto != ht) {
            this.correntConsole = _dataConsole.slice();
            this.wind.getHtml().querySelector(".consoleOutput").innerHTML = ht;
            this.wind.getHtml().querySelector(".consoleOutput").scrollTop = this.wind.getHtml().querySelector(".consoleOutput").scrollHeight;
        }
    }

    update() {
        if (this.updateSlower == 0) {
            this.redrawConsole();
        }
        this.updateSlower++;
        if (this.updateSlower >= 5) {
            this.updateSlower = 0;
        }
    }
}

prog = new program();