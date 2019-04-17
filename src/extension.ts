import * as vscode from "vscode";
import Dino from "./Games/Dino";

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.commands.registerCommand("games.startDino", async () => {
            Dino.start(context);
        })
    );
}

export function deactivate() {
    // No-op
}
