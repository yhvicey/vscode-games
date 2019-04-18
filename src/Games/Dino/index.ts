import * as vscode from "vscode";

import { GameView } from "@/GameView";

import html from "./game.html";

const GameName: string = "Dino";

export default class Dino {
    public static start(context: vscode.ExtensionContext) {
        const view = new GameView(html, {
            title: GameName
        });
        view.show();
    }
}
