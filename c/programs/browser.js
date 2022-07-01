class program {
    init() {
        this.wind = createWindow("Browser", 800, 600, this);
        this.wind.setContent('<input value="https://floripro.github.io/" onkeyup="if (event.keyCode === 13){this.parentNode.querySelector(\'iframe\').src=this.value;}"><br><div style="height: inherit;"><iframe target="_top" src="https://floripro.github.io/" width="1000px" height="1000px" allowfullscreen="false" title=""><p>How the hell did you get here? Your browser doesn\'t even support Iframes!</p></iframe></div>')
        this.wind.windowClose = function () {
            this.getProgram().removeSelf(this);
            return true;
        }
        this.wind.setButtons({
            "reload": "var i =searchWindows(\'" + this.wind.getClass() + "\').getProgram().wind.getHtml().querySelector('iframe');i.src=i.src;"
        });

        this.wind.getHtml().querySelector("iframe").style.width = "-webkit-fill-available";
        this.wind.getHtml().querySelector("iframe").style.height = "-webkit-fill-available";
    }
}

prog = new program();