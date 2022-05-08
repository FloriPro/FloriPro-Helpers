class program {
    async init() {
        this.currentSelection = null;
        this.selectWindow == null;

        this.wind = createWindow("Settings", "automatic", null, this);
        this.wind.windowClose = function () {
            this.getProgram().removeSelf(this);
            return true;
        }
        var d = "";
        for (const [key, value] of Object.entries(JSON.parse(await getFile("c/data.json"))["settings"])) {
            d += "<button onclick=\"searchWindows('" + this.wind.getClass() + "').getProgram().openSetting('" + key + "')\">" + key + ": " + _dataSettings[key] + "</button>";
        }

        this.wind.setContent("<h1>Settings:</h1>" + d)
    }

    async openSetting(setting) {
        if (this.currentSelection == null) {
            var settingType = JSON.parse(await getFile("c/data.json"))["settings"][setting]

            this.currentSelection = setting;

            if (settingType == "text") {
                windowPrompt("change Setting(text) to", this, "dataReturn", "dataCanceled", "text");
            }
            if (settingType == "number") {
                windowPrompt("change Setting(number) to", this, "dataReturn", "dataCanceled", "number");
            }
            if (settingType == "file") {
                this.selectWindow = createFastFileSelection(function () {
                    this.getProgram().selectWindow = null;
                    this.getProgram().currentSelection = null;
                    return true;
                }, "dataReturn", this);
            }
        } else {
            windowAlert("please use the already opened window")
        }
    }
    async dataReturn(output) {
        if (this.selectWindow != null) {
            this.selectWindow.onCloseButton();
        }
        console.log("returned " + output);
        _dataSettings[this.currentSelection] = output;

        eval(_dataDataJson["settingsChange"][this.currentSelection])

        var d = "";
        for (const [key, value] of Object.entries(JSON.parse(await getFile("c/data.json"))["settings"])) {
            d += "<button onclick=\"searchWindows('" + this.wind.getClass() + "').getProgram().openSetting('" + key + "')\">" + key + ": " + _dataSettings[key] + "</button>";
        }

        this.wind.setContent("<h1>Settings:</h1>" + d)
        this.currentSelection = null;
        saveSettings();
    }
    async dataCanceled() {
        this.currentSelection = null;
        console.log("canceled selection");
    }
}


prog = new program();