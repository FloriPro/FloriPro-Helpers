class program {
    onOpen() {
        alert("open");
    }

    onOpen(file) {
        alert("opened with file " + file);
    }

    initFile(file) {
        this.init();
        this.imageSelect(file);
    }
    init() {
        this.selectWindow = null;
        this.wind = createWindow("image viewer", "automatic", null, this);
        //this.wind.setContent('<button onclick="document.getElementsByClassName(\'' + this.wind.getClass() + '\')[0].querySelector(\'#tableBanner\').src=imagePathToStringSrc(prompt(\'File Path:\'));">file</button><img id="tableBanner">')
        this.wind.setContent('<button onclick="searchWindows(\'' + this.wind.getClass() + '\').getProgram().openFileExplorer()">file</button><img id="tableBanner">')
        this.wind.windowClose = function () {
            this.getProgram().removeSelf(this);
            return true;
        }

        //this.selectWindow = createFastFileSelection(function () { this.getProgram().selectWindow = null; return true; }, "imageSelect", this)
        this.wind.getHtml().querySelector('#tableBanner').src = imagePathToStringSrc('c/static/background2.jpg');
        this.wind.getHtml().querySelector("img").style.zoom = "25%"
    }

    openFileExplorer() {
        if (this.selectWindow == null) {
            this.selectWindow = createFastFileSelection(function () { this.getProgram().selectWindow = null; return true; }, "imageSelect", this)
        } else {
            windowAlert("please use the already opened file selection")
        }
    }
    imageSelect(image) {
        try {
            this.wind.getHtml().querySelector('#tableBanner').src = imagePathToStringSrc(image);
        } catch {
            windowAlert("could not load image file")
        }
        if (this.selectWindow != null) {
            this.selectWindow.onCloseButton();
        }
        this.selectWindow = null;
    }
}

prog = new program();