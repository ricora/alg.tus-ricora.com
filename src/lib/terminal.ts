import { githubRepositoryUrl, githubScreenName, twitterScreenName } from "@/lib/metadata"
import { FitAddon } from "@xterm/addon-fit"
import { Terminal as Xterm } from "@xterm/xterm"
import Bowser from "bowser"
import { say as cowsay } from "cowsay"
import stringArgv from "string-argv"

export class CustomTerminal {
  xterm: Xterm
  fitAddon: FitAddon
  command: string
  launchDate: Date
  constructor(terminalElement: HTMLDivElement) {
    this.xterm = new Xterm({
      rows: 24,
      cols: 80,
      fontSize: 12,
      fontFamily: "Juisee, Ubuntu Mono, courier-new, courier, monospace",
    })
    this.fitAddon = new FitAddon()

    this.xterm.loadAddon(this.fitAddon)
    this.xterm.open(terminalElement)
    this.fitAddon.fit()
    this.writePS1()

    this.command = ""
    this.launchDate = new Date()

    this.xterm.onKey((e) => {
      if (e.key.charCodeAt(0) === 13) {
        // Enter
        this.xterm.write("\n")
        this.xterm.write(e.key)
        this.executeCommand(this.command)
        this.command = ""
        this.writePS1()
      } else if (e.key.charCodeAt(0) === 127) {
        // Backspace
        if (this.command.length > 0) {
          this.xterm.write("\b \b")
          this.command = this.command.slice(0, -1)
        }
      } else if (e.key.charCodeAt(0) === 9) {
        // Tab
      } else if (e.key.charCodeAt(0) === 27) {
        // Escape
      } else {
        // Normal key
        if (this.command.length < 25) {
          // NOTE: コマンドが折り返したときの挙動が怪しいので文字数制限を設けている
          this.xterm.write(e.key)
          this.command += e.key
        }
      }
    })
  }

  private writePS1() {
    this.xterm.write("\x1B[1;32mguest@ricora-alg\x1B[0m:\x1B[1;34m~\x1B[0m$ ")
  }

  private executeCommand(command: string) {
    // Browser
    const browser = Bowser.parse(window.navigator.userAgent)

    // Uptime
    const nowDate = new Date()
    const launchDateDiff = nowDate.getTime() - this.launchDate.getTime()

    let minutes = Math.floor(launchDateDiff / 1000 / 60)
    let hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)
    hours = hours % 24
    minutes = minutes % 60

    const [commandName, ...args] = stringArgv(command)
    if (command.includes("&&") || command.includes("||")) {
      this.xterm.write("Sorry but this terminal does not support logical operators.\n\r")
      return
    } else if (command.includes(";")) {
      this.xterm.write("Sorry but this terminal does not support command chaining with semicolon.\n\r")
      return
    } else if (command.includes("&")) {
      this.xterm.write("Sorry but this terminal does not support background execution.\n\r")
      return
    } else if (command.includes(">") || command.includes("<")) {
      this.xterm.write("Sorry but this terminal does not support redirection.\n\r")
      return
    } else if (command.includes("|")) {
      this.xterm.write("Sorry but this terminal does not support piping.\n\r")
    } else if (command.includes("*") || command.includes("?")) {
      this.xterm.write("Sorry but this terminal does not support wildcard characters.\n\r")
      return
    } else if (command.includes("$((")) {
      this.xterm.write("Sorry but this terminal does not support arithmetic expansion.\n\r")
      return
    } else if (command.includes("$(") || command.includes("${")) {
      this.xterm.write("Sorry but this terminal does not support command or variable substitution.\n\r")
      return
    } else if (command.includes("=")) {
      this.xterm.write("Sorry but this terminal does not support variable assignment.\n\r")
      return
    }

