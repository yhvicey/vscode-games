import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.commands.registerCommand("games.startDino", async () => {
            const DinoChunk = await import(/* webpackChunkName: "Dino" */ "./Games/Dino");
            DinoChunk.default.start(context);
        })
    );
}

export function deactivate() {
    // No-op
}
