import * as vscode from "vscode";

import { GameView } from "@/GameView";
import Utils from "@/Utils";

import html from "./game.html";

const GameName: string = "Dino";

export default class Dino {
    public static start(context: vscode.ExtensionContext) {
        const scriptPath = Utils.getGameAssetPath(context, GameName, "game.js");

        const resolvedHtml = html.replace("${scriptPath}", scriptPath);
        const view = new GameView(resolvedHtml, {
            title: GameName
        });
        view.show();
    }
}
