class program {
    onOpen() {
        alert("open");
    }

    onOpen(file) {
        alert("opened with file " + file);
    }

    init() {
        this.wind = createWindow("Browser", "automatic", null, this);
        this.wind.setContent('<input value="https://floripro.github.io/" onkeyup="if (event.keyCode === 13){this.parentNode.querySelector(\'iframe\').src=this.value;}"><br><iframe target="_top" src="https://floripro.github.io/" width="1000px" height="1000px" allowfullscreen="false" title=""><p>How the hell did you get here? Your browser doesn\'t even support Iframes!</p></iframe>')
        this.wind.windowClose = function () {
            this.getProgram().removeSelf(this);
            return true;
        }
        this.wind.setButtons({
            "set size": "searchWindows(\'" + this.wind.getClass() + "\').getProgram().setSize();",
            "reload": "var i =searchWindows(\'" + this.wind.getClass() + "\').getProgram().wind.getHtml().querySelector('iframe');i.src=i.src;"
        })
    }

    setSize() {
        windowPrompt("<größeX>-<größeY>", this, "setSizeAnswer")
    }
    setSizeAnswer(dat) {
        this.wind.getHtml().querySelector("iframe").width = dat.split("-")[0]
        this.wind.getHtml().querySelector("iframe").height = dat.split("-")[1]
    }
}

prog = new program();