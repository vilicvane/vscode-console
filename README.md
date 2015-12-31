# Console

A Visual Studio Code extension for opening projects in user-defined consoles.

## Commands

### `console.open`

**description:** Open current workspace in user-defined console.  
**key binding:** `Ctrl/Cmd+Shift+C`

### `console.openActive`  

**description:** Open the directory containing active file in user-defined console.  
**key binding:** `Ctrl/Cmd+Shift+A`

**You must configure a console executable to use this extension.**

For example:

```json
{
    "console.executable": "cmd.exe",
    "console.args": "/s /c \"\"C:\\Program Files\\ConEmu\\ConEmu64.exe\" /single /icon code.exe /title \"ConEmu - Visual Studio Code\"\""
}
```

**Note:** there is some issue with Ctrl+C if you start ConEmu directly with `"console.detached": true`.
It is recommended to use `cmd.exe` to start ConEmu.

## Configurations

### `console.executable`

Path of the console executable.

### `console.args`

Arguments in an array or string.
If it's an array, the executable will be execute using `spawn`, otherwise `exec`.

### `console.detached`

Take effects only if `console.args` is an array (thus `spawn` is used).

### `console.cwd`

Current working directory for command `console.open`, defaults to `"{dirname}"`.

## License

MIT License.
