class program {
    onOpen() {
        alert("open");
    }

    onOpen(file) {
        alert("opened with file " + file);
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

        this.selectWindow = createFastFileSelection(function () { this.getProgram().selectWindow = null; return true; }, "imageSelect", this)
        this.wind.getHtml().querySelector('#tableBanner').src = imagePathToStringSrc('c/static/background2.jpg');
        console.log(this.wind.getHtml().querySelector("img").style.zoom = "25%");
    }

    openFileExplorer() {
        if (this.selectWindow == null) {
            this.selectWindow = createFastFileSelection(function () { this.getProgram().selectWindow = null; return true; }, "imageSelect", this)
            //this.selectWindow = createWindow("file selection (pre-alpha)", "automatic", null, this);
            //this.selectWindow.windowClose = function () {
            //    this.getProgram().selectWindow = null;
            //    return true;
            //}
            ////create data
            //var data = ""
            //for (const [x, value] of Object.entries(fileLookup)) {
            //    data += '<button onclick="searchWindows(\'' + this.selectWindow.getClass() + '\').getProgram().imageSelect(\'' + x + '\')">' + x + '</button>';
            //}
            //this.selectWindow.setContent("<h2>Select a File</h2>" + data);
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
        this.selectWindow.onCloseButton();
        this.selectWindow = null;
    }
}

prog = new program();