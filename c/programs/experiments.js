class program {
    initFile(file) {
        this.init();
        this.imageSelect(file);
    }
    async init() {
        this.selectWindow = null;
        this.wind = createWindow("Expiriments", "automatic", null, this);
        this.wind.setContent('<p>Testing</p>')
        this.wind.windowClose = function () {
            this.getProgram().removeSelf(this);
            return true;
        }
        this.wind.getHtml().style.background = "#ffffff7a"
        this.wind.getHtml().querySelector(".title-bar").style.background = "#f5f5f521"
        this.wind.getHtml().querySelector(".close").style.backgroundColor = "rgb(247 247 247 / 0%)"
        this.wind.getHtml().querySelector(".minimize").style.backgroundColor = "rgb(247 247 247 / 0%)"
        this.wind.getHtml().querySelector(".maximize").style.backgroundColor = "rgb(247 247 247 / 0%)"
    }
}

prog = new program();