class program {
    onOpen() {
        alert("open");
    }

    onOpen(file) {
        alert("opened with file " + file);
    }
    init(file) {
        this.init();
        fileSelect(file);
    }

    init() {
        this.path = null
        this.selectWindow = null;
        this.wind = createWindow("Text editor", 550, 500, this);
        this.wind.setContent('</div><div><textarea id="editing" oninput="let result_element = this.parentNode.querySelector(\'#highlighting-content\'); result_element.textContent = this.value;Prism.highlightElement(result_element);" onscroll="let result_element = this.parentNode.querySelector(\'#highlighting\');result_element.scrollTop = this.scrollTop;result_element.scrollLeft = this.scrollLeft;"></textarea><pre id="highlighting" aria-hidden="true"><code class="language-javascript" id="highlighting-content"></code></pre></div>')

        this.wind.setButtons({
            "File": "searchWindows(\'" + this.wind.getClass() + "\').getProgram().openFileExplorer()",
            "Save": "searchWindows(\'" + this.wind.getClass() + "\').getProgram().save()",
            "New": "searchWindows(\'" + this.wind.getClass() + "\').getProgram().path=prompt('new name');"
        })

        this.wind.windowClose = function () {
            this.getProgram().removeSelf(this);
            return true;
        }

        var styleSheet = document.createElement("style")
        styleSheet.innerText = getFile("c/programs/text/prism.css")
        document.head.appendChild(styleSheet)
        var styleSheet = document.createElement("style")
        styleSheet.innerText = getFile("c/programs/text/prism2.css")
        document.head.appendChild(styleSheet)

        eval(getFile("c/programs/text/prism.js"))
        eval(getFile("c/programs/text/prismaddon.js"))


        //this.selectWindow = createFastFileSelection(function () { this.getProgram().selectWindow = null; return true; }, "fileSelect", this)
    }

    openFileExplorer() {
        if (this.selectWindow == null) {
            this.selectWindow = createFastFileSelection(function () { this.getProgram().selectWindow = null; return true; }, "fileSelect", this)
        } else {
            windowAlert("please use the already opened file selection")
        }
    }
    fileSelect(file) {
        this.path = file;
        this.wind.getHtml().querySelector("#editing").value = getFile(file);
        this.wind.getHtml().querySelector("#editing").oninput()
        this.selectWindow.onCloseButton();
        this.selectWindow = null;
    }
    save() {
        saveFile(this.path, this.wind.getHtml().querySelector("#editing").value);
    }
}

prog = new program();