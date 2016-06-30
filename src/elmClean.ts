import * as vscode from 'vscode';
import * as utils from './elmUtils';
import * as path from 'path';
import * as fs from 'fs';
import * as rimraf from 'rimraf';

function runClean(editor: vscode.TextEditor) {
  try {
    const cwd: string = (editor.document) ? utils.detectProjectRoot(editor.document.fileName) : vscode.workspace.rootPath
    const elmStuffDir = path.join(cwd, 'elm-stuff', 'build-artifacts');
    console.log(elmStuffDir);
    rimraf(elmStuffDir, (error) => {
      if (error) {
        console.error('Running Elm Clean failed', error);
        vscode.window.showErrorMessage('Running Elm Clean failed');
      } else {
        vscode.window.showInformationMessage('Successfully deleted the build-artifacts folder');
      }
    });
  }
  catch (e) {
    console.error('Running Elm Clean failed', e);
    vscode.window.showErrorMessage('Running Elm Clean failed');
  }
}

export function activateClean(): vscode.Disposable[] {
  return [
    vscode.commands.registerCommand('elm.clean', runClean)];
}