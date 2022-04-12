var shell = document.getElementById("shell");
shell.onkeydown = shellHandler

var commands = [
    {
        name: "help",
        description: "Gets informations about commands",
        usage: "help [command]",
        handler: helpHandler
    },
    {
        name: "clear",
        description: "Clears the output",
        usage: "clear",
        handler: clearOutput
    },
    {
        name: "about",
        description: "Shows about text",
        usage: "about",
        handler: aboutHandler
    },
    {
        name: "projects",
        description: "Shows current and done projects",
        usage: "projects",
        handler: projectsHandler
    },
    {
        name: "social",
        description: "Shows social media accounts",
        usage: "social",
        handler: socialHandler
    }
]

function shellHandler(e) {
    if (e.code == "Enter") {
        clearOutput()
        let args = shell.value.split(" ")
        let result = commands.find(v => v.name == args[0])
        if (!result) {
            let warn = document.createElement("div")
            warn.className = "warn"
            warn.innerText = "Command not found"
            warn.onclick = removeWarn

            document.getElementById("warn-stack").appendChild(warn)
            shell.value = ""
            return
        } else {
            result.handler(args.slice(1))
            shell.value = ""
        }
    }
}

function writeOutput(text) {
    document.getElementById("output").innerText += text
}

function writeUnsafeOutput(text) {
    document.getElementById("output").innerHTML += text
}

function clearOutput() {
    document.getElementById("output").innerText = ""
}

function helpHandler(args) {
    if (args.length == 0) {
        writeOutput("{parameter} | [optional parameter]\n\n")
        commands.forEach(v => {
            writeOutput(`${v.usage}: ${v.description}\n`)
        })
    } else {
        let result = commands.find(v => v.name == args[0])

        if (!result) {
            let warn = document.createElement("div")
            warn.className = "warn"
            warn.innerText = "Command not found"
            warn.onclick = removeWarn

            document.getElementById("warn-stack").appendChild(warn)
        } else writeOutput(`${result.usage}: ${result.description}\n`)
    }
}

function aboutHandler(_) {
    writeOutput(`I'm currently X years old. I like engineering stuffs.
I’m currently learning C#
I want to be a software engineer in the future.
I forgot to mention, I love cats alot!`)
}

function socialHandler(_) {
    writeOutput(`
Discord: 480052371125436421
Twitter: Egecoku
Github: recoist1903
Steam: recoist1903`)
}

function projectsHandler(_) {
    writeUnsafeOutput(`
<a href="https://github.com/recoist1903/vsIDE-voiceassistant" target="_blank">vsIde-voiceassistant:</a> A simple voice assistant to make it easy to use visual studio.
<br>`)
}

function removeWarn(e) {
    e.target.remove()
}

document.getElementsByClassName("warn")[0].onclick = removeWarn