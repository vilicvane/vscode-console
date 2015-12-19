import * as ChildProcess from 'child_process';
import * as Path from 'path';

import {
    window,
    workspace,
    commands,
    ExtensionContext
} from 'vscode';

import * as vscode from 'vscode';

const hop = Object.prototype.hasOwnProperty;

export function activate(context: ExtensionContext): void {
	let commandOpenDisposable = commands.registerCommand('console.open', () => {
        executeCommand();
	});
	
	context.subscriptions.push(commandOpenDisposable);
    
	let commandOpenActiveDisposable = commands.registerTextEditorCommand('console.openActive', editor => {
        executeCommand(editor.document.fileName);
	});
	
	context.subscriptions.push(commandOpenActiveDisposable);
}

function executeCommand(activeFilePath?: string) {
    let { exe, args, cwd } = getOptions(activeFilePath);
    
    if (!exe) {
        window.showInformationMessage('No executable has be configured with `console.open` command.');
        return;
    }
    
    if (!cwd) {
        window.showInformationMessage('Please open a folder first.');
        return;
    }
    
    ChildProcess.spawn(exe, args, {
        detached: true,
        cwd
    });
}

interface SpawnOptions {
    exe: string;
    args: string[];
    cwd: string;
}

function getOptions(activeFilePath?: string): SpawnOptions {
    let config = workspace.getConfiguration('console');
    
    let exe = config.get<string>('executable');
    let args = config.get<string[]>('args') || [];
    
    let data: HashTable<string> = {
        dirname: activeFilePath ?
            Path.dirname(activeFilePath) : workspace.rootPath
    };
    
    args = args.map(arg => buildValue(arg, data));
    
    let cwd = buildValue(config.get<string>('cwd'), data);
    
    return {
        exe,
        args,
        cwd
    };
}

function buildValue(template: string, data: HashTable<string>): string {
    return template.replace(/\{(\w+)\}/g, (text, variableName) => {
        if (hop.call(data, variableName)) {
            return data[variableName] || '';
        } else {
            return text;
        }
    });
}
