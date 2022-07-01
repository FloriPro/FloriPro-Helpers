_ = async function (poition, args) {
    var d = await getFile(_dataPrograms[args[0]]);
    if (d == null) {
        this.console.push("file does'n exits!")
        return;
    }
    var r = await startProgram(args[0]);
    if (r != null) {
        this.console.push(r);
        return;
    }
}