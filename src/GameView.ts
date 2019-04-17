import * as vscode from "vscode";

export interface GameViewOptions {
    title: string;
    viewColumn?: vscode.ViewColumn;
}

const defaultGameViewOptions: GameViewOptions = {
    title: "Untitled",
    viewColumn: vscode.ViewColumn.Active,
};

export class GameView {

    private panel: vscode.WebviewPanel | undefined;
    private html: string;
    private options: GameViewOptions;

    public constructor(html: string, options?: GameViewOptions) {
        this.html = html;
        this.options = options || defaultGameViewOptions;
    }

    public show(viewColumn?: vscode.ViewColumn, preserveFocus?: boolean) {
        if (this.panel) {
            this.panel.reveal(viewColumn, preserveFocus);
        } else {
            this.panel = vscode.window.createWebviewPanel(
                "gameView",
                this.options.title,
                this.options.viewColumn || vscode.ViewColumn.Active,
                {
                    enableScripts: true,
                    retainContextWhenHidden: false,
                });
            this.panel.webview.html = this.html;
            this.panel.onDidDispose(() => {
                this.panel = undefined;
            });
        }
    }

    public close() {
        if (this.panel) {
            this.panel.dispose();
            this.panel = undefined;
        }
    }
}
