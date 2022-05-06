class program {
    onOpen() {
        alert("open");
    }

    onOpen(file) {
        alert("opened with file " + file);
    }
    initFile(file) {
        this.init();
        this.fileSelect(file);
    }

    async init() {
        this.path = null
        this.selectWindow = null;
        this.wind = createWindow("Text editor", 550, 500, this);
        this.wind.setContent('</div><div><textarea id="editing" oninput="let result_element = this.parentNode.querySelector(\'#highlighting-content\'); result_element.textContent = this.value;Prism.highlightElement(result_element);" onscroll="let result_element = this.parentNode.querySelector(\'#highlighting\');result_element.scrollTop = this.scrollTop;result_element.scrollLeft = this.scrollLeft;"></textarea><pre id="highlighting" aria-hidden="true"><code class="language-javascript" id="highlighting-content"></code></pre></div>')

        this.wind.setButtons({
            "File": "searchWindows(\'" + this.wind.getClass() + "\').getProgram().openFileExplorer()",
            "Save": "searchWindows(\'" + this.wind.getClass() + "\').getProgram().save()",
            "New": "searchWindows(\'" + this.wind.getClass() + "\').getProgram().path=prompt('new name');",
            "Run": "searchWindows(\'" + this.wind.getClass() + "\').getProgram().run()"
        })

        this.wind.windowClose = function () {
            this.getProgram().removeSelf(this);
            return true;
        }

        if (_globalVar["prismOK"] == undefined) {
            var styleSheet = document.createElement("style")
            styleSheet.innerText = await getFile("c/programs/text/prism.css")
            document.head.appendChild(styleSheet)
            var styleSheet = document.createElement("style")
            styleSheet.innerText = await getFile("c/programs/text/prism2.css")
            document.head.appendChild(styleSheet)

            eval(await getFile("c/programs/text/prism.js"))
            eval(await getFile("c/programs/text/prismaddon.js"))
            _globalVar["prismOK"] = true
        }

        Prism.highlightElement(this.wind.getHtml().querySelector('#highlighting-content'));


        //this.selectWindow = createFastFileSelection(function () { this.getProgram().selectWindow = null; return true; }, "fileSelect", this)
    }

    openFileExplorer() {
        if (this.selectWindow == null) {
            this.selectWindow = createFastFileSelection(function () { this.getProgram().selectWindow = null; return true; }, "fileSelect", this)
        } else {
            windowAlert("please use the already opened file selection")
        }
    }
    async fileSelect(file) {
        this.path = file;
        this.wind.getHtml().querySelector("#editing").value = await getFile(file);
        this.wind.getHtml().querySelector("#editing").oninput()
        if (this.selectWindow != null) {
            this.selectWindow.onCloseButton();
        }
        this.selectWindow = null;
    }
    save() {
        saveFile(this.path, this.wind.getHtml().querySelector("#editing").value);
    }
    async run() {
        this.save();
        eval(await getFile(this.path));
    }
}

prog = new program();