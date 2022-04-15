class program {
    onOpen() {
        alert("open");
    }

    onOpen(file) {
        alert("opened with file " + file);
    }

    init() {
        alert("moin");
    }

}
    
prog=new program();