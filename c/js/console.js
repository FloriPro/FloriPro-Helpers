class cons {
    async init() {
        this.commands = ["start"]
        this.console = []
        this.position = "c/"
    }
    async run(command, args) {
        if (this.commands.includes(command)) {
            eval(getFile("c/js/cons/" + command + ".js"))
            _(this.position, args);
        } else {
            this.console.push("command not defined");
        }
    }
    async evalComm(imp) {
        for (var comm of imp.split(";")) {
            var sp = comm.split(" ")
        }
    }
}

var c = new cons()
c.init();