    switch (commandName) {
      case undefined:
        break
      case "":
        break
      case "help":
        this.xterm.write("Welcome to alg.tus-ricora.com!\n\rTry some of the commands below.\n\r")
        this.xterm.write("  \x1B[1;36mhelp\x1B[0m          - Show this help message.\n\r")
        this.xterm.write("  \x1B[1;36mls [-a|--all]\x1B[0m - List files in the current directory.\n\r")
        this.xterm.write(
          "  \x1B[1;36mcat [file]...\x1B[0m - \x1B[9mPrint the contents of a file.\x1B[0m\n\r                  Concatenate file(s) to standard output.\n\r",
        )
        this.xterm.write("  \x1B[1;36mpwd\x1B[0m           - Print the name of the current working directory.\n\r")
        this.xterm.write("  \x1B[1;36mdate\x1B[0m          - Print the system date and time.\n\r")
        this.xterm.write("  \x1B[1;36mcowsay [text]\x1B[0m - Print a talking cow.\n\r")
        this.xterm.write("  \x1B[1;36mscreenfetch\x1B[0m   - Print the system information.\n\r")
        this.xterm.write("  \x1B[1;36mclear\x1B[0m         - Clear the terminal screen.\n\r")
        break
      case "ls":
        if (args.includes("-a") || args.includes("--all")) {
          this.xterm.write(".\n\r")
          this.xterm.write("..\n\r")
          this.xterm.write(".secret.md\n\r")
        }
        this.xterm.write("about.md\n\r")
        this.xterm.write("icon.txt\n\r")
        this.xterm.write("links.md\n\r")
        this.xterm.write("terminal.md\n\r")
        this.xterm.write("tips.md\n\r")
        break
      case "cat":
        if (args.length === 0) {
          this.xterm.write("cat: missing file operand\n\r")
          break
        } else {
          args.forEach((arg) => {
            switch (arg) {
              case ".secret.md":
                this.xterm.write("# Secret\n\r")
                this.xterm.write("\n\r")
                this.xterm.write("Congratulations🎉\n\r")
                this.xterm.write("\n\r")
                this.xterm.write("You've found a secret file! Here's a secret message just for you:\n\r")
                this.xterm.write("\n\r")
                this.xterm.write("RICORA Programming Team appreciates your curiosity. Keep exploring!\n\r")
                this.xterm.write(
                  `If you're interested in programming and want to take it to the next level, consider joining us. We're always looking for new members! Refer to [contact page].\n\r`,
                )
                this.xterm.write("\n\r")
                this.xterm.write(`[contact page]: ${new URL("/contact", import.meta.env.SITE).toString()}\n\r`)
                this.xterm.write("\n\r")
                this.xterm.write(
                  `You can also contribute to our projects. Check out [our repository]. We appreciate all contributions, no matter how small. Let's build something amazing together!\n\r`,
                )
                this.xterm.write("\n\r")
                this.xterm.write(`[our repository]: ${githubRepositoryUrl}\n\r`)
                break
              case "about.md":
                this.xterm.write("# About\n\r")
                this.xterm.write("\n\r")
                this.xterm.write(
                  "**RICORA Programming Team** is a student organization active in the Noda area of Tokyo University of Science.\n\r",
                )
                break
              case "icon.txt":
                this.xterm.write("       :%%%%-    #%%%#    \n\r")
                this.xterm.write("        *@@@@    :@@@@=   \n\r")
                this.xterm.write("   =++++@@@@%++++#@@@@+-  \n\r")
                this.xterm.write("  :@@@@@@@@@@@@@@@@@@@@@@.\n\r")
                this.xterm.write("  =%%%%@@@@@%%%%%%%%@@@@@*\n\r")
                this.xterm.write("      :@@@@=        =@@@@+\n\r")
                this.xterm.write("      *@@@@         *@@@@.\n\r")
                this.xterm.write(" *%%%%@@@@@%%%%%%%%@@@@@= \n\r")
                this.xterm.write(":@@@@@@@@@@@@@@@@@@@@@%:  \n\r")
                this.xterm.write(":++++@@@@%++++#@@@@*=.    \n\r")
                this.xterm.write("    :@@@@=    %@@@%       \n\r")
                this.xterm.write("    *@@@%    :@@@@=       \n\r")
                break
              case "links.md":
                this.xterm.write("# Links\n\r")
                this.xterm.write("\n\r")
                this.xterm.write(`- [GitHub](https://github.com/${githubScreenName})\n\r`)
                this.xterm.write(`- [X (Formerly Twitter)](https://twitter.com/${twitterScreenName})\n\r`)
                break
              case "terminal.md":
                this.xterm.write("# Terminal\n\r")
                this.xterm.write("\n\r")
                this.xterm.write(
                  "This is a simple terminal simulator (**NOT emulator**) written in TypeScript and Xterm.js.\n\r",
                )
                break
              case "tips.md":
                this.xterm.write("# Tips\n\r")
                this.xterm.write("\n\r")
                this.xterm.write("`help` command shows the help message.\n\r")
                break
              default:
                this.xterm.write(`cat: ${arg}: No such file or directory\n\r`)
                break
            }
          })
        }
        break
      case "cowsay":
        this.xterm.write(cowsay({ text: args.join(" ") || "hello ricora" }).replaceAll("\n", "\n\r"))
        this.xterm.write("\n\r")
        break
      case "pwd":
        this.xterm.write(import.meta.env.SITE)
        this.xterm.write("\n\r")
        break
      case "date":
        this.xterm.write(new Date().toString())
        this.xterm.write("\n\r")
        break
      case "screenfetch":
        this.xterm.write("       :%%%%-    #%%%#      \x1B[1;32mguest@ricora-alg\x1B[0m\n\r")
        this.xterm.write("        *@@@@    :@@@@=     ----------------\n\r")
        this.xterm.write("   =++++@@@@%++++#@@@@+-    \x1B[1;31mOS\x1B[0m: RICORA OS\n\r")
        this.xterm.write(
          `  :@@@@@@@@@@@@@@@@@@@@@@.  \x1B[1;32mHost\x1B[0m: ${
            browser.browser.version !== undefined
              ? `${
                  browser.browser.name !== undefined ? `${browser.browser.name} ${browser.browser.version}` : "Unknown"
                }`
              : `${browser.browser.name !== undefined ? browser.browser.name : "Unknown"}`
          }\n\r`,
        )
        this.xterm.write(
          `  =%%%%@@@@@%%%%%%%%@@@@@*  \x1B[1;33mUptime\x1B[0m: ${days > 0 ? `${days} days, ` : ""}${
            hours > 0 ? `${hours} hours, ` : ""
          }${minutes} mins\n\r`,
        )
        this.xterm.write("      :@@@@=        =@@@@+  \x1B[1;34mShell\x1B[0m: ricorash\n\r")
        this.xterm.write(
          `      *@@@@         *@@@@.  \x1B[1;35mResolution\x1B[0m: ${window.screen.width}x${window.screen.height}\n\r`,
        )
        this.xterm.write(" *%%%%@@@@@%%%%%%%%@@@@@=   \x1B[1;36mTerminal\x1B[0m: Xterm.js\n\r")
        this.xterm.write(":@@@@@@@@@@@@@@@@@@@@@%:    \x1B[1;37mTerminal Font\x1B[0m: Juisee\n\r")
        this.xterm.write(":++++@@@@%++++#@@@@*=.      \n\r")
        this.xterm.write("    :@@@@=    %@@@%         \n\r")
        this.xterm.write("    *@@@%    :@@@@=         \n\r")
        this.xterm.write(
          "                            \x1B[40m   \x1B[0m\x1B[41m   \x1B[0m\x1B[42m   \x1B[0m\x1B[43m   \x1B[0m\x1B[44m   \x1B[0m\x1B[45m   \x1B[0m\x1B[46m   \x1B[0m\x1B[47m   \x1B[0m\n\r",
        )
        this.xterm.write("\n\r")
        break
      case "clear":
        this.xterm.clear()
        break
      default:
        this.xterm.write(`${commandName}: command not found\n\r`)
        break
    }
  }
}
