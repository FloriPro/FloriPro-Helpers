class program {
    onOpen() {
        alert("open");
    }

    onOpen(file) {
        alert("opened with file " + file);
    }

    init() {
        self.wind = createWindow("test :)", "automatic");
        self.wind.setContent("<h1>just some testing</h1>")
    }
}

prog = new program();