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
    "console.executable": "C:\\Program Files\\ConEmu\\ConEmu64.exe",
    "console.args": ["/single"]
}
```

## License

MIT License.
