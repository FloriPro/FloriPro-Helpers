class program {
    onOpen() {
        alert("open");
    }

    onOpen(file) {
        alert("opened with file " + file);
    }

    init() {
        self.wind = createWindow("test :)", "automatic", null, this);
        self.wind.setContent('<input value="https://floripro.github.io/" onkeyup="if (event.keyCode === 13){this.parentNode.querySelector(\'iframe\').src=this.value;}"><br><iframe target="_top" src="https://floripro.github.io/" width="1000px" height="1000px" allowfullscreen="false" title=""><p>How the hell did you get here? Your browser doesn\'t even support Iframes!</p></iframe>')
        self.wind.windowClose = function () {
            this.getProgram().removeSelf(this);
            return true;
        }
    }
}

prog = new program();