import { spawn } from 'child_process';

import {
    window,
    workspace,
    commands,
    ExtensionContext
} from 'vscode'; 

export function activate(context: ExtensionContext) {
	let disposable = commands.registerCommand('console.open', () => {
		let config = workspace.getConfiguration('console');
        let executablePath = config.get<string>('executable');
        let args = config.get<string[]>('args') || [];
        
        if (!executablePath) {
            window.showInformationMessage('No executable has be configured with `console.open` command.');
            return;
        }
        
        let workingDir = workspace.rootPath;
        
        if (!workingDir) {
            window.showInformationMessage('Please open a folder first.');
            return;
        }
        
        spawn(executablePath, args, {
            detached: true,
            cwd: workingDir
        });
	});
	
	context.subscriptions.push(disposable);
}
